/* eslint-disable react/prop-types */
/*
We're constantly improving the code you see.
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import styled from 'styled-components';
// import logoGetpay from '../../../../public/img/logo-getpay-4.png';

const LogoGetpayWrapper = styled.div`
  background-image: url(/img/logo-getpay-4.png);
  background-position: 50% 50%;
  background-size: cover;
  height: 3rem;
  width: 14rem;
  margin: auto;
  margin-top: 1rem;
`

export const LogoGetpay = () => {
  return <LogoGetpayWrapper className="LOGO-GETPAY" />;
};
