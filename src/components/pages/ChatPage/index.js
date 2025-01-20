/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, TextField, IconButton } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { Camera } from "react-camera-pro";

import styled from "styled-components";
import { font } from "styled-theme";
import { ifProp, prop } from "styled-tools";
import MenuPageTemplate from "../../templates/MenuPageTemplate";
import Message from "../../organisms/ChatForm";
import { getCookie, validateCookiey } from "../../../services/utils";

import addIcon from "../../../../public/add_circle_outline.png";
import photo from "../../../../public/photo.png";

// const messages = [
//   { id: 1, text: "Hi there!", sender: "bot" },
//   { id: 2, text: "Hello!", sender: "user" },
//   { id: 3, text: "How can I assist you today?", sender: "bot" },
// ];

const Text = styled.p`
  font-family: ${font("primary")};
  font-weight: 500;
  font-size: 0.5rem;
  text-align: center;
  color: #9e9e9e;
  word-break: break-word;
  @media screen and (max-width: ${prop("breakpoint")}px) {
    display: ${ifProp("responsive", "none !important")};
  }
`;

const ChatPage = () => {
  const history = useHistory();
  const { state } = history.location;
  const camera = useRef(null);
  const hiddenFileInput = useRef(null);
  const [input, setInput] = useState("");
  const [chatData, setChatData] = useState([]);
  const [orderData, setOrderData] = useState({});
  const [userData, setUserData] = useState({});
  const [tenantData, setTenantData] = useState({});
  const [openAttachment, setOpenAttachment] = useState(false);
  const [selectedFile, setSelectedFile] = useState({});
  const [preview, setPreview] = useState();
  const [image, setImage] = useState(null);
  const [isShowCamera, setIsShowCamera] = useState(false);
  const [crawlingChat, setCrawlingChat] = useState(true);

  const requestChatHistory = (id) => {
    if (crawlingChat) {
      const timer = setTimeout(() => getChatHistory(id), 2000);
      return () => clearTimeout(timer);
    }
  };

  async function getChatHistory(id) {
    if (crawlingChat) {
      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      };
      await axios
        .get(process.env.TAVSIR_URL + `/api/chat/${id}`, {}, { headers })
        .then((response) => {
          Swal.close();
          setChatData([]);
          const { data } = response;
          const { chat } = data;
          setChatData(chat.reverse());
          requestChatHistory(id);
        })
        .catch((error) => {
          Swal.close();
          Swal.fire(error, "", "warning");
        });
    }
  }

  async function sendChat(payload) {
    Swal.showLoading();

    await axios({
      method: "post",
      url: process.env.TAVSIR_URL + "/api/chat",
      data: payload,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        Swal.close();
        setChatData([]);
        // handle success
        const { data } = response;
        const { chat } = data;
        setChatData(chat.reverse());
        setSelectedFile(null);
        setPreview(null);
        setInput("");
      })
      .catch((error) => {
        // handle error
        Swal.close();
        Swal.fire(error, "", "warning");
      });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (validateCookiey("user")) {
      const user = JSON.parse(getCookie("user"));
      const restInfo = JSON.parse(getCookie("rest_info"));
      const orderId = state.id;

      setChatData([]);
      setOrderData(orderId);
      setTenantData(restInfo);
      setUserData(user);
      getChatHistory(orderId);
    } else {
      history.push("/");
    }
  }, []);

  const onSelectFile = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const objectUrl = URL.createObjectURL(e.target.files[0]);

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  };

  const handleSend = () => {
    const payload = new FormData();
    payload.append("photo", selectedFile);
    payload.append("trans_order_id", orderData);
    payload.append("user_type", "customer");
    payload.append("user_id", Number(userData.phone));
    payload.append("tenant_id", tenantData.id);
    payload.append("user_name", userData.username);
    payload.append("text", input);

    sendChat(payload);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const onOpenAttachment = () => {
    setOpenAttachment(!openAttachment);
  };

  const setPhotoPreview = () => {
    setImage(camera.current.takePhoto());
    setPreview(camera.current.takePhoto());
  };

  const handleInput = () => {
    hiddenFileInput.current.click();
  };

  const onEnterMessage = (e) => {
    if (e.keyCode === 13) {
      handleSend();
    }
  };

  return (
    <MenuPageTemplate
      isPayment
      isChat
      noFooter
      tenantImage={tenantData.photo}
      tenantName={tenantData.name}
    >
      <Box
        sx={{
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          backgroundColor: "transparent",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column-reverse",
            flexGrow: 1,
            overflow: "auto",
            p: 2,
          }}
        >
          {chatData &&
            chatData.length > 0 &&
            chatData.map((message) => (
              <Message key={message.user_id} message={message} />
            ))}
        </Box>
        {preview && (
          <Box
            component="img"
            sx={{
              objectFit: "contain",
              width: "6rem",
              height: "6rem",
              flexShrink: 0,
              borderRadius: "0.95rem",
              border: "1px solid #E8E6EA",
              background: "#21CCF2",
              padding: 0.5,
            }}
            alt="file-attach"
            src={preview}
          />
        )}

        <Text>
          Enter untuk mengirimkan pesan. Tambahkan teks untuk mengirimkan gambar
        </Text>

        <Box
          sx={{
            display: "flex",
            px: 2,
            backgroundColor: "background.default",
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Type a message"
            variant="outlined"
            value={input}
            sx={{ borderRadius: "0.9375rem" }}
            onChange={handleInputChange}
            onKeyDown={(e) => onEnterMessage(e)}
          />
          {/* <IconButton onClick={() => handleSend()}>
            <SendIcon />
          </IconButton> */}
          <IconButton onClick={() => onOpenAttachment()}>
            <Box
              component="img"
              sx={{
                objectFit: "contain",
                width: "1rem",
                height: "1rem",
                flexShrink: 0,
                borderRadius: "0.9375rem",
                border: "1px solid #CFD0D7",
                background: "#FFF",
                padding: "0.8rem",
              }}
              alt="add-attach"
              src={addIcon}
            />
          </IconButton>
        </Box>
        {isShowCamera && (
          <div style={{ width: "70%", heigth: "70%" }}>
            <Camera ref={camera} />
            <button type="button" onClick={() => setPhotoPreview()}>
              Take photo
            </button>
            <img src={image} alt="camera" />
          </div>
        )}
        {openAttachment && (
          <Box
            sx={{
              display: "flex",
              p: 2,
              backgroundColor: "background.default",
            }}
          >
            {/* <IconButton onClick={() => setIsShowCamera(true)}>
              <Box
                component="img"
                sx={{
                  display: 'flex',
                  height: '2rem',
                  padding: '0rem 0.8125rem 0.6875rem 0.875rem',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexShrink: 0,
                  borderRadius: '0.625rem',
                  background: '#FFF',
                }}
                alt="add-take-pict"
                src={cameraIcon}
              />
            </IconButton> */}
            <div>
              <input
                type="file"
                id="upload-button"
                style={{
                  display: "none",
                }}
                accept="image/png, image/jpg, image/jpeg"
                ref={hiddenFileInput}
                onChange={(e) => onSelectFile(e)}
              />
              <IconButton onClick={() => handleInput()}>
                <Box
                  component="img"
                  sx={{
                    display: "flex",
                    height: "2rem",
                    padding: "0rem 0.8125rem 0.6875rem 0.875rem",
                    justifyContent: "center",
                    alignItems: "center",
                    flexShrink: 0,
                    borderRadius: "0.625rem",
                    background: "#FFF",
                  }}
                  alt="add-photo"
                  src={photo}
                />
              </IconButton>
            </div>
          </Box>
        )}
      </Box>
    </MenuPageTemplate>
  );
};

export default ChatPage;
