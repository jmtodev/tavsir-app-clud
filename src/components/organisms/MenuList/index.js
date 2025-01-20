/* eslint-disable operator-linebreak */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { font } from "styled-theme";
import { ifProp, prop } from "styled-tools";

import { Heading } from "components";

import { IconButton } from "@mui/material";
import MenuListType1 from "./menuListType1";
import MenuListType2 from "./menuListType2";
import MenuListType3 from "./menuListType3";

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 1rem;
`;

const SubTitleWrapper = styled.div`
  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Text = styled.p`
  
  font-weight: ${ifProp("bold", 700, 500)};
  font-size: ${ifProp("title", '0.875rem', '0.75rem')};
  margin: 0;
  margin-top: 5px;
  margin-bottom: 10px;
  color: ${prop("color")}
  word-break: break-word;
  @media screen and (max-width: ${prop("breakpoint")}px) {
    display: ${ifProp("responsive", "none !important")};
  }
`

const MenuList = ({ title, listType, kategoriData, menuData, onClickKategori, onClickDetail, onClickAdd, disabled }) => {
  return (
    <Wrapper>
      {((kategoriData && kategoriData.length > 0)
        || (menuData && menuData.length > 0)) && (
        <SubTitleWrapper>
          <Text title color="#244280">
            {title}
          </Text>
        </SubTitleWrapper>
      )}
      {listType === 1 && <MenuListType1 menuCard={kategoriData} onClickKategori={onClickKategori} />}
      {listType === 2 && <MenuListType2 menuCard={menuData} onClickDetail={onClickDetail} onClickAdd={onClickAdd} />}
      {listType === 3 && <MenuListType3 menuCard={menuData} onClickDetail={onClickDetail} onClickAdd={onClickAdd} />}
    </Wrapper>
  );
};

MenuList.propTypes = {
  title: PropTypes.string,
  listType: PropTypes.number,
  kategoriData: PropTypes.array,
  menuData: PropTypes.array,
  onClickKategori: PropTypes.func,
  onClickDetail: PropTypes.func,
  onClickAdd: PropTypes.func,
  disabled: PropTypes.bool,
};

MenuList.defaultProps = {
  title: "Kategori",
  listType: 1,
  kategoriData: [],
  menuData: [],
  onClickKategori: () => {},
  onClickDetail: () => {},
  onClickAdd: () => { },
  disabled: false,
};

export default MenuList;
