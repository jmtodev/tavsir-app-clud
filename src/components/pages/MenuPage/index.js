import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";

import { Footer, Header, Heading, MenuList, PageTemplate } from "components";
import {
  getCookie,
  setCookie,
  updateAddCookieObject,
  validateCookiey,
} from "../../../services/utils";
import FloatingActionButtons from "../../organisms/FloatingButton";

require('dotenv').config();
// import menu from "../../../../public/menu.png";

// const kategoriCard = [
//   {
//     id: 123,
//     image: menu,
//     name: "Makanan",
//   },
//   {
//     id: 124,
//     image: menu,
//     name: "Minuman",
//   },
//   {
//     id: 125,
//     image: menu,
//     name: "Side Dish",
//   },
//   {
//     id: 126,
//     image: menu,
//     name: "Beer",
//   },
//   {
//     id: 126,
//     image: menu,
//     menu: "Pastry",
//   },
//   {
//     id: 126,
//     image: menu,
//     name: "Wine",
//   },
// ];

// const menuCard = [
//   {
//     id: 123,
//     photo: menu,
//     resto: "Samarina",
//     name: "Sate Maranggi",
//     price: 20000,
//   },
//   {
//     id: 124,
//     photo: menu,
//     resto: "Samarina",
//     name: "Sate Maranggi",
//     price: 20000,
//   },
//   {
//     id: 125,
//     photo: menu,
//     resto: "Samarina",
//     name: "Sate Maranggi",
//     price: 20000,
//   },
//   {
//     id: 126,
//     photo: menu,
//     resto: "Samarina",
//     name: "Sate Maranggi",
//     price: 20000,
//   },
// ];

let restInfo = {};
let user = {};
let init = {};
let order = [];
let orderPrice = 0;
let orderQty = 0;

const MenuPage = () => {
  const history = useHistory();
  const [menuData, setMenuData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [kategoriData, setKategoriData] = useState([]);

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
        data.sort((x, y) => y.stock - x.stock);
        data.sort((x, y) => y.is_active - x.is_active);
        setAllData(data);
        setMenuData(data);
      })
      .catch((error) => {
        Swal.close();
        alert("error", error);
      });
  }

  async function getCategoryList() {
    Swal.showLoading();
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    await axios
      .get(
        process.env.TAVSIR_URL + `/api/travshop/product-category-tenant/${
          init.tenantId
        }`,
        {},
        { headers }
      )
      .then((response) => {
        Swal.close();
        const { data } = response;
        setKategoriData(data);
      })
      .catch((error) => {
        Swal.close();
        alert("error", error);
      });
  }

  async function getRestoInfo() {
    Swal.showLoading();
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    await axios
      .get(
        process.env.TAVSIR_URL + `/api/travshop/tenant/${
          init.tenantId
        }`,
        {},
        { headers }
      )
      .then((response) => {
        Swal.close();
        const { data } = response;

        restInfo = data;
        setCookie("rest_info", JSON.stringify(data));
      })
      .catch((error) => {
        Swal.close();
        alert("error", error);
      });
  }

  const validateOrder = (data) => {
    const order = data.filter(
      (item) => Object.keys(item).length > 0 && !item.length > 0
    );

    return order;
  };

  const countFinalTotal = (data) => {
    let total = 0;
    data.forEach((item) => {
      total += item.price;
    });
    return total;
  };

  const countQtyTotal = (data) => {
    let total = 0;
    data.forEach((item) => {
      total += Number(item.qty);
    });
    return total;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    order = [];
    orderPrice = 0;
    if (validateCookiey("user")) {
      if (validateCookiey("init")) {
        init = JSON.parse(getCookie("init"));
        if (validateCookiey("order")) {
          order = validateOrder(JSON.parse(getCookie("order")));
          orderPrice = countFinalTotal(order);
          orderQty = countQtyTotal(order);
        } else {
          order = [];
          orderPrice = 0;
          orderQty = 0;
        }
        getMenuList();
        getCategoryList();
        getRestoInfo();

        user = JSON.parse(getCookie("user"));
      } else {
        history.push("/not-found");
      }
    } else {
      history.push("/");
    }
  }, []);

  const onClickKategori = (id) => {
    getMenuList(id);
  };

  const onClickDetail = (id) => {
    history.push({
      pathname: "/menu-detail",
      state: { id, isNewCustom: true },
    });
  };

  const onClickAdd = (id) => {
    let selectedMenu = menuData.find((item) => item.id === id);
    selectedMenu = [
      {
        name: selectedMenu.name,
        product_id: selectedMenu.id,
        customize: selectedMenu.customize,
        pilihan: selectedMenu.pilihan,
        note: "",
        qty: 1,
        price: selectedMenu.price,
        photo: selectedMenu.photo,
      },
    ];
    updateAddCookieObject("order", selectedMenu);
  };

  const onSearchMenu = (value) => {
    if (value) {
      const valueLow = value?.toLowerCase();
      const menu = allData.filter(
        (item) =>
          item?.name?.toLowerCase()?.includes(valueLow) ||
          item?.description?.toLowerCase()?.includes(valueLow)
      );

      setMenuData(menu);
    } else {
      setMenuData(allData);
    }
  };

  return (
    <PageTemplate
      header={<Header onSearchMenu={(value) => onSearchMenu(value)} />}
      footer={<Footer />}
    >
      {/* <PostForm />
      <PostList limit={15} /> */}
      <div style={{ padding: "0 1rem" }}>
        <Heading level={2}>
          {`Halo, ${user?.username}`}
          <span role="img" aria-label="hi">
            👋🏻
          </span>
        </Heading>
      </div>
      <MenuList
        title="Kategori"
        listType={1}
        kategoriData={kategoriData}
        onClickKategori={(id) => onClickKategori(id)}
      />
      {/* <MenuList title="Rekomendasi" listType={2} menuData={menuData} restInfo={restInfo} onClickDetail={(id) => onClickDetail(id)} onClickAdd={(id) => onClickAdd(id)} /> */}
      <MenuList
        title="Menu"
        listType={3}
        menuData={menuData}
        restInfo={restInfo}
        onClickDetail={(id) => onClickDetail(id)}
        onClickAdd={(id) => onClickAdd(id)}
      />
      {order && order.length > 0 && (
        <FloatingActionButtons
          price={orderPrice}
          totalProduct={orderQty}
          onClick={() => history.push("/cart")}
        />
      )}
    </PageTemplate>
  );
};

export default MenuPage;
