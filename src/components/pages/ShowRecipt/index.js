import { StrukTransaksi } from "../../templates/StrukTransaksi";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ShowRecipt = () => {
  const [cartData, setCartData] = useState([]);
  const history = useHistory();
  const { state } = history.location;

  useEffect(() => {
    window.scrollTo(0, 0);

    setCartData(state.data);
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
  }, []);

  return (
    <>
      <div id="receipt-print">
        <StrukTransaksi data={cartData} />
      </div>
    </>
  );
};

export default ShowRecipt;
