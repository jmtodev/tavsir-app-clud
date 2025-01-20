import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ifProp, prop } from "styled-tools";


import Input from "../../atoms/Input";
import IconLink from "../../molecules/IconLink";

import logo from "../../../../public/icon.png";
import cart from "../../../../public/cart.png";

const Wrapper = styled.div`
  display: flex;
  justify-content: ${ifProp("center", 'center', 'space-between')};
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: white;
  gap: 1rem;
`;

const Text = styled.p`
  
  font-weight: ${ifProp("bold", 700, 500)};
  font-size: ${ifProp("title", '1rem', '0.75rem')};
  margin: 0;
  margin-top: 5px;
  color: ${prop("color")}
  word-break: break-word;
  @media screen and (max-width: ${prop("breakpoint")}px) {
    display: ${ifProp("responsive", "none !important")};
  }
`

const Header = ({ TextOnly, HeaderText, onSearchMenu }) => {
  const [value, setValue] = useState("");

  const onChange = (id, val) => {
    setValue(val);
    onSearchMenu(val)
  };

  // const onEnterFunction = (e) => {
  //   if (e.keyCode === 13) {
  //   }
  // }

  return (
    <>
      {TextOnly ? (<Wrapper center><Text color="#244280" title>{HeaderText}</Text></Wrapper>) : (
        <Wrapper>
          <IconLink to="/menu" icon={logo} />
          <Input
            id="search"
            label="Mau pesan apa? "
            value={value}
            width="16rem !important"
            onChange={(val) => onChange("search", val)}
            // onKeyDown={(e) => { e.keyCode === 13 ? onEnterFunction() : null }}
            onSearchMenu={() => onSearchMenu(value)}
            withEndIcon
          />
          <IconLink to="/cart" icon={cart} />
        </Wrapper>
      )}
    </>
  );
};

Header.propTypes = {
  TextOnly: PropTypes.bool,
  HeaderText: PropTypes.string,
  onSearchMenu: PropTypes.func,
};

Header.defaultProps = {
  TextOnly: false,
  HeaderText: "",
  onSearchMenu: () => {},
};

export default Header;
