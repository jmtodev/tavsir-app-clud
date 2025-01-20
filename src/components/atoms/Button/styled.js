/* eslint-disable quotes */
/* eslint-disable semi */
import Button from "@mui/material/Button";
import styled from "styled-components";

const ButtonStyle = (props) => ({
  /* Auto layout */

  display: "flex !important",
  flexDirection: "row !important",
  justifyContent: "center !important",
  alignItems: "center !important",
  padding: "8px 16px !important",

  width: `${props.width} !important`,
  height: "40px !important",

  /* biru getpay */
  backgroundColor: `${props.btncolor} !important`,
  color: `${props.textcolor} !important`,
  borderRadius: "50px !important",

  textTransform: "unset !important",
});

const ButtonStyled = styled(Button)(ButtonStyle);

export default ButtonStyled;
