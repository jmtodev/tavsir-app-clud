/* eslint-disable no-nested-ternary */
import PropTypes from "prop-types";
import * as React from "react";

import styled from 'styled-components';
import Box from "@mui/material/Box";
import { convertCurrency } from "../../../services/utils";
import Button from "../../atoms/Button";
import Footer from "../Footer";
import { useHistory } from "react-router-dom";


const StyledButton = styled.div`
  display: grid;
  gap: 0.5rem;
  width: 100%;
  margin-top: 2.75rem;
`;



export default function MenuFooter({
  onClick,
  price,
  disabled,
  checkout,
  buttonText,
  historyDetail,
  onOrderAgain,
  onDownload,
  sendReceipt,
  disabledPrint,
  disabledButton,
  isConfirmMyOrder,
  button2Text,
  buttonRedirectFlo,
  onClick2,
  disabled2Button,
  isFlo,
  redirectFlo
}) {
  const history = useHistory();
  return (
    <Box
      sx={{
        margin: "20px",
        marginTop: "auto",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
      elevation={3}
    >
      {checkout ? (
        <StyledButton>
          <Button
            id="cart-checkout"
            buttonText={buttonText || "Checkout"}
            onClick={() => onClick()}
            disabled={disabledButton}
          />
           
          {isFlo && (
            <>
            <Button
              id="cart-checkout-2"
              buttonText={button2Text || "Checkout"}
              onClick={() => onClick2()}
              disabled={disabled2Button}
              btncolor="#FFFFFF"
              textcolor="#244280"
            />

            {redirectFlo ? (

              <Button
                id="cart-checkout-2"
                buttonText={buttonRedirectFlo }
                onClick={() => 
                  // console.log("asdsad")
                  window.location.href = "/direct-flo"
                }
                btncolor="#4c0049"
                textcolor="#FFFFFF"
              />
            ) : ''
            }
            

          
            </>
          )}
        </StyledButton>
      ) : historyDetail ? (
        <Footer
          historyDetail
          onOrderAgain={onOrderAgain}
          onDownload={onDownload}
          sendReceipt={sendReceipt}
          disabledPrint={disabledPrint}
        />
      ) : isConfirmMyOrder ? (
        <Footer
          isConfirmMyOrder
          buttonText={buttonText}
          onClickMyOrder={() => onClick()}
          disabledButton={disabledButton}
        />
      ) : (
        <>
        

          {redirectFlo ? (
            <Button
              id="cart-checkout-2"
              buttonText={buttonRedirectFlo}
              onClick={() => 
                window.location.href = "/direct-flo"
              }
              btncolor="#4c0049"
              textcolor="#FFFFFF"
            />
          ) :   <Button
          id="cart"
          buttonText={`Tambahkan ke Keranjang ${convertCurrency(price)}`}
          onClick={() => onClick()}
          disabled={disabled}
        />}


        </>
        
      )}
    </Box>
  );
}

MenuFooter.propTypes = {
  onClick: PropTypes.func,
  price: PropTypes.number,
  disabled: PropTypes.bool,
  checkout: PropTypes.bool,
  buttonText: PropTypes.string,
  historyDetail: PropTypes.bool,
  onOrderAgain: PropTypes.func,
  onDownload: PropTypes.func,
  sendReceipt: PropTypes.func,
  disabledPrint: PropTypes.bool,
  disabledButton: PropTypes.bool,
  isConfirmMyOrder: PropTypes.bool,
  button2Text: PropTypes.string,
  buttonRedirectFlo: PropTypes.string,
  onClick2: PropTypes.func,
  disabled2Button: PropTypes.bool,
  isFlo: PropTypes.bool,
  redirectFlo: PropTypes.bool
};

MenuFooter.defaultProps = {
  onClick: () => {},
  price: 0,
  disabled: false,
  checkout: false,
  buttonText: null,
  historyDetail: false,
  redirectFlo: false,
  onOrderAgain: () => {},
  onDownload: () => {},
  sendReceipt: () => {},
  disabledPrint: false,
  disabledButton: false,
  isConfirmMyOrder: false,
  onClick2: () => {},
  button2Text: null,
  buttonRedirectFlo: null,
  disabled2Button: false,
  isFlo: false,
};
