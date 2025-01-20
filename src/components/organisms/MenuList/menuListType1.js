/* eslint-disable operator-linebreak */
import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { font } from "styled-theme";
import { ifProp, prop } from "styled-tools";
// import { useHistory } from "react-router-dom";

import menu from "../../../../public/menu.png";

const SlideWrapper = styled.div`
  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  overflow-x: auto;
`;

const CardWrapper = styled.div`
  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  gap: 10px;

  width: 7rem;
  height: 6rem;

  background: #ffffff;
  border: ${ifProp("isActive", "1px solid #244280", '1px solid #e0e0e0')};
  border-radius: 10px;
  box-shadow: ${ifProp("isActive", "1px 1px 3px rgba(0, 0, 0, 0.25)", null)};

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const MenuIcon = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-repeat: no-repeat no-repeat;
  background-size: contain;
`;

const Text = styled.span`
  font-family: ${font("primary")};
  font-weight: 500;
  font-size: 0.75rem;
  text-align: center;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  @media screen and (max-width: ${prop("breakpoint")}px) {
    display: ${ifProp("responsive", "none !important")};
  }
`;

const MenuListType1 = ({ menuCard, onClickKategori }) => {
  // const history = useHistory();
  const [selected, setSelected] = useState(0)

  const onClick = (idx, id) => {
    setSelected(idx)
    onClickKategori(id)
  }

  return (
    <SlideWrapper>
      <CardWrapper
        key="semua-kategori"
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        isActive={selected === 0}
        onClick={() => onClick(0, null)}
      >
        <MenuIcon src={menu} />
        <Text responsive breakpoint={250}>
        Semua
        </Text>
      </CardWrapper>
      {menuCard &&
        menuCard.length > 0 &&
        menuCard.map((item, idx) => (
          <CardWrapper
            key={item.id}
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            isActive={selected === idx + 1}
            onClick={() => onClick(idx + 1, item.id)}
          >
            <MenuIcon src={item.image ? item.image : menu} />
            <Text responsive breakpoint={250}>
              {item.name}
            </Text>
          </CardWrapper>
        ))}
    </SlideWrapper>
  );
};

MenuListType1.propTypes = {
  menuCard: PropTypes.array,
  onClickKategori: PropTypes.func,
};

MenuListType1.defaultProps = {
  menuCard: [],
  onClickKategori: () => {},
};

export default MenuListType1;
