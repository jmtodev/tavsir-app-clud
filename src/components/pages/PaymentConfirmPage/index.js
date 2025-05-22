import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import QRCode from "react-qr-code";
import { Box, Button, IconButton } from "@mui/material";
import styled from "styled-components";
import { font } from "styled-theme";
import { ifProp, prop } from "styled-tools";
import moment from "moment";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Swal from "sweetalert2";
import axios from "axios";
import { toPng } from "html-to-image";

import {
  convertCurrency,
  removeCookie,
  updateCookieObject,
  validateCookiey,
  getCookie,
} from "../../../services/utils";
import MenuPageTemplate from "../../templates/MenuPageTemplate";
import loadingLogo from "../../../../public/loadinglogo.gif";
import cc from "../../../../public/cc.png";
import bni from "../../../../public/bni.png";
import bri from "../../../../public/bri.png";
import mandiri from "../../../../public/mandiri.png";
import others from "../../../../public/others.png";

import PaymentDoneModal from "../../organisms/DonePaymentModal";
import UnrecievedPaymentModal from "../../organisms/UnrecievedPaymentModal";
import BniPaymentModal from "../../organisms/BniPaymentModal";
import BriPaymentModal from "../../organisms/BriPaymentModal";
import TransferBankModal from "../../organisms/BankTransferModal";
import MandiriPaymentModal from "../../organisms/MandiriPaymentModal";

import { StrukTransaksi } from "../../templates/StrukTransaksi";
import VaBankTransferModal from "../../organisms/TranferPaymentModal";

const Container = styled.div`
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #c0c0c0;
  padding: 1rem;
`;

const Text = styled.p`
  font-family: ${font("primary")};
  font-weight: 500;
  font-size: ${ifProp("title", "0.875rem", "0.75rem")};
  margin: 0;
  margin-top: 5px;
  color: ${prop("color")};
  word-break: break-word;
  @media screen and (max-width: ${prop("breakpoint")}px) {
    display: ${ifProp("responsive", "none !important")};
  }
`;

const MenuIcon = styled.img`
  width: 50px;
  height: 60px;
  background-repeat: no-repeat no-repeat;
  background-size: contain;
  object-fit: contain;
`;

