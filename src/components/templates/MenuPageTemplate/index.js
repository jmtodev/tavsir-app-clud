/* eslint-disable no-nested-ternary */
// https://github.com/diegohaz/arc/wiki/Atomic-Design#templates
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { size } from "styled-theme";
import MenuHeader from "../../organisms/MenuHeader";
import MenuFooter from "../../organisms/MenuFooter";
import Footer from "../../organisms/Footer";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-center: center;
  padding-top: 3.75rem;
  min-height: 100vh;
  box-sizing: border-box;
  @media screen and (max-width: 480px) {
    padding-top: 3.25rem;
  }
`;

const Content = styled.section`
  width: 100%;
  box-sizing: border-box;
  max-width: ${size("maxWidth")};
  overflow-y: auto;
  min-height: 115vh;
  margin-bottom: 28vh;
  @media screen and (max-width: 480px) {
    margin-bottom: 15vh;
  }
`;

const ChatContent = styled.section`
  width: 100%;
  box-sizing: border-box;
  max-width: ${size("maxWidth")};
  overflow-y: hidden;
`;

const MenuPageTemplate = ({
  sponsor,
  children,
  headerText,
  onClickToCart,
  price,
  withCart,
  disabled,
  checkout,
  isPayment,
  buttonText,
  buttonRedirectFlo,
  withChat,
  isChat,
  tenantImage,
  tenantName,
  historyDetail,
  onOrderAgain,
  onDownload,
  sendReceipt,
  noFooter,
  redirectFlo,
  disabledPrint,
  disabledButton,
  isOrderDetail,
  isConfirmMyOrder,
  chatId,
  isFlo,
  onClickToCart2,
  button2Text,
  disabled2Button,
  backtocreatepayment,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <MenuHeader
        headerText={headerText}
        withCart={withCart}
        withChat={withChat}
        isChat={isChat}
        tenantImage={tenantImage}
        tenantName={tenantName}
        id={chatId}
        isFlo={isFlo}
        backtocreatepayment={() => backtocreatepayment()}
      />
      {isChat ? (
        <ChatContent>{children}</ChatContent>
      ) : (
        <Content>{children}</Content>
      )}
      {!isPayment && !noFooter ? (
        <MenuFooter
          onClick={() => onClickToCart()}
          price={price}
          disabled={disabled}
          checkout={checkout}
          buttonText={buttonText}
          buttonRedirectFlo={buttonRedirectFlo}
          historyDetail={historyDetail}
          onOrderAgain={() => onOrderAgain()}
          onDownload={() => onDownload()}
          sendReceipt={() => sendReceipt()}
          disabledPrint={disabledPrint}
          disabledButton={disabledButton}
          onClick2={() => onClickToCart2()}
          button2Text={button2Text}
          disabled2Button={disabled2Button}
          isFlo={isFlo}
          redirectFlo
        />
      ) : !noFooter ? (
        <Footer />
      ) : isOrderDetail ? (
        <MenuFooter
          onClick={() => onClickToCart()}
          price={price}
          disabled={disabled}
          checkout={checkout}
          buttonText={buttonText}
          buttonRedirectFlo={buttonRedirectFlo}
          historyDetail={historyDetail}
          onOrderAgain={() => onOrderAgain()}
          onDownload={() => onDownload()}
          sendReceipt={() => sendReceipt()}
          disabledPrint={disabledPrint}
          disabledButton={disabledButton}
          onClick2={() => onClickToCart2()}
          button2Text={button2Text}
          disabled2Button={disabled2Button}
          isFlo={isFlo}
        />
      ) : isConfirmMyOrder ? (
        <MenuFooter
          isConfirmMyOrder
          buttonText={buttonText}
          buttonRedirectFlo={buttonRedirectFlo}
          onClick={() => onClickToCart()}
          disabledButton={disabledButton}
        />
      ) : redirectFlo ? (
        <MenuFooter
          redirectFlo
          buttonRedirectFlo={buttonRedirectFlo}
        />
      ) : null}
    </Wrapper>
  );
};

MenuPageTemplate.propTypes = {
  sponsor: PropTypes.node,
  children: PropTypes.any.isRequired,
  headerText: PropTypes.string,
  onClickToCart: PropTypes.func,
  price: PropTypes.number,
  withCart: PropTypes.bool,
  withChat: PropTypes.bool,
  isChat: PropTypes.bool,
  disabled: PropTypes.bool,
  checkout: PropTypes.bool,
  isPayment: PropTypes.bool,
  buttonText: PropTypes.string,
  buttonRedirectFlo: PropTypes.string,
  tenantImage: PropTypes.string,
  tenantName: PropTypes.string,
  historyDetail: PropTypes.bool,
  onOrderAgain: PropTypes.func,
  onDownload: PropTypes.func,
  sendReceipt: PropTypes.func,
  noFooter: PropTypes.bool,
  redirectFlo: PropTypes.bool,
  disabledPrint: PropTypes.bool,
  disabledButton: PropTypes.bool,
  isOrderDetail: PropTypes.bool,
  isConfirmMyOrder: PropTypes.bool,
  chatId: PropTypes.string,
  isFlo: PropTypes.bool,
  onClickToCart2: PropTypes.func,
  button2Text: PropTypes.string,
  disabled2Button: PropTypes.bool,
  backtocreatepayment: PropTypes.func
};

MenuPageTemplate.defaultProps = {
  isPayment: false,
  withChat: false,
  isChat: false,
  historyDetail: false,
  noFooter: false,
  redirectFlo: false,
  disabledPrint: false,
  disabledButton: false,
  isConfirmMyOrder: false,
  isOrderDetail: false,
  chatId: "",
  isFlo: false,
  disabled2Button: false,
};

export default MenuPageTemplate;
