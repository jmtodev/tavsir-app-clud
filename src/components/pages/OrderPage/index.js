/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
/* eslint no-use-before-define: ["error", { "functions": false }] */

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Card, CardContent, CardMedia, IconButton } from "@mui/material";
import styled from "styled-components";
import { font } from "styled-theme";
import { ifProp, prop } from "styled-tools";
import Swal from "sweetalert2";

import axios from "axios";
import AddIcon from "../../../../public/add_blue.png";
import RemoveIcon from "../../../../public/remove_blue.png";
import DisabledRemoveIcon from "../../../../public/DisableRemoveItem.png";
import DisabledAddIcon from "../../../../public/DisableAddIcon.png";
import seatBlueIcon from "../../../../public/seat-blue.png";
import {
  convertCurrency,
  getCookie,
  removeCookie,
  setCookie,
  updateCookieObject,
  validateCookiey,
} from "../../../services/utils";
import MenuPageTemplate from "../../templates/MenuPageTemplate";
import OrderRequestModal from "../../organisms/OrderRequestModal";

import menu from "../../../../public/menu.png";
import OrderCancelConfirmModal from "../../organisms/OrderCancelConfirmModal";
import OrderCanceledModal from "../../organisms/OrderCanceledModal";
import OrderConfirmModal from "../../organisms/OrderConfirmModal";
import Button from "../../atoms/Button";
import SelectSeatModal from "../../organisms/SelectSeatModal";
import ConfirmModal from "../../organisms/ConfirmModal";
import DeleteItemModal from "../../organisms/DeleteItemModal";
// import ChatPage from '../ChatPage';

let order = [];
let restInfo = {};
let user = {};
let init = {};

const Container = styled.div`
  width: 100%;
  /* Center child horizontally*/
  display: flex;
  justify-content: center;
`;

const ButtonContainer = styled(Container)`
  justify-content: ${ifProp("withSeat", "space-between", "flex-end")};
`;

const MenuIcon = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50px;
  background-repeat: no-repeat no-repeat;
  background-size: contain;
`;

const Text = styled.p`
  font-family: ${font("primary")};
  font-weight: 500;
  font-size: ${ifProp("title", "0.875rem", "0.75rem")};
  margin: 0;
  color: ${prop("color")};
  word-break: break-word;
  @media screen and (max-width: ${prop("breakpoint")}px) {
    display: ${ifProp("responsive", "none !important")};
  }
`;

const CardWrapper = styled.div`
  ${""}

  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  gap: 10px;

  width: 100%;

  background: ${ifProp("isActive", "#244280", "#ffffff")};
  border: 1px solid #344879;
  border-radius: 0.625rem;
