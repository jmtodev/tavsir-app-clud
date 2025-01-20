/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-duplicates */
import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Box, CardContent } from "@mui/material";
import styled from "styled-components";
import { font } from "styled-theme";
import { ifProp, prop } from "styled-tools";

import { toPng } from "html-to-image";

import html2canvas from "html2canvas";
import Swal from "sweetalert2";
import axios from "axios";
import { StrukTransaksi } from "../../templates/StrukTransaksi";

import {
  convertCurrency,
  removeCookie,
  updateCookieObject,
  validateCookiey,
} from "../../../services/utils";
import MenuPageTemplate from "../../templates/MenuPageTemplate";
import OrderRequestModal from "../../organisms/OrderRequestModal";
import OrderCancelConfirmModal from "../../organisms/OrderCancelConfirmModal";
import OrderCanceledModal from "../../organisms/OrderCanceledModal";
import OrderConfirmModal from "../../organisms/OrderConfirmModal";

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

const StatusText = styled.p`
  font-family: ${font("primary")};
  font-weight: 500;
  font-size: 0.75rem;
  text-align: "left";
  margin-top: 5px;
  color: #ffff;
  background-color: ${prop("bgcolor")};
  padding: 0.2rem;
  width: max-content;
  margin-left: 16px;
  @media screen and (max-width: ${prop("breakpoint")}px) {
    display: ${ifProp("responsive", "none !important")};
  }
`;

