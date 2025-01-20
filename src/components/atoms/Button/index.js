/* eslint-disable implicit-arrow-linebreak */
import React from "react";
import PropTypes from "prop-types";
import ButtonStyled from "./styled";

const Button = ({
  id,
  variant,
  onClick,
  disabled,
  btncolor,
  textcolor,
  buttonText,
  fullWidth,
  width,
}) => {
  return (
    <ButtonStyled
      id={id}
      variant={disabled ? null : variant}
      onClick={onClick}
      disabled={disabled}
      btncolor={disabled ? "grey" : btncolor}
      textcolor={disabled ? "white" : textcolor}
      fullWidth={fullWidth}
      width={width}
    >
      {buttonText}
    </ButtonStyled>
  );
};

Button.propTypes = {
  id: PropTypes.string,
  btncolor: PropTypes.string,
  textcolor: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  buttonText: PropTypes.string,
  fullWidth: PropTypes.bool,
  width: PropTypes.string,
};

Button.defaultProps = {
  id: "",
  btncolor: "#244280",
  textcolor: " #FFFFFF",
  variant: "contained",
  onClick: () => undefined,
  disabled: false,
  buttonText: "",
  fullWidth: false,
  width: '100%',
};

export default Button;