`;

const OrderPage = () => {
  const history = useHistory();
  const { state } = history.location;
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderData, setOrderData] = useState({});
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [reqCancelOrder, setReqCancelOrder] = useState(false);
  const [openCancelOrder, setOpenCancelOrder] = useState(false);
  const [openCancelConfirm, setOpenCancelConfirm] = useState(false);
  const [openOrderConfirmModal, setOpenOrderConfirmModal] = useState(false);
  const [openDeleteItemModal, setOpenDeleteItemModal] = useState(false);
  const [deletedItemData, setDeletedItemData] = useState({});
  const [orderConfirmData, setOrderConfirmData] = useState({});
  const [extraPriceData, setExtraPriceData] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [openSelectSeatModal, setOpenSelectSeatModal] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [seatList, setSeatList] = useState([]);
  const [disableCheckoutButton, setDisableCheckoutButton] = useState(false);
  const [selectedType, setSelectedType] = React.useState("dine_in");

  const closeAllModal = () => {
    setOpenRequestModal(false);
    setOpenCancelOrder(false);
    setOpenCancelConfirm(false);
    setOpenOrderConfirmModal(false);
    setReqCancelOrder(false);
  };

  const openOrderCanceled = () => {
    setOpenRequestModal(false);
    setOpenCancelConfirm(true);
    setReqCancelOrder(true);
  };

  const requestOrder = (id) => {
    if (!reqCancelOrder && !openCancelOrder && !openCancelConfirm) {
      setOpenRequestModal(true);
      const timer = setTimeout(() => confirmOrder(id), 5000);
      return () => clearTimeout(timer);
    }
    return null;
  };

  const directShowModal = (data) => {
    const { status } = data;
    const { id } = data;

    if (
      status === "WAITING_CONFIRMATION_USER" ||
      status === "WAITING_PAYMENT"
    ) {
      if (data.detil && data.detil.length > 0) {
        setCartData(data?.detil);
        setExtraPriceData(data?.addon_price);
      }
      setOrderConfirmData(data);
      setOpenOrderConfirmModal(true);
    } else if (status === "WAITING_CONFIRMATION_TENANT") {
      if (data.detil && data.detil.length > 0) {
        setCartData(data?.detil);
        setExtraPriceData(data?.addon_price);
      }
      setOrderData(data);
      setOrderConfirmData(data);
      requestOrder(id);
      updateCookieObject("order-data", data);
      // } else if (status === 'WAITING_PAYMENT') {
      //   updateCookieObject('order-data', data)

      //   history.push({
      //     pathname: "./checkout",
      //     state: { data },
      //   })
    } else if (status === "CANCEL") {
      closeAllModal();
      // removeCookie('order')
      // removeCookie('order-data')
      // removeCookie('order-payment')
      // history.push({
      //   pathname: "./order-detail",
      //   state: { data },
      // })

      setOrderData(data);
      setOrderConfirmData(data);
      openOrderCanceled();
    }
  };

  async function getMenuList(id) {
    Swal.showLoading();
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    await axios
      .post(
        process.env.TAVSIR_URL + `/api/travshop/product`,
        {
          name: "",
          tenant_id: init.tenantId,
          category_id: id,
        },
        { headers }
      )
      .then((response) => {
        Swal.close();
        const { data } = response;
        setStockData(data);
      })
      .catch((error) => {
        Swal.close();
        alert("error", error);
      });
  }

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
        setOpenOrderConfirmModal(true);

        setOrderConfirmData(data);
        updateCookieObject("order-data", data);
      })
      .catch((err) => {
        Swal.close();
        setOpenRequestModal(false);
        const errMessage = err.response.data.error;
        if (
          !errMessage.includes("CANCEL") &&
          !reqCancelOrder &&
          !openCancelOrder &&
          !openCancelConfirm
        ) {
          requestOrder(id);
        } else if (errMessage.includes("WAITING_PAYMENT")) {
          const data = JSON.parse(getCookie("order-data"));
          setOpenOrderConfirmModal(true);
          setOrderConfirmData(data[0]);
          updateCookieObject("order-data", data[0]);
        } else {
          orderStatus(id);
          openOrderCanceled();
        }
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
        setOrderConfirmData(data);
        openOrderCanceled();
      })
      .catch((error) => {
        Swal.close();
        Swal.file(error, "", "warning");
      });
  }

  async function createNewOrder(bodyReq) {
    Swal.showLoading();
    setOpenRequestModal(false);
    setDisableCheckoutButton(true);
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    await axios
      .post(
        process.env.TAVSIR_URL + "/api/travshop/self-order",
        {
          ...bodyReq,
        },
        { headers }
      )
      .then((response) => {
        Swal.close();
        const { data } = response;
        const { id } = data;
        const { status } = data;

        if (status !== "WAITING_PAYMENT") {
          setOrderData(data);
          setOrderConfirmData(data);

          requestOrder(id);
          updateCookieObject("order-data", data);
        } else {
          history.push({
            pathname: "./checkout",
            state: { data },
          });
        }
      })
      .catch((error) => {
        const { errors } = error.response.data;
        const message = [];
        const xMessage = [errors]?.forEach((items) => {
          Object.values(items).forEach((item, idx) => {
            item.forEach((x) => {
              if (x.toString().includes("must be at least 1")) {
                message.push(` Produk ke ${idx + 1} minimal dipesan 1.`);
              }
              if (x.toString().includes("stock available is")) {
                const stok = x.toString().slice(-1);
                message.push(
                  ` Stok produk ke ${idx + 1} hanya tersedia ${stok} item(s).`
                );
              }
            });
          });
        });

        Swal.close();
        Swal.fire(message?.toString(), "", "warning");
      });
  }

  async function getExtraPrice() {
    Swal.showLoading();
    setOpenRequestModal(false);
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    await axios
      .get(
        process.env.TAVSIR_URL + `/api/travshop/extra-price/${
          init.tenantId
        }`,
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
        Swal.file(error, "", "warning");
      });
  }

  async function orderStatus(id) {
    Swal.showLoading();
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
        setOrderData(data);
        if (data.status.toLowerCase().includes("done", "ready", "success")) {
          removeCookie("order");
          removeCookie("order-data");
          removeCookie("order-payment");
          removeCookie("seat");

          setCartData([]);
          setSelectedSeat(null);
        } else if (data.status.toLowerCase().includes("waiting_payment")) {
          setOpenOrderConfirmModal(true);
          setOrderConfirmData(data);
        } else {
          directShowModal(data);
        }
      })
      .catch((error) => {
        Swal.close();
        Swal.file(error, "", "warning");
      });
  }

  async function getSeatList() {
    Swal.showLoading();
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    await axios
      .get(
        process.env.TAVSIR_URL + `/api/travshop/number-table?tenant_id=${init.tenantId}`,
        {},
        { headers }
      )
      .then((response) => {
        Swal.close();
        const { data } = response;
        setSeatList(data);
      })
      .catch((error) => {
        Swal.close();
        Swal.file(error, "", "warning");
      });
  }

  const validateOrder = (data) => {
    const order = data.filter(
      (item) => Object.keys(item).length > 0 && !item.length > 0
    );

    return order;
  };

  const onCancelOrder = () => {
    setOpenRequestModal(false);
    setReqCancelOrder(true);
    cancelOrder();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (validateCookiey("init")) {
      init = JSON.parse(getCookie("init"));
      if (validateCookiey("user")) {
        if (state && state.data) {
          const { data } = state;
          directShowModal(data);
        } else if (validateCookiey("order")) {
          getExtraPrice();
          getMenuList();
          getSeatList();

          restInfo = JSON.parse(getCookie("rest_info"));
          user = JSON.parse(getCookie("user"));
          order = JSON.parse(getCookie("order"));
          setCartData(validateOrder(order));

          if (validateCookiey("seat")) setSelectedSeat(getCookie("seat"));

          if (validateCookiey("order-data")) {
            const orderDataCookie = JSON.parse(getCookie("order-data"));
            const data =
              orderDataCookie.length > 0 ? orderDataCookie[0] : orderDataCookie;
            orderStatus(data.id);
          }
        } else {
          getExtraPrice();
          getSeatList();

          restInfo = JSON.parse(getCookie("rest_info"));
          user = JSON.parse(getCookie("user"));

          setCartData({});
          setSelectedSeat(null);
        }
      } else {
        history.push("/");
      }
    } else {
      history.push("/not-found");
    }
    setDisableCheckoutButton(false);
  }, []);

  useEffect(() => {
    if (cartData && cartData.length > 0) {
      let isQtyEmpty = false;
      const pricex = cartData.reduce(
        (prev, cur) => prev + (cur.price || cur.product_total_price || 0),
        0
      );

      cartData.forEach((item) => {
        if (item.qty === "" || item.qty === "0" || item.qty === 0) {
          isQtyEmpty = true;
          console.log("item", item);
        }
      });

      console.log("isQtyEmpty", isQtyEmpty);
      console.log("cartData", cartData);

      setTotalPrice(pricex);
      setDisableCheckoutButton(isQtyEmpty);
    }
  }, [cartData]);

  const updateQuantityById = (array, id, remove, idx) => {
    // Find the object with the matching ID
    const item = array[idx];

    // If the item is found and quantity is greater than 0
    if (remove && item) {
      // Reduce the quantity by 1
      if (Number(item.qty) > 0) {
        item.qty = Number(item.qty) - 1;
        item.price -= item.itemPrice;
        item.qty = item.qty.toString();
      } else {
        Swal.fire({
          title: "Oops",
          icon: "warning",
          text: "Jumlah menu yang dipilih 0",
        });
      }
    } else {
      item.qty = Number(item.qty) + 1;
      item.price += item.itemPrice;
      item.qty = item.qty.toString();
    }
    // Return the updated array
    return array;
  };

  const updateQuantityByInput = (array, idx, value) => {
    // Find the object with the matching ID
    const item = array[idx];

    item.price = value === 0 ? 0 : item.itemPrice * Number(value);
    item.qty = value === 0 ? 0 : value.toString();
    // Return the updated array
    return array;
  };

  const onAdd = (id, idx) => {
    const updateData = updateQuantityById(cartData, id, false, idx);
    setCartData([...updateData]);
    setCookie("order", JSON.stringify([...updateData]));
  };

  const onRemove = (id, idx) => {
    const updateData = updateQuantityById(cartData, id, true, idx);

    setCartData([...updateData]);

    setCookie("order", JSON.stringify([...updateData]));
  };

  const onChangeQty = (idx, val, produc_id) => {
    let value = Number(val) || 0;
    value = value < 0 ? "1" : value;

    const findItem = cartData.filter((item) => item.product_id === produc_id);
    const qty = findItem.reduce((prev, cur) => prev + Number(cur.qty), 0);
    // qty += Number(value)
    const findQty = stockData.find((item) => item.id === produc_id);
    const stock = findQty?.stock;
    const availableQty = stock - qty;
    let updateData = [];

    if (Number(value) > availableQty) {
      updateData = updateQuantityByInput(
        cartData,
        idx,
        availableQty.toString()
      );

      setCartData([...updateData]);
    } else {
      updateData = updateQuantityByInput(cartData, idx, value.toString());

      setCartData([...updateData]);
    }

    if (value === 0) {
      const newArr = [...updateData].filter((item) => item.id !== idx);
      setCookie("order", JSON.stringify(newArr));
    } else {
      setCookie("order", JSON.stringify([...updateData]));
    }
  };

  const onDelete = () => {
    const newArr = cartData;
    const data = newArr.filter((item) => item !== deletedItemData);
    setCartData(data);
    setCookie("order", JSON.stringify(data));

    setOpenDeleteItemModal(false);
  };

  const onEdit = (data) => {
    // onDelete(data)
    const editIdx = cartData.findIndex((item) => item === data);
    history.push({
      pathname: "/menu-detail",
      state: {
        id: data.product_id,
        data,
        index: editIdx,
      },
    });
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

  const createOrder = () => {
    if (
      init.seat === null &&
      selectedSeat === null &&
      selectedType === "dine_in"
    ) {
      Swal.fire({
        title: "Oops",
        icon: "warning",
        text: "Nomor duduk belum dipilih",
      });
    } else if (cartData && cartData.length > 0) {
      const finalOrder = [];
      const validOrder = validateOrder(cartData);
      validOrder.forEach((item) => {
        if (item.qty !== 0) {
          const orderx = {
            product_id: item.product_id,
            customize: item.customize,
            pilihan: item.pilihan,
            note: item.note,
            qty: item.qty,
          };
          finalOrder.push(orderx);
        }
      });

      const orderReq = {
        tenant_id: restInfo.id,
        product: finalOrder,
        customer_id: user.phone,
        customer_name: user.username,
        customer_phone: user.phone,
        nomor_name: init.seat,
        consume_type: selectedType,
      };

      createNewOrder(orderReq);
    }
  };

  const onContinuePayment = () => {
    history.push({
      pathname: "./checkout",
      state: { data: orderConfirmData },
    });
  };

  const countExtraPrice = (data) => {
    if (data.is_percent === 1) {
      const countTax = (data.price * totalPrice) / 100;
      return convertCurrency(countTax);
    }
    return convertCurrency(data.price);
  };

  const countFinalTotal = () => {
    let totalExtra = 0;
    extraPriceData.forEach((item) => {
      if (item.is_percent === 1) {
        const countTax = (item.price * totalPrice) / 100;
        totalExtra += countTax;
      } else {
        totalExtra += item.price;
      }
    });
    const finalTotal = totalPrice + totalExtra;
    return finalTotal;
  };

  const closeCancelModal = () => {
    closeAllModal();
    removeCookie("order");
    removeCookie("order-data");
    removeCookie("order-payment");
    removeCookie("seat");
    history.push({
      pathname: "./order-detail",
      state: { data: orderData },
    });
  };

  const validateStock = (id) => {
    const findId = cartData.filter((item) => item.product_id === id);
    const qty = findId.reduce((prev, cur) => prev + Number(cur.qty), 0);
    const findQty = stockData.find((item) => item.id === id);
    const stock = findQty?.stock;
    if (qty >= stock) {
      return true;
    }
    return false;
  };

  const onClickSeat = (num) => {
    setCookie("seat", num);

    setSelectedSeat(num);
    setOpenSelectSeatModal(false);

    init = {
      tenantId: init.tenantId,
      seat: num,
    };
  };

  return (
    <MenuPageTemplate
      headerText="Keranjang"
      onClickToCart={() => createOrder()}
      disabledButton={!cartData.length > 0 || disableCheckoutButton}
      checkout
    >
      <ButtonContainer withSeat={init.seat === null || selectedSeat !== null}>
        {(init.seat === null || selectedSeat !== null) && (
          <IconButton
            sx={{
              display: "flex",
              width: "4.3125rem",
              justifyContent: "center",
              alignItems: "center",
              margin: "0.3rem",
              ml: "0.6rem",
              mb: "1rem",
              p: "0.7rem 0.3rem",
              flexShrink: 0,
              borderRadius: "0.5rem",
              border: "1px solid #244280",
            }}
            onClick={() => setOpenSelectSeatModal(true)}
          >
            <Box
              component="img"
              sx={{
                objectFit: "contain",
                width: "1rem",
                height: "1rem",
                flexShrink: 0,
                mr: 1,
              }}
              alt="seat-number"
              src={seatBlueIcon}
            />
            <Text color="#244280">
              {selectedSeat === null ? "Meja" : selectedSeat}
            </Text>
          </IconButton>
        )}
        <IconButton
          onClick={() => {
            history.push("/menu");
            updateCookieObject("order", cartData);
          }}
        >
          <Text color="#244280">+ Tambah Item</Text>
        </IconButton>
      </ButtonContainer>
      <Box margin="5px 10px">
        <Text responsive breakpoint={250}>
          Pilih Jenis Pesanan
        </Text>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="row"
        margin="0 8px"
        gap="10px"
      >
        <CardWrapper
          key="dine_in"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          isActive={selectedType === "dine_in"}
          onClick={() => setSelectedType("dine_in")}
        >
          <Text
            responsive
            breakpoint={250}
            color={selectedType === "dine_in" ? "white" : "black"}
          >
            Dine In
          </Text>
        </CardWrapper>
        <CardWrapper
          key="take_away"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          isActive={selectedType === "take_away"}
          onClick={() => setSelectedType("take_away")}
        >
          <Text
            responsive
            breakpoint={250}
            color={selectedType === "take_away" ? "white" : "black"}
          >
            Take Away
          </Text>
        </CardWrapper>
      </Box>

      <Box margin="10px 0 5px 8px">
        <Text responsive breakpoint={250}>
          Rincian Pesanan
        </Text>
      </Box>
      {cartData && cartData.length > 0 ? (
        <>
          <div style={{ maxHeight: "65vh", overflowY: "auto" }} color>
            {cartData.map((item, idx) => (
              <Card
                id={`card_${item.product_id}`}
                sx={{
                  display: "flex",
                  margin: "5px",
                  marginLeft: "12px",
                  boxShadow: "none",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: "4.3125rem" }}
                  image={item.photo || item.product_photo || menu}
                  alt={`menu_${item.product_id}`}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <CardContent sx={{ pl: 2, pb: 1, pr: 1 }}>
                    <Text title responsive breakpoint={200} color="black">
                      {item.name || item.product_name}
                    </Text>
                  </CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      pl: 2,
                      pb: 1,
                      pr: 1,
                      gap: "0.5rem",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        maxWidth: "70%",
                      }}
                    >
                      <Text responsive breakpoint={200} color="grey">
                        {item.description}
                      </Text>
                      <Text responsive breakpoint={200} color="grey">
                        {item.orderDesc?.toString() ||
                          item?.customize?.map((item) => item.pilihan_name) ||
                          ""}
                      </Text>
                      <Text responsive breakpoint={200} color="grey">
                        {item.note || item.product_note || ""}
                      </Text>
                    </Box>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <Text responsive breakpoint={200} color="black">
                        {convertCurrency(item.price || item.product_price || 0)}
                      </Text>
                    </div>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      pl: 1,
                      pb: 1,
                    }}
                  >
                    <div>
                      {/* <IconButton onClick={() => onDelete(item)}> */}
                      <IconButton
                        onClick={() => {
                          setDeletedItemData(item);
                          setOpenDeleteItemModal(true);
                        }}
                      >
                        <Text breakpoint={200} responsive color="#E70011">
                          Hapus
                        </Text>
                      </IconButton>
                      <IconButton onClick={() => onEdit(item)}>
                        <Text breakpoint={200} responsive color="#FFCB04">
                          Edit
                        </Text>
                      </IconButton>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <IconButton
                        onClick={() => onRemove(item.product_id, idx)}
                        disabled={item.qty < 2 || item.product_qty}
                      >
                        <MenuIcon
                          src={
                            item.qty < 2 || item.product_qty < 2
                              ? DisabledRemoveIcon
                              : RemoveIcon
                          }
                        />
                      </IconButton>
                      <input
                        type="text"
                        value={item.qty || item.product_qty || ""}
                        style={{
                          width: "8vw",
                          fontSize: "12px",
                          textAlign: "center",
                          backgroundColor: "transparent",
                          border: "#244280 solid",
                          borderRadius: "5px",
                        }}
                        min="1"
                        max="150"
                        onChange={(e) =>
                          onChangeQty(
                            idx,
                            e.target.value.replace(/[^\d.-]+/g, ""),
                            item.product_id
                          )
                        }
                      />
                      {/* <Text
                        breakpoint={200}
                        responsive
                        color="#000"
                      >
                        {item.qty || item.product_qty}
                      </Text> */}
                      <IconButton
                        onClick={() =>
                          validateStock(item.product_id)
                            ? Swal.fire({
                                title: "Oops",
                                icon: "warning",
                                text: "Jumlah qty menu yang anda dipilih melebihi persediaan",
                              })
                            : onAdd(item.product_id, idx)
                        }
                      >
                        <MenuIcon
                          src={
                            validateStock(item.product_id)
                              ? DisabledAddIcon
                              : AddIcon
                          }
                        />
                      </IconButton>
                    </div>
                  </Box>
                  {item.pilihan && item.pilihan.length > 0 && (
                    <div style={{ display: "flex", justifyContent: "end" }}>
                      <Button
                        buttonText="Customize Another"
                        width="fit-content"
                        onClick={() => {
                          history.push({
                            pathname: "/menu-detail",
                            state: { id: item.product_id, isNewCustom: true },
                          });
                        }}
                      />
                    </div>
                  )}
                </Box>
              </Card>
            ))}
          </div>
          <div style={{ height: "5vh" }}>
            <Box
              sx={{ display: "flex", flexDirection: "column", width: "100%" }}
            >
              <CardContent sx={{ pl: 2, pb: 1, pr: 1 }}>
                <Text responsive breakpoint={200} color="black">
                  Detail Pembayaran
                </Text>
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
                    Subtotal Pesanan
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
                    {convertCurrency(totalPrice)}
                  </Text>
                </div>
              </Box>
            </Box>
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
                  {convertCurrency(countFinalTotal())}
                </Text>
              </div>
            </Box>
          </div>
          <OrderRequestModal
            open={openRequestModal}
            onClickChat={() => onClickChat()}
            onClickCancelOrder={() => onClickCancelOrder()}
          />
          <OrderCancelConfirmModal
            open={openCancelOrder}
            orderData={orderConfirmData}
            onClickCancel={() => onCancelOrder()}
            onClickBack={() => {
              setOpenCancelOrder(false);
              setReqCancelOrder(false);
              confirmOrder(orderConfirmData.id);
            }}
          />
          <OrderCanceledModal
            open={openCancelConfirm}
            orderData={orderConfirmData}
            onClickClose={() => closeCancelModal()}
          />
          <OrderConfirmModal
            open={openOrderConfirmModal}
            orderData={orderConfirmData}
            onContinuePayment={() => onContinuePayment()}
            onCancelOrder={() => onClickCancelOrder()}
            onChat={() => onClickChat()}
          />
          <SelectSeatModal
            open={openSelectSeatModal}
            onSelectSeat={(number) => onClickSeat(number)}
            onClose={() => setOpenSelectSeatModal(false)}
            seatData={seatList}
          />
          <DeleteItemModal
            open={openDeleteItemModal}
            onClickDelete={() => onDelete()}
            onClickCancelOrder={() => setOpenDeleteItemModal(false)}
          />
        </>
      ) : (
        <Text
          breakpoint={200}
          responsive
          color="#000"
          style={{ textAlign: "center" }}
        >
          Anda belum menambahkan pesanan
        </Text>
      )}
    </MenuPageTemplate>
  );
};

export default OrderPage;