const OrderDetailPage = () => {
  const history = useHistory();
  const elementRef = useRef(null);

  const { state } = history.location;
  const [orderData, setOrderData] = useState({});
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [reqCancelOrder, setReqCancelOrder] = useState(false);
  const [openCancelOrder, setOpenCancelOrder] = useState(false);
  const [openCancelConfirm, setOpenCancelConfirm] = useState(false);
  const [openOrderConfirmModal, setOpenOrderConfirmModal] = useState(false);
  const [orderConfirmData, setOrderConfirmData] = useState({});

  const requestOrder = (id) => {
    if (!reqCancelOrder && !openCancelOrder && !openCancelConfirm) {
      setOpenRequestModal(true);
      const timer = setTimeout(() => confirmOrder(id), 5000);
      return () => clearTimeout(timer);
    }
    return null;
  };
  async function confirmOrder(id) {
    Swal.close();
    setOpenRequestModal(true);
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    await axios
      .post(
        process.env.TAVSIR_URL + `/api/travshop/order-confirmation/${id}`,
        {},
        { headers }
      )
      .then((response) => {
        Swal.close();
        const { data } = response;
        setOrderConfirmData(data);
        setOpenOrderConfirmModal(true);
        updateCookieObject("order-data", data);
      })
      .catch((err) => {
        Swal.close();
        const errMessage = err.response.data.error;
        if (
          !errMessage.includes("CANCEL") &&
          !reqCancelOrder &&
          !openCancelOrder &&
          !openCancelConfirm
        ) {
          requestOrder(id);
        } else {
          orderStatus(id);
          openOrderCanceled();
        }
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
        {},
        { headers }
      )
      .then((response) => {
        Swal.close();
        const { data } = response;
        const { status } = data;
        const { id } = data;
        if (status.toLowerCase().includes("done", "ready")) {
          removeCookie("order");
          removeCookie("order-data");
          removeCookie("order-payment");
          removeCookie("seat");
        } else if (
          status
            .toLowerCase()
            .includes("waiting_confirmation_tenant", "waiting_open")
        ) {
          confirmOrder(id);
        } else if (status.toLowerCase().includes("waiting_confirmation_user")) {
          setOpenOrderConfirmModal(true);
        }
        setOrderData(data);
      })
      .catch((error) => {
        Swal.close();
        Swal.fire(error, "", "warning");
      });
  }
  async function cancelOrder() {
    closeAllModal();
    Swal.showLoading();
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    await axios
      .post(
        process.env.TAVSIR_URL + `/api/travshop/order-cancel/${orderData.id}`,
        {},
        { headers }
      )
      .then((response) => {
        Swal.close();
        const { data } = response;
        removeCookie("order");
        removeCookie("order-data");
        setOrderData(data);
        openOrderCanceled();
      })
      .catch((error) => {
        Swal.close();
        Swal.fire(error, "", "warning");
      });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (validateCookiey("user")) {
      const latestData = state?.data;

      setOrderData(latestData);
      orderStatus(latestData.id);
    } else {
      history.push("/");
    }
  }, []);

  const textColor = (status) => {
    if (status) {
      if (status.toLowerCase().includes("waiting")) {
        return "#FFCB04";
      }
      if (
        status.toLowerCase().includes("done") ||
        status.toLowerCase().includes("ready")
      ) {
        return "#2AB930";
      }
      if (status.toLowerCase().includes("cancel")) {
        return "#FF2020";
      }
      return "#000";
    }
    return null;
  };

  const textStatus = (status) => {
    if (status) {
      if (status.toLowerCase().includes("waiting")) {
        return "Disiapkan";
      }
      if (status.toLowerCase().includes("done")) {
        return "Transaksi Selesai";
      }
      if (status.toLowerCase().includes("cancel")) {
        return "Dibatalkan";
      }
      if (status.toLowerCase().includes("ready")) {
        return "Selesai disiapkan";
      }
      return "Menunggu Pembayaran";
    }
    return null;
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    // const byteString = Buffer.from(dataURI, 'base64')
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const onOrderAgain = () => {
    // setisPrint(false)
    removeCookie("order");
    removeCookie("order-data");
    removeCookie("order-payment");
    removeCookie("seat");
    history.push("./menu");
  };

  const onDownload = () => {
    console.log(orderData)
    // setisPrint(true)
    elementRef.current.style.display = "block";
    toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `RECEIPT-${orderData.order_id}`;
        link.href = dataUrl;
        link.click();
        elementRef.current.style.display = "none";
      })
      .catch((err) => {
        Swal.fire(err, "", "warning");
        elementRef.current.style.display = "none";
      });
  };

  const sendReceipt = async () => {
    // setisPrint(true)
    // Step 1: Capture the HTML component as a PNG image using html2canvas
    elementRef.current.style.display = "block";
    const canvas = await html2canvas(elementRef.current);
    const dataURL = canvas.toDataURL("image/png, image/jpg");

    // Step 2: Convert the PNG image data to a Blob object
    const blob = dataURItoBlob(dataURL);
    // Create a File object with the Blob and custom file name
    const pngFile = new File([blob], `RECEIPT-${orderData.order_id}.png`, {
      type: "image/png, image/jpg",
    });
    history.push({
      pathname: "./send-receipt",
      state: { data: orderData, image: pngFile },
    });
    elementRef.current.style.display = "none";
  };

  const openOrderCanceled = () => {
    setOpenRequestModal(false);
    setOpenCancelConfirm(true);
    setReqCancelOrder(true);
  };

  const closeAllModal = () => {
    setOpenRequestModal(false);
    setOpenCancelOrder(false);
    setOpenCancelConfirm(false);
    setOpenOrderConfirmModal(false);
    setReqCancelOrder(false);
  };

  const onCancelOrder = () => {
    setOpenRequestModal(false);
    setReqCancelOrder(true);
    cancelOrder();
  };
  const onClickChat = () => {
    // closeAllModal()
    history.push({
      pathname: "/chat",
      state: { id: orderData.id },
    });
  };

  const onClickCancelOrder = () => {
    setReqCancelOrder(true);
    setOpenRequestModal(false);
    setOpenCancelOrder(true);
  };
  const onContinuePayment = () => {
    // history.push({
    //   pathname: "./checkout",
    //   state: { data: orderConfirmData },
    // })
  };
  const closeCancelModal = () => {
    closeAllModal();
    removeCookie("order");
    history.push({
      pathname: "./order-detail",
      state: { data: orderData },
    });
  };

  return (
    <>
      <MenuPageTemplate
        headerText="Detail Pesanan"
        withChat
        historyDetail
        onOrderAgain={() => onOrderAgain()}
        onDownload={() => onDownload()}
        sendReceipt={() => sendReceipt()}
        disabledPrint={
          orderData &&
          !(
            orderData?.status?.toLowerCase() === "ready" ||
            orderData?.status?.toLowerCase() === "done"
          )
        }
        chatId={orderData.id}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            overflowY: "auto",
            minHeight: "80rem",
          }}
        >
          <CardContent sx={{ pl: 2, pb: 1, pr: 1 }}>
            <Text
              responsive
              breakpoint={200}
              color="grey"
              style={{ textAlign: "center" }}
            >{`No Meja: ${orderData.nomor_name}`}</Text>
            <Text
              responsive
              breakpoint={200}
              color="grey"
              style={{ textAlign: "center" }}
            >{`Tipe Pesanan: ${
              orderData.consume_type === "dine_in" ? "Dine In" : "Take Away"
            }`}</Text>
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
                {orderData.order_id}
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
                {orderData.customer_name}
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
                Metode Pembayaran
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
                {orderData?.payment_method?.name || "-"}
              </Text>
            </div>
          </Box>
          <CardContent sx={{ pl: 2, pb: 1, pr: 1 }}>
            <Text responsive breakpoint={200} color="#244280">
              Pesanan Kamu
            </Text>
          </CardContent>
          <StatusText
            responsive
            breakpoint={200}
            bgcolor={textColor(orderData?.status)}
          >
            {orderData?.status_label}
          </StatusText>
          {orderData &&
            orderData?.detil &&
            orderData?.detil.map((item) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  pl: 2,
                  pb: 1,
                  pr: 1,
                  gap: "5px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "70%",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "colomn" }}>
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
              color={textColor(orderData?.status)}
              style={{ textAlign: "right" }}
            >
              {textStatus(orderData?.status)}
            </Text>
          </Box>
        </Box>

        <OrderRequestModal
          open={openRequestModal && !reqCancelOrder}
          onClickChat={() => onClickChat()}
          onClickCancelOrder={() => onClickCancelOrder()}
        />
        <OrderCancelConfirmModal
          open={openCancelOrder}
          orderData={orderData}
          onClickCancel={() => onCancelOrder()}
          onClickBack={() => {
            setOpenCancelOrder(false);
            setReqCancelOrder(false);
            confirmOrder(orderConfirmData.id);
          }}
        />
        <OrderCanceledModal
          open={openCancelConfirm}
          orderData={orderData}
          onClickClose={() => closeCancelModal()}
        />
        <OrderConfirmModal
          open={openOrderConfirmModal}
          orderData={orderConfirmData}
          onContinuePayment={() => onContinuePayment()}
          onCancelOrder={() => onClickCancelOrder()}
          onChat={() => onClickChat()}
        />
      </MenuPageTemplate>
      {/* <div style={{ display: 'none' }}> */}
      <div id="receipt-print" ref={elementRef} style={{ display: "none" }}>
        <StrukTransaksi data={orderData} />
      </div>
      {/* </div> */}
    </>
  );
};

export default OrderDetailPage;
