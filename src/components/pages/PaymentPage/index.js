/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "@mui/material";
import styled from "styled-components";
import { font } from "styled-theme";
import { ifProp, prop } from "styled-tools";

import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment";
import {
  convertCurrency,
  getCookie,
  removeCookie,
  updateCookieObject,
  validateCookiey,
} from "../../../services/utils";
import MenuPageTemplate from "../../templates/MenuPageTemplate";

import cc from "../../../../public/cc.png";
import bni from "../../../../public/bni.png";
import bri from "../../../../public/bri.png";
import mandiri from "../../../../public/mandiri.png";
import { VaBniContent } from "../../organisms/VaBniContent";
import { VaBriContent } from "../../organisms/VaBriContent";
import { VaMandiriContent } from "../../organisms/VaMandiriContent";
import { VaTransferContent } from "../../organisms/VaTransferContent";

let user = {};

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

const PaymentPage = () => {
  const history = useHistory();
  const { state } = history.location;
  const [cartData, setCartData] = useState([]);
  const [methodData, setMethodData] = useState({});
  const [extraPriceData, setExtraPriceData] = useState([]);

  const isVAExp = (date) => {
    const now = moment().format("YYYY-MM-DD HH:mm:ss");
    if (date < now) {
      return true;
    }
    return false;
  };

  const validateExistVA = () => {
    let existVA = false;
    if (
      cartData?.payment_method &&
      Object.keys(cartData.payment_method).length > 0
    ) {
      if (methodData.id === cartData.payment_method.id) {
        if (!isVAExp(cartData.payment.exp_date)) {
          existVA = true;
        }
      }
    }
    return existVA;
  };
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
        console.log(response);
        Swal.close();
        const { data } = response;
        setCartData(data);
      })
      .catch((error) => {
        Swal.close();
        Swal.fire(error, "", "warning");
      });
  }

  async function createPayment(request) {
    Swal.close();
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    await axios
      .post(
        process.env.TAVSIR_URL + `/api/travshop/create-payment/${cartData.id}`,
        {
          ...request,
        },
        { headers }
      )
      .then((response) => {
        Swal.close();
        const { data } = response;
        const { responseData } = data;
        removeCookie("order");
        removeCookie("order-data");
        removeCookie("seat");
        updateCookieObject("order-payment", responseData);
        history.push({
          pathname: "./payment-confirm",
          state: {
            data: responseData,
            method: methodData,
            cart: cartData,
          },
        });
      })
      .catch((error) => {
        const message = "Layanan pembayaran sedang tidak dapat digunakan";
        Swal.close();
        Swal.fire(message, "", "info");
      });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (validateCookiey("user")) {
      user = JSON.parse(getCookie("user"));
      console.log("user jsd", user);

      setMethodData(state.method);
      setExtraPriceData(state.extraFee);
      orderStatus(state.order.id);
    } else if (
      validateCookiey("init") &&
      JSON.parse(getCookie("init")).trans_id
    ) {
      console.log("state", state);
      const { method, extraFee, order } = state;

      user = {
        username: order.customer_name,
        phone: order.customer_phone,
        email: "flouser@mail.com",
      };

      setMethodData(method);
      setExtraPriceData(extraFee);
      orderStatus(order.id);
    } else {
      history.push("/");
    }
  }, []);

  const createOrder = () => {
    if (!validateExistVA()) {
      const request = {
        card_id: "",
        payment_method_id: methodData.id,
        customer_id: user.phone,
        customer_phone: user.phone,
        customer_name: user.username,
        customer_email: user.email,
        order_from_qr: false,
        voucher: "",
        bind_id: "",
        nomor_name: cartData.nomor_name,
      };
      createPayment(request);
    } else {
      history.push({
        pathname: "./payment-confirm",
        state: {
          data: cartData.payment,
          method: methodData,
          cart: cartData,
        },
      });
    }
  };

  const currCard = (card) => {
    const xCard = card.toLowerCase();
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
    return convertCurrency(data.price);
  };

  // console.log(state)

  return (
    <MenuPageTemplate
      headerText="Online Payment"
      onClickToCart={() => createOrder()}
      buttonText="Bayar"
      checkout
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
            Total Bayar
          </Text>
          <Text title responsive breakpoint={200} color="#FF2020">
            {convertCurrency(
              cartData.service_fee
                ? cartData.total + (methodData.fee || 0) - cartData.service_fee
                : cartData.total + (methodData.fee || 0)
            )}
          </Text>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              pt: 1,
              pb: 1,
              pr: 1,
            }}
          >
            <Text responsive breakpoint={200} color="grey">
              Total Produk
            </Text>
            <Text responsive breakpoint={200} color="grey">
              {convertCurrency(cartData.sub_total || 0)}
            </Text>
          </Box>

          {extraPriceData &&
            extraPriceData.length > 0 &&
            extraPriceData.map((item) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
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
              pb: 1,
              pr: 1,
            }}
          >
            <Text responsive breakpoint={200} color="grey">
              Biaya Platform
            </Text>
            <Text responsive breakpoint={200} color="grey">
              {convertCurrency(cartData.fee || 0)}
            </Text>
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
            <Text responsive breakpoint={200} color="grey">
              Biaya Layanan
            </Text>
            <Text responsive breakpoint={200} color="grey">
              {convertCurrency(methodData.fee || 0)}
            </Text>
          </Box>
        </Container>
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
            <Text responsive breakpoint={200} color="black" title>
              {methodData.name}
            </Text>
            <MenuIcon src={methodData?.code ? methodData.logo_url : cc} />
          </Box>
          {methodData.code === "BNI" ? (
            <VaBniContent />
          ) : methodData.code === "BRI" && methodData.id != 14 ? (
            <VaBriContent />
          ) : methodData.code === "MANDIRI" ? (
            <VaMandiriContent />
          ) : methodData.id == 14 ? (
            <VaTransferContent />
          ) : null}
        </Container>
      </Box>
    </MenuPageTemplate>
  );
};

export default PaymentPage;