const PaymentConfirmPage = () => {
  const history = useHistory();
  const { state } = history.location;
  const [paymentData, setPaymentData] = useState({});
  const [methodData, setMethodData] = useState({});
  const [cartData, setCartData] = useState([]);
  const [confirmPaymentData, setConfirmPaymentData] = useState({});
  const [showSuccessPayment, setShowSuccessPayment] = useState(false);
  const [showWaitingPayment, setShowWaitingPayment] = useState(false);
  const [showBniPaymentModal, setShowBniPaymentModal] = useState(false);
  const [showBriPaymentModal, setShowBriPaymentModal] = useState(false);
  const [showTransferPaymentModal, setShowTransferPaymentModal] =
    useState(false);
  const [showMandiriPaymentModal, setShowMandiriPaymentModal] = useState(false);
  const [showVaBankTransfer, setShowVaBankTransfer] = useState(false);
  const elementRef = useRef(null);
  async function getPaymentStatus(id, isCheckStatus = false) {
    console.log(isCheckStatus);
    if (isCheckStatus) {
      Swal.fire({
        title: "Loading...",
        text: "Sedang memeriksa status pembayaran, harap tunggu.",
        imageUrl: loadingLogo, // Ganti dengan URL/icon yang sesuai
        imageWidth: 100,
        imageHeight: 100,
        showConfirmButton: false,
        allowOutsideClick: false, // Cegah pengguna menutup alert dengan klik di luar
        // didOpen: () => {
        //   Swal.showLoading(); // Tetap gunakan loading spinner
        // }
      });
    } else {
      Swal.showLoading();
    }

    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    await axios
      .get(
        process.env.TAVSIR_URL + `/api/travshop/payment-status/${id}`,
        {},
        { headers }
      )
      .then((response) => {
        Swal.close();
        const { data } = response;
        const { responseData } = data;
        setConfirmPaymentData(responseData);
        updateCookieObject("order-data", data);

        if (
          data?.status?.toLowerCase().includes("success") ||
          data?.status?.toLowerCase().includes("done")
        ) {
          setShowSuccessPayment(true);
          setShowWaitingPayment(false);
        } else {
          if (isCheckStatus) {
            // console.log("1");

            const trans_id = JSON.parse(getCookie("init")).trans_id;
            history.push({
              pathname: "./checkout",
              state: {
                data: {
                  id: trans_id,
                  isFlo: true,
                },
              },
            });
          } else {
            // console.log("2");
            setShowSuccessPayment(false);
            setShowWaitingPayment(true);
          }
        }
      })
      .catch((error) => {
        if (error?.response?.data?.responseData) {
          Swal.close();
          const { response } = error;
          const { data } = response;
          const { responseData } = data;
          if (
            responseData?.pay_status === "0" ||
            responseData?.pay_status === 0 ||
            data?.status === "WAITING_PAYMENT"
          ) {
            if (isCheckStatus) {
              // console.log("3");
              const trans_id = JSON.parse(getCookie("init")).trans_id;
              history.push({
                pathname: "./checkout",
                state: {
                  data: {
                    id: trans_id,
                    isFlo: true,
                  },
                },
              });
            } else {
              // console.log("4");
              setShowSuccessPayment(false);
              setShowWaitingPayment(true);
            }
          }
        } else {
          console.log(error?.message);
          Swal.showLoading();
          setTimeout(() => {
            if (isCheckStatus) {
              getPaymentStatus(state.cart.id, true);
            } else {
              getPaymentStatus(state.cart.id);
            }
          }, 5000);
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
        const { data, status } = response;

        if (validateCookiey("init") && JSON.parse(getCookie("init")).trans_id) {
          if (data.status === "PAYMENT_SUCCESS" || data.status === "DONE") {
            floCallback(data.id);
          }
        }
      })
      .catch((error) => {
        Swal.close();
        Swal.fire(error, "", "warning");
      });
  }

  async function floCallback(trans_order_id) {
    Swal.close();
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    await axios
      .post(
        // process.env.CALLBACK_FLO_URL + `/handle-payment-callback`,
        process.env.TAVSIR_URL + `/api/handle-payment-callback`,
        // { ...cartData },
        {
          trans_order_id: trans_order_id,
        },
        { headers }
      )
      .then((response) => {
        Swal.close();
        const { status } = response;

        if (status === 200) {
          // history.push({
          //   pathname: "/order-flo",
          //   search: `?statuscode=${status}&order_id=${cartData.order_id}`
          // });
          window.location.href =
            "/order-flo?statuscode=" +
            status +
            "&order_id=" +
            cartData.order_id;
        } else {
          Swal.close();
          Swal.fire(
            "Error",
            "Layanan Sedang gangguan, Harap Hubungi Call Center",
            "warning"
          );
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.close();
        Swal.fire(
          "Error",
          "Layanan Sedang gangguan, Harap Hubungi Call Center",
          "warning"
        );
      });
  }

  async function floCallback2(trans_order_id) {
    Swal.close();
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    await axios
      .post(
        // process.env.CALLBACK_FLO_URL + `/handle-payment-callback`,
        process.env.TAVSIR_URL + `/api/handle-payment-callback`,
        // { ...cartData },
        {
          trans_order_id: trans_order_id,
        },
        { headers }
      )
      .then((response) => {
        Swal.close();
        const { status } = response;

        if (status === 200) {
        } else {
          Swal.close();
          Swal.fire(
            "Error",
            "Layanan Sedang gangguan, Harap Hubungi Call Center",
            "warning"
          );
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.close();
        Swal.fire(
          "Error",
          "Layanan Sedang gangguan, Harap Hubungi Call Center",
          "warning"
        );
      });
  }

  useEffect(() => {
    window.scrollTo(0, 0);

    if (validateCookiey("user")) {
      setPaymentData(state.data);
      setMethodData(state.method);
      setCartData(state.cart);

      removeCookie("order");
      removeCookie("order-data");
      removeCookie("order-payment");
      removeCookie("seat");
    } else if (
      validateCookiey("init") &&
      JSON.parse(getCookie("init")).trans_id
    ) {
      setPaymentData(state.data);
      setMethodData(state.method);
      setCartData(state.cart);

      // console.log("state", state);

      if (!state?.isFlo) getPaymentStatus(state.cart.id);
    } else {
      history.push("/");
    }
  }, []);


  const currCard = (card, id = null) => {
    const xCard = card.toLowerCase();
    if (xCard === "mandiri") {
      return mandiri;
    }
    if (xCard === "bni") {
      return bni;
    }
    if (xCard === "bri" && id != 14) {
      return bri;
    } else if (id === 14) {
      return others;
    }
    if (id == 14) {
      return others;
    }
    return cc;
  };

  const onCopyValue = (id) => {
    // Get the text field
    const copyText = document.getElementById(id);

    if (id === "amount") {
      navigator.clipboard.writeText(paymentData.amount);
    } else {
      // Copy the text inside the text field
      navigator.clipboard.writeText(copyText.innerHTML);
    }

    // Alert the copied text
    Swal.fire({
      icon: "info",
      text: `Disalin ${copyText.innerHTML.replace(/&nbsp;/g, " ")}`,
    });
  };

  const onPaymentStep = (cc, id = null) => {
    if (cc === "BNI") {
      setShowBniPaymentModal(true);
    } else if (cc === "BRI" && id != 14) {
      setShowBriPaymentModal(true);
    } else if (cc === "MANDIRI") {
      setShowMandiriPaymentModal(true);
    } else if (id == 14) {
      setShowTransferPaymentModal(true);
    } else {
      Swal.fire("under developement", "", "info");
    }
  };

  const onClickMyOrder = () => {
    setShowSuccessPayment(false);

    if (validateCookiey("init") && JSON.parse(getCookie("init")).trans_id) {
      // console.log('confirmPaymentData', confirmPaymentData);
      const trans_id = JSON.parse(getCookie("init")).trans_id;
      orderStatus(trans_id);
    } else {
      history.push({
        pathname: "/my-order",
        state: {
          data: state.cart,
        },
      });
    }
  };

  const onDownload = () => {
    floCallback2(cartData.id);

    // setisPrint(true)

    // elementRef.current.style.display = "block";
    // toPng(elementRef.current, { cacheBust: false })
    //   .then((dataUrl) => {
    //     const link = document.createElement("a");
    //     link.download = `RECEIPT-${cartData.order_id}`;
    //     link.href = dataUrl;
    //     link.click();
    //     elementRef.current.style.display = "none";
    //   })
    //   .catch((err) => {
    //     Swal.fire(err, "", "warning");
    //     elementRef.current.style.display = "none";
    //   });

    history.push({
      pathname: "./show-receipt",
      state: {
        data: cartData,
      },
    });
  };

  return (
    <>
      <MenuPageTemplate
        headerText="Online Payment"
        onClickToCart={() => getPaymentStatus(cartData.id)}
        buttonText="Cek Status Pembayaran"
        buttonRedirectFlo="Kembali Ke Flo"
        checkout
        isFlo={
          validateCookiey("init") && JSON.parse(getCookie("init")).trans_id
        }
        onClickToCart2={() => getPaymentStatus(cartData.id, true)}
        button2Text="Ganti Metode Bayar"
        backtocreatepayment={() => getPaymentStatus(cartData.id, true)}
        redirectFlo={
          validateCookiey("init") && JSON.parse(getCookie("init")).trans_id
        }
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "2rem",
          }}
        >
          <Container>
            <Text responsive breakpoint={200} color="rgba(0, 0, 0, 0.50)">
              Batas Akhir Pembayaran
            </Text>
            <Text title responsive breakpoint={200} color="#FF2020">
              {moment(paymentData.exp_date)
                .locale("id")
                .format("DD MMMM YYYY HH:mm:ss")}
            </Text>
          </Container>
          {paymentData?.sof_code !== "LA" ? (
            <Container>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  pb: 1,
                  pr: 1,
                }}
              >
                <Text responsive breakpoint={200} color="grey">
                  {methodData.name}
                </Text>
                <MenuIcon
                  src={
                    methodData?.code
                      ? currCard(methodData.code, methodData.id)
                      : cc
                  }
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  pb: 1,
                  pr: 1,
                }}
              >
                <Box>
                  <Text responsive breakpoint={200} color="grey">
                    Nomor Virtual Account
                  </Text>
                  <Text
                    id="va_number"
                    key="va_number"
                    responsive
                    breakpoint={200}
                    color="#000"
                  >
                    {paymentData.va_number}
                  </Text>
                </Box>
                <Button
                  variant="outlined"
                  sx={{ border: "none" }}
                  endIcon={<ContentCopyIcon />}
                  onClick={() => onCopyValue("va_number")}
                >
                  Salin
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  pb: 1,
                  pr: 1,
                }}
              >
                <Box>
                  <Text responsive breakpoint={200} color="rgba(0, 0, 0, 0.50)">
                    Total Bayar
                  </Text>
                  <Text
                    id="amount"
                    key="amount"
                    title
                    responsive
                    breakpoint={200}
                    color="#FF2020"
                  >
                    {convertCurrency(paymentData.amount)}
                  </Text>
                </Box>
                <Button
                  variant="outlined"
                  sx={{ border: "none" }}
                  endIcon={<ContentCopyIcon />}
                  onClick={() => onCopyValue("amount")}
                >
                  Salin
                </Button>
              </Box>
              <IconButton
                sx={{ width: "100%" }}
                onClick={() => onPaymentStep(methodData.code, methodData.id)}
              >
                <Text responsive breakpoint={200} color="#244280">
                  Lihat Cara Pembayaran
                </Text>
              </IconButton>
            </Container>
          ) : (
            <div>
              <Container style={{ marginBottom: "5px" }}>
                <Text responsive breakpoint={200} color="rgba(0, 0, 0, 0.50)">
                  Total Bayar
                </Text>
                <Text title responsive breakpoint={200} color="#FF2020">
                  {convertCurrency(paymentData.amount)}
                </Text>
              </Container>
              <Container>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  {/* <Countdown date={Date.now() + 10000} renderer={renderer} /> */}
                  <QRCode
                    size={100}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={paymentData.qrString}
                    viewBox="0 0 100 100"
                  />
                  <Text responsive breakpoint={200} color="#244280">
                    {paymentData.desc}
                  </Text>
                </Box>
              </Container>
            </div>
          )}
        </Box>
        <PaymentDoneModal
          open={showSuccessPayment}
          onMyOrder={() => onClickMyOrder()}
          onMyDownload={() => onDownload()}
          orderData={confirmPaymentData}
          onClose={() => setShowSuccessPayment(false)}
        />
        <UnrecievedPaymentModal
          open={showWaitingPayment}
          orderData={confirmPaymentData}
          onClose={() => setShowWaitingPayment(false)}
        />
        <BniPaymentModal
          open={showBniPaymentModal}
          onClickClose={() => setShowBniPaymentModal(false)}
        />
        <BriPaymentModal
          open={showBriPaymentModal}
          onClickClose={() => setShowBriPaymentModal(false)}
        />
        <MandiriPaymentModal
          open={showMandiriPaymentModal}
          onClickClose={() => setShowMandiriPaymentModal(false)}
        />
        <TransferBankModal
          open={showTransferPaymentModal}
          onClickClose={() => setShowTransferPaymentModal(false)}
        />
      </MenuPageTemplate>
      <div id="receipt-print" ref={elementRef} style={{ display: "none" }}>
        <StrukTransaksi data={cartData} />
      </div>
    </>
  );
};

export default PaymentConfirmPage;
