import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Box, CardContent, Radio } from "@mui/material";
import styled from "styled-components";
import { font } from "styled-theme";
import { ifProp, prop } from "styled-tools";
import Swal from "sweetalert2";

import axios from "axios";
import {
  convertCurrency,
  getCookie,
  removeCookie,
  updateCookieObject,
  validateCookiey,
} from "../../../services/utils";
import MenuPageTemplate from "../../templates/MenuPageTemplate";
import CashierPaymentModal from "../../organisms/CashierPaymentModal";

import cashless from "../../../../public/cashless.png";
import cashier from "../../../../public/cashier.png";
import cc from "../../../../public/cc.png";
import bni from "../../../../public/bni.png";
import bri from "../../../../public/bri.png";
import mandiri from "../../../../public/mandiri.png";

import Button from "../../atoms/Button";
import BasicCloseMOdal from "../../organisms/BasicCloseModal";
import WaitingPaymentModal from "../../organisms/WaitingPaymentModal";
import PaymentDoneModal from "../../organisms/DonePaymentModal";
import UnrecievedPaymentModal from "../../organisms/UnrecievedPaymentModal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// import './styled.css'

let init = {};

const CardWrapper = styled.div`
  display: flex;
  width: 9.375rem;
  height: 6.25rem;
  padding: 0.625rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  background: #ffffff;
  border-radius: 10px;
  border: 1px solid #c0c0c0;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const MenuIcon = styled.img`
  width: 50px;
  height: 50px;
  background-repeat: no-repeat no-repeat;
  background-size: contain;
`;

const CcIcon = styled.img`
  height: 20px;
  width: 30px;
  object-fit: contain;
  background-repeat: no-repeat no-repeat;
  background-size: contain;
  margin-right: 0.5rem;
