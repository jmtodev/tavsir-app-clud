/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ifProp, prop } from "styled-tools";
import { font } from "styled-theme";

import { Footer, Header, PageTemplate } from "components";
import { Box, CardContent, Tab, Tabs, Button } from "@mui/material";
import styled from "styled-components";
import moment from "moment";
import Swal from "sweetalert2";
import axios from "axios";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  convertCurrency,
  getCookie,
  textColor,
  textStatus,
  validateCookiey,
} from "../../../services/utils";
import ButtonComponent from "../../atoms/Button";

const Text = styled.p`
  font-family: ${font("primary")};
  font-weight: ${ifProp("bold", 700, 500)};
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

const ButtonStyle = {
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  backgroundColor: "transparent",
  textDecoration: "none",
  textTransform: "none",
  color: "inherit",
  fontFamily: "Inter, Helvetica",
  fontSize: "0.75rem",
  letterSpacing: "0.02857em",
  padding: "0px 16px",
  "&:focus": {
    color: "#244280",
  },
  "&:active": {
    color: "#244280",
  },
};

const HistoryPage = () => {
  const history = useHistory();
  const [AllHistoryData, setAllHistoryData] = useState([]);
  const [HistoryData, setHistoryData] = useState([]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getOrderHistory(id) {
    Swal.showLoading();
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    await axios
      .get(
        process.env.TAVSIR_URL + `/api/travshop/order-customer/${id}`,
        {},
        { headers }
      )
      .then((response) => {
        Swal.close();
        const { data } = response;
        setAllHistoryData(data);
        setHistoryData(data);
      })
      .catch((error) => {
        Swal.close();
        Swal.fire(error, "", "warning");
      });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (validateCookiey("user")) {
      const user = JSON.parse(getCookie("user"));

      getOrderHistory(user.phone);
    } else {
      history.push("/");
    }
  }, []);

  useEffect(() => {
    switch (value) {
      case 0:
        setHistoryData(AllHistoryData);
        break;
      case 1:
        setHistoryData(
          AllHistoryData.filter((item) =>
            item.status
              .toLowerCase()
              .includes("waiting_confirmation", "waiting_open")
          )
        );
        break;
      case 2:
        setHistoryData(
          AllHistoryData.filter(
            (item) =>
              item.status.toLowerCase().includes("waiting_payment") ||
              item.status.toLowerCase().includes("queue")
          )
        );
        break;
      case 3:
        setHistoryData(
          AllHistoryData.filter(
            (item) =>
              item.status.toLowerCase().includes("ready") ||
              item.status.toLowerCase().includes("payment_success")
          )
        );
        break;
      case 4:
        setHistoryData(
          AllHistoryData.filter((item) =>
            item.status.toLowerCase().includes("done")
          )
        );
        break;
      case 5:
        setHistoryData(
          AllHistoryData.filter((item) =>
            item.status.toLowerCase().includes("cancel")
          )
        );
        break;
      default:
        setHistoryData(AllHistoryData);
        break;
    }
  }, [value]);

  const onOrderDetail = (data) => {
    if (data.status === "WAITING_PAYMENT") {
      history.push({
        pathname: "./checkout",
        state: {
          data,
        },
      });
    } else if (
      data.status === "WAITING_PAYMENT" &&
      !isVAExp(data.payment.exp_date)
    ) {
      history.push({
        pathname: "./payment-confirm",
        state: {
          data: data.payment,
          method: data.payment_method,
          cart: data.detil,
        },
      });
    } else if (
      data.status === "WAITING_CONFIRMATION_TENANT" ||
      data.status === "WAITING_OPEN"
    ) {
      history.push({
        pathname: "./cart",
        state: {
          data,
        },
      });
    } else if (data.status === "PAYMENT_SUCCESS" || data.status === "READY") {
      history.push({
        pathname: "./my-order",
        state: {
          data,
        },
      });
    } else if (data.status === "QUEUE") {
      history.push({
        pathname: "./checkout",
        state: {
          data,
        },
      });
    } else {
      history.push({
        pathname: "./order-detail",
        state: {
          data,
        },
      });
    }
  };

  const onCopyValue = (num) => {
    // Get the text field
    // const copyText = document.getElementById(id);

    // Copy the text inside the text field
    navigator.clipboard.writeText(num);

    // Alert the copied text

    Swal.fire({
      icon: "info",
      text: `Disalin ${num}`,
    });
  };

  const isVAExp = (date) => {
    const now = moment().format("YYYY-MM-DD HH:mm:ss");
    if (date < now) {
      return true;
    }
    return false;
  };

  return (
    <PageTemplate
      header={<Header TextOnly HeaderText="Riwayat" />}
      footer={<Footer />}
    >
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
        >
          <Tab sx={ButtonStyle} label="Semua" />
          <Tab sx={ButtonStyle} label="Menunggu Konfirmasi" />
          <Tab sx={ButtonStyle} label="Menunggu Pembayaran" />
          <Tab sx={ButtonStyle} label="Disiapkan" />
          <Tab sx={ButtonStyle} label="Selesai" />
          <Tab sx={ButtonStyle} label="Dibatalkan" />
        </Tabs>
        {HistoryData && HistoryData.length > 0 ? (
          HistoryData.map((item, idx) => (
            <Box sx={{ padding: "0.5rem" }}>
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
                  <Text
                    responsive
                    breakpoint={200}
                    color="#000"
                    bold
                    title
                  >{`Pesanan ${idx + 1}`}</Text>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    responsive
                    breakpoint={200}
                    color={textColor(item.status)}
                  >
                    {textStatus(item.status)}
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
                    Waktu Transaksi
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
                  <Text responsive breakpoint={200} color="#000">
                    {item.order_id}
                  </Text>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Text responsive breakpoint={200} color="#000">
                    {moment(item.created_at).format("DD MMM YY HH:mm")}
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
                  <Text
                    responsive
                    breakpoint={200}
                    color="#000"
                    title
                  >{`${item.total_pesanan} item`}</Text>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Text responsive breakpoint={200} color="#244280">
                    {convertCurrency(item.total)}
                  </Text>
                </div>
              </Box>
              {item.status.toLowerCase().includes("waiting_payment") &&
                item.payment_method !== null &&
                Object.keys(item.payment_method).length > 0 &&
                item.payment !== null &&
                Object.keys(item.payment).length > 0 && (
                  <>
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
                        <Text
                          responsive
                          breakpoint={200}
                          color="#000"
                          title
                        >{`Metode: ${item.payment_method.name}`}</Text>
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
                        <Text responsive breakpoint={200} color="#244280" title>
                          {isVAExp(item.payment.exp_date)
                            ? "Metode bayar telah expired, silahkan pilih ulang metode pembayaran baru"
                            : `VA Number: ${item.payment.va_number}`}
                        </Text>
                      </div>
                      {!isVAExp(item.payment.exp_date) && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                          }}
                        >
                          <Button
                            variant="outlined"
                            sx={{ border: "none" }}
                            endIcon={<ContentCopyIcon />}
                            onClick={() => onCopyValue(item.payment.va_number)}
                          >
                            Salin
                          </Button>
                        </div>
                      )}
                    </Box>
                  </>
                )}
              {item.status.toLowerCase().includes("waiting_payment") &&
                item.payment_method === null &&
                item.payment === null && (
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
                      <Text responsive breakpoint={200} color="#244280" title>
                        Anda belum memilih metode bayar.
                      </Text>
                    </div>
                  </Box>
                )}
              {item.status.toLowerCase().includes("queue") && (
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
                    <Text responsive breakpoint={200} color="#244280" title>
                      Silahkan melanjutkan pembayaran di kasir.
                    </Text>
                  </div>
                </Box>
              )}
              <ButtonComponent
                fullWidth
                variant="outlined"
                buttonText="Detail"
                btncolor="#FFFFFF"
                textcolor="#244280"
                onClick={() => onOrderDetail(item)}
              />
            </Box>
          ))
        ) : (
          <CardContent sx={{ pl: 2, pb: 1, pr: 1 }}>
            <Text
              responsive
              breakpoint={200}
              color="grey"
              style={{ textAlign: "center" }}
            >
              Anda Belum Memiliki Riwayat Pemesanan
            </Text>
          </CardContent>
        )}
      </Box>
    </PageTemplate>
  );
};

export default HistoryPage;
