/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-no-duplicate-props */
import {
  FormControlLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { font } from "styled-theme";
import { ifProp, prop } from "styled-tools";

import MenuPageTemplate from "../../templates/MenuPageTemplate";
import RemoveIcon from "../../../../public/remove_icon.png";
import AddIcon from "../../../../public/add_icon.png";
import DisalbledAdd from "../../../../public/DisabledAdd.png";
import DisalbledRemove from "../../../../public/DisabledRemove.png";
import noteIcon from "../../../../public/note_icon.png";
import {
  convertCurrency,
  getCookie,
  setCookie,
  validateCookiey,
} from "../../../services/utils";

let order = [];

const Container = styled.div`
  width: 100%;
  /* Center child horizontally*/
  display: flex;
  justify-content: center;
`;

const MenuDescWrapper = styled.div`
  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px 20px;

  position: absolute;
  width: 77.8vw;
  max-height: 13vh;

  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  top: 25vh;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AddRemoveMenu = styled.div`
  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  gap: 5px;

  position: absolute;
  width: 33vw;
  height: 36px;
  left: 56.2vw;
  top: 22vh;

  /* kuning tavsir */

  background: #ffcb04;
  border-radius: 30px;
`;

const Text = styled.p`
  font-family: ${font("primary")};
  font-weight: 500;
  font-size: ${ifProp("title", "0.875rem", "0.75rem")};
  margin: 0;
  margin-top: 5px;
  color: ${prop("color")}
  word-break: break-word;
  @media screen and (max-width: ${prop("breakpoint")}px) {
    display: ${ifProp("responsive", "none !important")};
  }
`;

const MenuIcon = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50px;
  background-repeat: no-repeat no-repeat;
  background-size: contain;
`;

const MenuDetailContainer = styled(MenuDescWrapper)`
  top: 40vh;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  max-height: 100%;
`;

const Image = styled.img`
  margin-right: 0.5rem;
`;

// const InputQty = styled(TextField)`
//       margin: '0px !important';
//       padding: '0px !important';
//       color: 'white !important';
//       fontSize: '12px !important';
// `

const MenuDetailPage = () => {
  const history = useHistory();
  const { state } = history.location;
  const [menuData, setmenuData] = useState([]);
  const [qtyMenu, setQtyMenu] = useState("0");
  const [totalPrice, setTotalPrice] = useState(0);
  const [optionData, setOptionData] = useState([]);
  const [optionDesc, setOptionDesc] = useState([]);
  const [customizeData, setCustomizeData] = useState([]);
  const [note, setNote] = useState("");
  const [optionFee, setOptionFee] = useState(0);

  async function getMenuDetail() {
    Swal.showLoading();
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    await axios
      .get(
        process.env.TAVSIR_URL + `/api/travshop/product/${state.id}`,
        {},
        { headers }
      )
      .then((response) => {
        Swal.close();
        const { data } = response;
        setmenuData(data);
        if (order.id === data.id) {
          setQtyMenu(Number(qtyMenu) + 1);
        }
      })
      .catch((error) => {
        Swal.close();
        Swal.fire(error, "", "warning");
      });
  }

  const findOptionDetail = (custId, optId) => {
    let item = {};
    if (Object.keys(menuData).length > 0) {
      const { customize } = menuData;

      const customItem = customize.find((item) => item.id === custId);
      const optionItem =
        customItem && customItem.pilihan.find((item) => item.id === optId);
      item = optionItem;
    }
    return item;
  };

  const counTotalPrice = () => {
    let price = 0;

    // Iterate through the arrays and compare their elements
    for (let i = 0; i < customizeData.length; i++) {
      const item = findOptionDetail(customizeData[i], optionData[i]);
      price += item.price;
    }

    setTotalPrice(menuData.price * qtyMenu + price * qtyMenu);
    setOptionFee(price);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (validateCookiey("user")) {
      const isOrder = validateCookiey("order");
      // console.log('isOrder', isOrder);
      if (isOrder) {
        order = JSON.parse(getCookie("order"));
        if (!state.isNewCustom) {
          let selectedOrder = {};

          if (state.data && Object.keys(state.data).length > 0) {
            selectedOrder = state.data;
          } else {
            selectedOrder = order.find((item) => item.product_id === state.id);
          }

          setCustomizeData(selectedOrder?.customize || []);
          setOptionData(selectedOrder?.pilihan || []);
          setOptionDesc(selectedOrder?.orderDesc || "");
          setNote(selectedOrder?.note || "");
          setQtyMenu(selectedOrder?.qty ? selectedOrder?.qty.toString() : "1");
          setTotalPrice(selectedOrder?.price);
        } else {
          setQtyMenu("1");
          getMenuDetail();
        }
      } else if (qtyMenu === "0") {
        setQtyMenu("1");
      } else if (!isOrder) {
        // console.log('order 123', order);
        order = [];
      }
      getMenuDetail();
    } else {
      history.push("/");
    }
  }, []);

  useEffect(() => {
    if (Number(qtyMenu) > 0 && menuData?.price) {
      // const count = menuData.price * Number(qtyMenu)
      // setTotalPrice(count)
      counTotalPrice();
    } else {
      setTotalPrice(0);
    }
  }, [menuData]);

  const addQty = () => {
    let qty = Number(qtyMenu);
    const total = totalPrice + (menuData.price + optionFee);
    qty += 1;
    setTotalPrice(total);
    setQtyMenu(qty.toString());
  };

  const removeQty = () => {
    let qty = Number(qtyMenu);
    qty -= 1;
    if (qty < 0) {
      Swal.fire({
        title: "Oops",
        icon: "warning",
        text: "Jumlah menu dipilih telah 0",
      });
      setTotalPrice(0);
    } else {
      setTotalPrice(totalPrice - (menuData.price + optionFee));
      setQtyMenu(qty.toString());
    }
  };

  const updateQty = (nominal) => {
    let qty = Number(nominal);
    qty = qty < 0 ? "1" : qty;
    let price = 0;
    // Iterate through the arrays and compare their elements
    for (let i = 0; i < customizeData.length; i++) {
      const item = findOptionDetail(customizeData[i], optionData[i]);
      price += item.price;
    }
    if (qty < 0) {
      Swal.fire({
        title: "Oops",
        icon: "warning",
        text: "Jumlah menu dipilih telah 0",
      });
      setTotalPrice(0);
    } else {
      setTotalPrice(menuData.price * qty + price * qty);
      setQtyMenu(qty.toString());
    }
  };

  const validateMandatoryItem = () => {
    const { customize } = menuData;
    const mandatItems =
      menuData &&
      customize.length > 0 &&
      customize.filter((item) => item.must_choose === 1);

    let isIncludes = true;

    if (mandatItems.length > 0) {
      mandatItems.forEach((item) => {
        const { id } = item;
        const noItem = !customizeData.includes(id);
        if (noItem) isIncludes = false;
      });
      return isIncludes;
    }
    return isIncludes;
  };

  const validateOrder = (data) => {
    const order = data.filter(
      (item) => Object.keys(item).length > 0 && !item.length > 0
    );

    return order;
  };

  const updateOrderArray = (orderArray, newObject) => {
    let updated = false;

    for (let i = 0; i < orderArray.length; i++) {
      const orderItem = orderArray[i];
      const allPilihanFound = orderItem.pilihan.every((item) =>
        newObject.pilihan.includes(item)
      );
      const allCutomizeFound = orderItem.customize.every((item) =>
        newObject.customize.includes(item)
      );

      if (
        orderItem.product_id === newObject.product_id &&
        allCutomizeFound &&
        allPilihanFound
      ) {
        orderItem.note = newObject.note;

        if (!state.isNewCustom) {
          orderItem.qty = Number(newObject.qty).toString();
          orderItem.price = newObject.price;
        } else {
          orderItem.qty = (
            Number(orderItem.qty) + Number(newObject.qty)
          ).toString();
          orderItem.price += newObject.price;
        }
        updated = true;
        break;
      }
    }

    if (!updated) {
      orderArray.push(newObject);
    }

    return orderArray;
  };

  const onClickCart = () => {
    if (validateMandatoryItem()) {
      const selectedOrder = {
        name: menuData.name,
        product_id: menuData.id,
        customize: customizeData,
        pilihan: optionData,
        note,
        qty: qtyMenu,
        price: totalPrice,
        photo: menuData.photo,
        description: menuData.description,
        itemPrice: totalPrice / qtyMenu,
        orderDesc: optionDesc,
        stok: menuData.stock,
      };

      if (validateCookiey("order") === false) {
        order = [];
      }
      const validOrder = validateOrder(order);
      const updateOrder = updateOrderArray(validOrder, selectedOrder);
      // console.log('order', order, validateCookiey('order'));

      if (!state.isNewCustom) {
        const removedIndex = state.index;

        validOrder.splice(removedIndex, 1);
        const updateOrderNew = updateOrderArray(validOrder, selectedOrder);
        setCookie("order", JSON.stringify(updateOrderNew));
        history.push("/cart");
      } else {
        // updateCookieObject('order', selectedOrder)
        setCookie("order", JSON.stringify(updateOrder));
        history.push("/menu");
      }
    } else {
      Swal.fire({
        title: "Oops",
        icon: "info",
        text: "Opsi wajib dipilih",
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const custId = Number(name);
    const optId = Number(value);
    const currCust = customizeData;
    const currOpt = optionData;
    const currDesc = optionDesc;
    const desc = findOptionDetail(custId, optId);

    let price = 0;

    if (!customizeData.includes(custId)) {
      currCust.push(custId);
      currOpt.push(optId);
      currDesc.push(desc.name);
    } else {
      const idx = customizeData.findIndex((item) => item === custId);

      // remove past option
      currCust.splice(idx, 1);
      currOpt.splice(idx, 1);
      currDesc.splice(idx, 1);

      // add new option
      currCust.push(custId);
      currOpt.push(optId);
      currDesc.push(desc.name);
    }

    // Iterate through the arrays and compare their elements
    for (let i = 0; i < currCust.length; i++) {
      const item = findOptionDetail(currCust[i], currOpt[i]);
      price += item.price;
    }

    setTotalPrice(menuData.price * qtyMenu + price * qtyMenu);
    setOptionFee(price);

    setCustomizeData(currCust);
    setOptionData(currOpt);
    setOptionDesc(currDesc);
  };

  const getValues = (value) => {
    const val = Number(value);
    if (customizeData.length > 0) {
      const idx = customizeData.findIndex((item) => item === val);
      return optionData[idx];
    }
    return null;
  };

  const validateStockToCart = () => {
    const findId = order.filter(
      (item, idx) => item.product_id === state.id && idx !== state.index
    );
    const qty = findId?.reduce((prev, cur) => prev + Number(cur.qty), 0);
    const total = Number(qty) + Number(qtyMenu);
    if (total >= menuData.stock) {
      return true;
    }
    return false;
  };

  const validateStock = () => {
    const findId = order.filter(
      (item, idx) => item.product_id === state.id && idx !== state.index
    );
    const qty = findId?.reduce((prev, cur) => prev + Number(cur.qty), 0);
    const total = Number(qty) + Number(qtyMenu);
    if (total > menuData.stock) {
      return true;
    }
    return false;
  };

  return (
    <MenuPageTemplate
      headerText={menuData?.name}
      onClickToCart={() => onClickCart()}
      price={totalPrice}
      disabled={qtyMenu < 1 || validateStock()}
      withCart
    >
      <Container>
        <div
          id="menu-pict"
          style={{
            position: "absolute",
            width: "100vw",
            height: "190px",
            left: "0px",
            background: menuData.photo
              ? `url(${menuData.photo}) no-repeat center`
              : `url(${require("../../../../public/menu.png")}) no-repeat center`,
            // backgroundRepeat: 'no-repeat no-repeat',
            backgroundSize: "contain",
          }}
        />
        <MenuDescWrapper>
          <Text title color="#000">
            {convertCurrency(menuData.price)}
          </Text>
          <Text color="#000">{menuData.name}</Text>
          <Text color="#818181">{menuData.description}</Text>
        </MenuDescWrapper>
        <MenuDetailContainer id="option">
          {menuData.customize && menuData.customize.length > 0 && (
            <Text breakpoint={200} responsive color="#818181">
              Pilih Varian
            </Text>
          )}
          {menuData.customize &&
            menuData.customize.length > 0 &&
            menuData.customize.map((item) => (
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "row",
                  }}
                >
                  <Text breakpoint={200} responsive color="#000">
                    {item.name}
                  </Text>
                  <Text breakpoint={200} responsive color="#818181">
                    {`(${
                      item.must_choose === 1 ? "Wajib dipilih" : "Optional"
                    })`}
                  </Text>
                </div>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name={item.id}
                  defaultValue={getValues(item.id)}
                  onChange={handleChange}
                >
                  {item.pilihan &&
                    item.pilihan.length > 0 &&
                    item.pilihan.map((option) => (
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text breakpoint={200} responsive>
                          {option.name}
                        </Text>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Text breakpoint={200} responsive>
                            {convertCurrency(option.price)}
                          </Text>
                          {/* <Checkbox
                      id={`check_${item.id}_${option.id}`}
                      onChange={(e) => onAddOption(e.target.checked, item.id, option)}
                      // checked={optionData && customizeData && optionData.length > 0 && matchArrays(item.id, option.id)}
                    /> */}
                          <FormControlLabel
                            value={option.id}
                            control={<Radio />}
                            label={null}
                            sx={{ m: 0, ".MuiRadio-root": { pr: 0 } }}
                          />
                        </div>
                      </div>
                    ))}
                </RadioGroup>
              </div>
            ))}
          <TextField
            id="note-textfield"
            label="Tambah Catatan"
            value={note}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Image src={noteIcon} width={20} height={20} />
                </InputAdornment>
              ),
              maxLength: 100,
            }}
            inputProps={{
              maxLength: 100,
            }}
            variant="outlined"
            sx={{ width: "78vw", fontFamily: "primary", marginTop: "10px" }}
            onChange={(e) => {
              if (note.length < 101) {
                setNote(e.target.value);
              }
            }}
            multiline
            helperText={`${note.length}/100`}
          />
        </MenuDetailContainer>
        <AddRemoveMenu>
          <IconButton onClick={() => removeQty()} disabled={qtyMenu <= 1}>
            <MenuIcon src={qtyMenu <= 1 ? DisalbledRemove : RemoveIcon} />
          </IconButton>
          <input
            type="text"
            value={qtyMenu}
            style={{
              width: "10vw",
              fontSize: "12px",
              textAlign: "center",
              color: "white",
              backgroundColor: "transparent",
              border: "white solid",
              borderRadius: "5px",
            }}
            min="1"
            onChange={(e) => updateQty(e.target.value.replace(/[^\d.-]+/g, ""))}
          />
          <IconButton
            onClick={() =>
              validateStockToCart()
                ? Swal.fire({
                    title: "Oops",
                    icon: "warning",
                    text: "Jumlah qty menu yang anda dipilih melebihi persediaan",
                  })
                : addQty()
            }
          >
            <MenuIcon src={validateStockToCart() ? DisalbledAdd : AddIcon} />
          </IconButton>
        </AddRemoveMenu>
      </Container>
    </MenuPageTemplate>
  );
};

export default MenuDetailPage;
