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
  overflow-y: auto;
  margin-bottom: 27vh;
  @media screen and (max-width: 480px) {
    margin-bottom: 10vh;
  }
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
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <MenuHeader headerText={headerText} withCart={withCart} />
      <Content>{children}</Content>
      {!isPayment ? (<MenuFooter onClick={() => onClickToCart()} price={price} disabled={disabled} checkout={checkout} buttonText={buttonText} />) : (
        <Footer />
      )}
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
  disabled: PropTypes.bool,
  checkout: PropTypes.bool,
  isPayment: PropTypes.bool,
  buttonText: PropTypes.string,
};

MenuPageTemplate.defaultProps = {
  isPayment: false,
}

export default MenuPageTemplate;
