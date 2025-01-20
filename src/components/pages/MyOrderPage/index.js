/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, CardContent } from "@mui/material";
import styled from "styled-components";
import { font } from "styled-theme";
import { ifProp, prop } from "styled-tools";

import Swal from "sweetalert2";
import axios from "axios";
import {
  convertCurrency,
  getCookie,
  removeCookie,
  validateCookiey,
} from "../../../services/utils";
import MenuPageTemplate from "../../templates/MenuPageTemplate";
import ConfirmationCodeModal from "../../organisms/ConfirmationCodeModal";

// import './styled.css'

const Text = styled.p`
  font-family: ${font("primary")};
  font-weight: 500;
  font-size: ${ifProp("title", "0.875rem", "0.75rem")};
  text-align: ${ifProp("center", "center", "left")};
  margin: 0;
  margin-top: 5px;
  color: ${prop("color")};
  word-break: break-word;
  @media screen and (max-width: ${prop("breakpoint")}px) {
    display: ${ifProp("responsive", "none !important")};
  }
`;

const MyOrderPage = () => {
  const history = useHistory();
  const { state } = history.location;
  const [cartData, setCartData] = useState({});
  const [orderData, setOrderData] = useState({});
  const [isOrderDone, setIsOrderDone] = useState(false);
  const [showConfirmCodeModal, setShowConfirmCodeModal] = useState(false);
  const [input, setInput] = useState("");

  const requestOrderStatus = (id) => {
    if (!isOrderDone) {
      const timer = setTimeout(() => orderStatus(id), 1000);
      return () => clearTimeout(timer);
    }
    return null;
  };

  async function validateCode() {
    Swal.close();
    setShowConfirmCodeModal(false);
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    await axios
      .post(
        process.env.TAVSIR_URL + `/api/travshop/order-verification/${cartData.id}`,
        {
          code: Number(input),
        },
        { headers }
      )
      .then((response) => {
        const { data } = response;
        Swal.close();
        removeCookie("order");
        removeCookie("order-data");
        removeCookie("order-payment");
        removeCookie("seat");

        history.push({
          pathname: "./order-detail",
          state: {
            data,
          },
        });
      })
      .catch(() => {
        Swal.close();
        Swal.fire("kode salah", "", "info");
      });
  }

  async function orderStatus(id) {
    Swal.close();
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    await axios
      .get(
        process.env.TAVSIR_URL + `/api/travshop/order/${id}`,
        {
          code: input,
        },
        { headers }
      )
      .then((response) => {
        Swal.close();
        const { data } = response;
        setOrderData(data);
        if (data.status !== "READY" && data.status !== "DONE") {
          setIsOrderDone(false);
          requestOrderStatus(id);
        } else if (data.status === "DONE") {
          setIsOrderDone(false);

          history.push({
            pathname: "./order-detail",
            state: {
              data,
            },
          });
        } else {
          setIsOrderDone(true);
        }
      })
      .catch(() => {
        Swal.close();
        Swal.fire("kode salah", "", "info");
      });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (validateCookiey("user")) {
      if (getCookie("order-data")) {
        let data = {};
        if (state && state.data) {
          data = state.data;
        }

        setCartData(data);
        requestOrderStatus(data.id);
        state;
      } else if (state && state.data) {
        const data = state.data;
        setCartData(data);
        requestOrderStatus(data.id);
      } else {
        setCartData({});
      }
    } else {
      history.push("/");
    }
  }, []);

  const onSetInput = (val) => {
    setInput(val);
  };

  const onSubmitCode = () => {
    validateCode();
  };

  const textColor = (status) => {
    if (
      !status.toLowerCase().includes("ready") &&
      !status.toLowerCase().includes("done")
    ) {
      return "#FFCB04";
    }
    if (
      status.toLowerCase().includes("ready") ||
      status.toLowerCase().includes("done")
    ) {
      return "#2AB930";
    }
    return "#000";
  };

  const textStatus = (status) => {
    if (
      !status.toLowerCase().includes("ready") &&
      !status.toLowerCase().includes("done")
    ) {
      return "Disiapkan";
    }
    if (status.toLowerCase().includes("ready")) {
      return "Selesai disiapkan";
    }
    if (status.toLowerCase().includes("done")) {
      return "Transaksi Selesai";
    }
    return "Menunggu";
  };

  return (
    <MenuPageTemplate
      headerText="Pesanan Saya"
      buttonText="Masukan kode konfirmasi pesanan"
      withChat
      checkout
      isConfirmMyOrder
      noFooter
      onClickToCart={() => setShowConfirmCodeModal(true)}
      disabledButton={orderData.status !== "READY"}
      chatId={cartData.id}
    >
      {cartData && cartData?.detil ? (
        <>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <CardContent sx={{ pl: 2, pb: 1, pr: 1 }}>
              <Text
                responsive
                breakpoint={200}
                color="grey"
                style={{ textAlign: "center" }}
              >{`No Meja: ${cartData.nomor_name}`}</Text>
            </CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                pl: 2,
                pb: 1,
                pr: 1,
              }}
            >
              <div>
                <Text responsive breakpoint={200} color="grey">
                  No Transaksi
                </Text>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text responsive breakpoint={200} color="grey">
                  {cartData.order_id}
                </Text>
              </div>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                pl: 2,
                pb: 1,
                pr: 1,
              }}
            >
              <div>
                <Text responsive breakpoint={200} color="grey">
                  Nama
                </Text>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text responsive breakpoint={200} color="grey">
                  {cartData.customer_name}
                </Text>
              </div>
            </Box>
            <CardContent sx={{ pl: 2, pb: 1, pr: 1 }}>
              <Text responsive breakpoint={200} color="#244280">
                Pesanan Kamu
              </Text>
            </CardContent>
            {cartData &&
              cartData?.detil &&
              cartData?.detil.map((item) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    pl: 2,
                    pb: 1,
                    pr: 1,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      maxWidth: "70%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "colomn",
                        gap: "5px",
                      }}
                    >
                      <Text
                        responsive
                        breakpoint={200}
                        color="black"
                      >{`${item.product_qty}x `}</Text>
                      <Text responsive breakpoint={200} color="black">
                        {item.product_name}
                      </Text>
                    </div>
                    <Text fontSize={12} color="grey">
                      Variasi :
                      {item.customize && item.customize.length
                        ? item.customize.map((item) => (
                            <span>{` ${item.pilihan_name}  `}</span>
                          ))
                        : "-"}
                    </Text>
                    <Text
                      fontSize={12}
                      color="grey"
                      sx={{
                        wordBreak: "break-word",
                      }}
                    >
                      {item.product_note
                        ? `Catatan : ${item.product_note}`
                        : `Catatan : -`}
                    </Text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Text responsive breakpoint={200} color="black">
                      {convertCurrency(item.product_total_price)}
                    </Text>
                  </div>
                </Box>
              ))}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                pl: 2,
                pb: 1,
                pr: 1,
              }}
            >
              <div>
                <Text responsive breakpoint={200} color="grey">
                  Subtotal Produk
                </Text>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text responsive breakpoint={200} color="grey">
                  {convertCurrency(orderData.sub_total)}
                </Text>
              </div>
            </Box>

            {orderData &&
              orderData?.addon_price &&
              orderData?.addon_price.map((item) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    pl: 2,
                    pb: 1,
                    pr: 1,
                  }}
                >
                  <div>
                    <Text responsive breakpoint={200} color="grey">
                      {item.name}
                    </Text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Text responsive breakpoint={200} color="grey">
                      {convertCurrency(item.price)}
                    </Text>
                  </div>
                </Box>
              ))}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                pl: 2,
                pb: 1,
                pr: 1,
              }}
            >
              <div>
                <Text responsive breakpoint={200} color="grey">
                  Biaya Layanan
                </Text>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text responsive breakpoint={200} color="grey">
                  {convertCurrency(orderData.service_fee)}
                </Text>
              </div>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                pl: 2,
                pb: 1,
                pr: 1,
              }}
            >
              <div>
                <Text responsive breakpoint={200} color="grey">
                  Biaya Platform
                </Text>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text responsive breakpoint={200} color="grey">
                  {convertCurrency(orderData.fee)}
                </Text>
              </div>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                pl: 2,
                pb: 1,
                pr: 1,
              }}
            >
              <div>
                <Text responsive breakpoint={200} color="black" title>
                  Total
                </Text>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text responsive breakpoint={200} color="black" title>
                  {convertCurrency(orderData.total)}
                </Text>
              </div>
            </Box>
            <Box sx={{ pr: 1 }}>
              <Text
                responsive
                breakpoint={200}
                color={textColor(orderData?.status || cartData.status)}
                style={{ textAlign: "right" }}
              >
                {textStatus(orderData?.status || cartData.status)}
              </Text>
            </Box>
          </Box>
          {showConfirmCodeModal && (
            <ConfirmationCodeModal
              open={showConfirmCodeModal}
              inputValue={(val) => onSetInput(val)}
              onClickSubmit={() => onSubmitCode()}
              onClickBack={() => setShowConfirmCodeModal(false)}
            />
          )}
        </>
      ) : (
        <Text
          breakpoint={200}
          responsive
          color="#000"
          style={{ textAlign: "center", marginTop: "1rem" }}
        >
          Anda belum memiliki pesanan aktif
        </Text>
      )}
    </MenuPageTemplate>
  );
};

export default MyOrderPage;
