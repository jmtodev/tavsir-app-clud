import { StrukTransaksi } from "../../templates/StrukTransaksi";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const ShowRecipt = () => {
  const [cartData, setCartData] = useState([]);
  const history = useHistory();
  const { state } = history.location;

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

  useEffect(() => {
    // window.scrollTo(0, 0);
    const query = new URLSearchParams(history.location.search);
    const trans_id = query.get("trans_order_id");
    orderStatus(trans_id);

    // if (validateCookiey("user")) {

    // } else if (
    //   validateCookiey("init") &&
    //   JSON.parse(getCookie("init")).trans_id
    // ) {
    //   setCartData(state.data);

    //   // console.log("state", state);

    //   if (!state?.isFlo) getPaymentStatus(state.cart.id);
    // } else {
    //   history.push("/");
    // }
  }, [history]);

  return (
    <>
      <div id="receipt-print">
        <StrukTransaksi data={cartData} />
      </div>
    </>
  );
};

export default ShowRecipt;