`;

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

const CheckoutPage = () => {
  const history = useHistory();
  const { state } = history.location;
  const [cartData, setCartData] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [isOnlinePayment, setIsOnlinePayment] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState({});
  const [extraPriceData, setExtraPriceData] = useState([]);
  const [confirmPaymentData, setConfirmPaymentData] = useState({});
  const [isCashierPayment, setIsCashierPayment] = useState(false);
  const [showCashierPaymentModal, setShowCashierPaymentModal] = useState(false);
  const [showCashierConfirmModal, setShowCashierConfirmModal] = useState(false);
  const [showSuccessPayment, setShowSuccessPayment] = useState(false);
  const [showWaitingPayment, setShowWaitingPayment] = useState(false);
  const [showUnreceivedPayment, setShowUnreceivedPayment] = useState(false);

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
        setCartData(data);
        console.log("data", data);

        if (data.status === "PAYMENT_SUCCESS" || data.status === "DONE") {
          console.log("looohh");

          history.push({
            pathname: "./payment-confirm",
            state: {
              data: data.payment,
              method: data.payment_method,
              cart: data,
              isFlo: false,
            },
          });
        } else if (
          data.status === "WAITING_PAYMENT" &&
          data.payment &&
          !state.data?.isFlo
        ) {
          console.log("laaahh");

          history.push({
            pathname: "./payment-confirm",
            state: {
              data: data.payment,
              method: data.payment_method,
              cart: data,
              isFlo: false,
            },
          });
        }
        // updateCookieObject('order-data', data)
      })
      .catch((error) => {
        console.log(error);
        Swal.close();
        Swal.fire("Error", "", "warning");
      });
  }

  async function getExtraPrice() {
    Swal.showLoading();

    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    await axios
      .get(
        process.env.TAVSIR_URL + `/api/travshop/extra-price/${init.tenantId}`,
        {},
        { headers }
      )
      .then((response) => {
        Swal.close();
        const { data } = response;
        const activeData = data.filter((item) => item.status === "AKTIF");
        setExtraPriceData(activeData);
      })
      .catch((error) => {
        Swal.close();
        Swal.fire("Error", "", "warning");
      });
  }

  async function getPaymentMethod(id) {
    Swal.showLoading();
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    await axios
      .get(
        process.env.TAVSIR_URL +
          `/api/travshop/payment-method?trans_order_id=${id}`,
        {},
        { headers }
      )
      .then((response) => {
        Swal.close();
        const { data } = response;
        const filter = data.filter(
          (item) => item.self_order === true && item.fee !== null
        );
        setPaymentMethod(filter);
      })
      .catch((error) => {
        Swal.close();
        Swal.fire("Error", "", "warning");
      });
  }

  async function createPaymentCashier() {
    setShowWaitingPayment(false);
    setShowSuccessPayment(false);
    setShowUnreceivedPayment(false);
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    await axios
      .get(
        process.env.TAVSIR_URL + `/api/travshop/queue-payment/${cartData.id}`,
        {},
        { headers }
      )
      .then((response) => {
        Swal.close();
        setShowSuccessPayment(false);
        setShowUnreceivedPayment(false);
        setShowCashierPaymentModal(false);
        setShowCashierConfirmModal(false);
        setShowWaitingPayment(true);
      })
      .catch((error) => {
        Swal.close();
        Swal.fire(error);
      });
  }

  async function getPaymentStatus() {
    setShowWaitingPayment(false);
    setShowSuccessPayment(false);
    setShowUnreceivedPayment(false);
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    await axios
      .get(
        process.env.TAVSIR_URL + `/api/travshop/queue-payment/${cartData.id}`,
        {},
        { headers }
      )
      .then((response) => {
        Swal.close();
        const { data } = response;

        if (data?.status?.toLowerCase().includes("done")) {
          setShowSuccessPayment(true);
          setShowUnreceivedPayment(false);
          setShowCashierPaymentModal(false);
          setShowCashierConfirmModal(false);
          setShowWaitingPayment(false);
        } else {
          setShowSuccessPayment(false);
          setShowUnreceivedPayment(true);
          setShowCashierPaymentModal(false);
          setShowCashierConfirmModal(false);
          setShowWaitingPayment(false);
        }
      })
      .catch((error) => {
        Swal.close();
        Swal.fire(error);
      });
  }

  useEffect(() => {
    window.scrollTo(0, 0);

    if (validateCookiey("user")) {
      getExtraPrice();
      const { data } = state;
      const { id } = data;
      const { status } = data;

      if (validateCookiey("init")) {
        init = JSON.parse(getCookie("init"));
      } else {
        history.push("/not-found");
      }

      getPaymentMethod(id);
      orderStatus(id);

      if (status === "QUEUE") {
        setShowCashierPaymentModal(true);
      } else {
        setShowCashierPaymentModal(false);
      }
    } else if (
      validateCookiey("init") &&
      JSON.parse(getCookie("init")).trans_id
    ) {
      console.log("trans_id 11", state.data);

      const { data } = state;
      const { id } = data;

      getPaymentMethod(id);
      orderStatus(id);
    } else {
      history.push("/");
    }
  }, []);

  const onClickCashless = () => {
    setIsOnlinePayment(true);
    setIsCashierPayment(false);
  };

  const onClickCashier = () => {
    setIsOnlinePayment(false);
    setIsCashierPayment(true);
  };

  const onSelectMethod = (e, item) => {
    setSelectedMethod(item);
  };

  const createPayment = () => {
    history.push({
      pathname: "./payment",
      state: {
        order: cartData,
        method: selectedMethod,
        extraFee: extraPriceData,
      },
    });
  };

  const currCard = (card) => {
    const xCard = card?.toLowerCase();
    if (xCard === "mandiri") {
      return mandiri;
    }
    if (xCard === "bni") {
      return bni;
    }
    if (xCard === "bri") {
      return bri;
    }
    return cc;
  };

  const countExtraPrice = (data) => {
    if (data.is_percent === 1) {
      const countTax = (data.price * cartData.sub_total) / 100;
      return convertCurrency(countTax);
    }
    console.log("data.price", data.price);

    return convertCurrency(data.price);
  };

  return (
    <MenuPageTemplate
      headerText="Pembayaran"
      buttonRedirectFlo="Kembali Ke Flo"
      isPayment
      withChat={
        !(validateCookiey("init") && JSON.parse(getCookie("init")).trans_id)
      }
      chatId={cartData.id}
      noFooter={
        validateCookiey("init") && JSON.parse(getCookie("init")).trans_id
      }
      redirectFlo={
        validateCookiey("init") && JSON.parse(getCookie("init")).trans_id
      }
    >
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <CardContent sx={{ pl: 2, pb: 1, pr: 1 }}>
          {!(
            validateCookiey("init") && JSON.parse(getCookie("init")).trans_id
          ) && (
            <Text
              responsive
              breakpoint={200}
              color="grey"
              style={{ textAlign: "center" }}
            >{`No Meja: ${cartData.nomor_name}`}</Text>
          )}
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

        {extraPriceData &&
          extraPriceData.length > 0 &&
          extraPriceData.map((item) => (
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
                  {countExtraPrice(item)}
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
            <Text responsive breakpoint={200} color="gray">
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
            <Text responsive breakpoint={200} color="gray">
              {convertCurrency(cartData.fee)}
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
            <Text responsive breakpoint={200} color="black">
              Total Bayar
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
              {cartData.service_fee !== 0
                ? convertCurrency(cartData.total - cartData.service_fee)
                : convertCurrency(cartData.total)}
            </Text>
          </div>
        </Box>

        {validateCookiey("init") && JSON.parse(getCookie("init")).trans_id ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 3,
              pl: 2,
              pb: 1,
              pr: 1,
            }}
          >
            <div>
              <Link
                to="/direct-flo"
                style={{
                  textDecoration: "none",
                  fontSize: "12px",
                  color: "#244280",
                  display: "flex", // Aktifkan Flexbox
                  alignItems: "center", // Posisikan secara vertikal tengah
                  gap: "4px", // Beri jarak antara ikon dan teks
                }}
              ></Link>
            </div>
          </Box>
        ) : null}

        <div
          style={{
            display: "flex",
            flexDirection: "colomn",
            justifyContent: "center",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <CardWrapper
            key="wrapper-cashless"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            onClick={() => onClickCashless()}
          >
            <MenuIcon src={cashless} />
            <Text responsive breakpoint={250}>
              Online Payment
            </Text>
          </CardWrapper>
          {!(
            validateCookiey("init") && JSON.parse(getCookie("init")).trans_id
          ) && (
            <CardWrapper
              key="wrapper-cashier"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              onClick={() => onClickCashier()}
            >
              <MenuIcon src={cashier} />
              <Text responsive breakpoint={250}>
                Bayar di Kasir
              </Text>
            </CardWrapper>
          )}
        </div>
        {isOnlinePayment && (
          <div style={{ margin: "1rem" }}>
            <Text responsive breakpoint={200} color="black">
              Virtual Account & QRIS
            </Text>
            {paymentMethod &&
              paymentMethod.map((item) => (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <CcIcon src={item.logo_url || currCard(item.code)} />
                    <Text breakpoint={200} responsive>
                      {item.name}
                    </Text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text breakpoint={200} responsive>
                      {convertCurrency(item.fee ? Number(item.fee) : 0)}
                    </Text>
                    <Radio
                      onChange={(e) => {
                        e.target.value ? onSelectMethod(e.target, item) : null;
                      }}
                      checked={selectedMethod === item}
                      value={item.id}
                      name={`radio-${item.id}`}
                      inputProps={{ "aria-label": `radio-${item.id}` }}
                    />
                  </div>
                </div>
              ))}
            <Button
              id="continue_payment"
              onClick={() => createPayment()}
              buttonText="Lanjutkan"
              disabled={!Object.keys(selectedMethod).length > 0}
            />
          </div>
        )}
        {isCashierPayment && (
          <div style={{ margin: "1rem", gap: "10px" }}>
            <Text responsive breakpoint={200} color="#818181" center>
              Disarankan pembayaran non tunai
            </Text>
            <Button
              id="continue_payment"
              onClick={() => setShowCashierPaymentModal(true)}
              variant="outlined"
              buttonText="Konfirmasi Pembayaran ke Kasir"
            />
          </div>
        )}
      </Box>
      <CashierPaymentModal
        open={showCashierPaymentModal}
        onContinuePayment={() => setShowCashierConfirmModal(true)}
        onCancelOrder={() => setShowCashierPaymentModal(false)}
      />
      <BasicCloseMOdal
        open={showCashierConfirmModal}
        modalText="Silahkan selesaikan pembayaran di kasir"
        buttonText="Lanjutkan Pembayaran"
        onClick={() => createPaymentCashier()}
      />
      <WaitingPaymentModal
        open={showWaitingPayment}
        onMyOrder={() => getPaymentStatus()}
        orderData={cartData}
        // onClose={() => setShowWaitingPayment(false)}
      />
      <PaymentDoneModal
        open={showSuccessPayment}
        onMyOrder={() => {
          // history.push({
          //   pathname: './my-order',
          //   state: {
          //     data: cartData,
          //   },
          // })
          history.push({
            pathname: "./order-detail",
            state: {
              data: cartData,
            },
          });
        }}
        orderData={cartData}
        // onClose={() => setShowSuccessPayment(false)}
      />
      <UnrecievedPaymentModal
        open={showUnreceivedPayment}
        orderData={cartData}
        onClose={() => {
          setShowWaitingPayment(true);
          setShowUnreceivedPayment(false);
        }}
      />
      {/* <Box mt={5} p={2}>
        <Button
            btncolor="#4c0049"
            onClick={() => history.push("/direct-flo")}
            buttonText="Kembali ke Flo"
            >
        </Button>

      </Box> */}
    </MenuPageTemplate>
  );
};

export default CheckoutPage;
