/* eslint-disable react/no-array-index-key */
/* eslint-disable operator-linebreak */
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { ifProp, prop } from "styled-tools";

import { CardActionArea, IconButton } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import menu from "../../../../public/menu.png";
import { convertCurrency } from '../../../services/utils';
import { Add } from '../../atoms/AddButton';

const restInfo = {}


const SlideWrapper = styled.div`
  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  overflow-x: auto;
  height: 100%;
`;

const CardWrapper = styled.div`
  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: stretch;

  width: 9.6875rem;

  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;

  /* Inside auto layout */

  flex: none;
`;

const MenuDescWrapper = styled.div`
  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const Text = styled.p`
  
  font-weight: ${ifProp("bold", 700, 500)};
  font-size: ${ifProp("title", '0.875rem', '0.75rem')};
  margin: 0;
  margin-top: 5px;
  color: ${prop("color")};
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  @media screen and (max-width: ${prop("breakpoint")}px) {
    display: ${ifProp("responsive", "none !important")};
  }
`

const MenuListType2 = ({ restInfo, menuCard, onClickDetail }) => {
  return (
    <SlideWrapper>
      {menuCard &&
        menuCard.length > 0 &&
        menuCard.map((item, idx) => (
          <CardWrapper key={`${item.id}-${idx}`}>
            <CardActionArea onClick={() => onClickDetail(item.id)} disabled={item.stock === 0}>
              <CardMedia
                component="img"
                height="140"
                image={item.photo ? item.photo : menu}
                style={{ borderRadius: "10px 10px 0px 0px", opacity: item.stock === 0 ? 0.5 : 1 }}
                alt={`image-${item.id}`}
              />
              <CardContent style={{ paddingTop: "0px" }}>
                <Typography variant="body2" color={item.stock === 0 ? "#49454F" : "text.primary"}>
                  {item.resto}
                </Typography>
              </CardContent>
              <MenuDescWrapper>
                <CardContent sx={{ pt: 0,
                  pb: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                >
                  <Text color={item.stock === 0 ? "#cccccc" : "#818181"}>{restInfo?.name?.toUpperCase() || null}</Text>
                  <Text color={item.stock === 0 ? "#cccccc" : "#49454F"}>{item.name}</Text>
                  <Text color={item.stock === 0 ? "#cccccc" : "#49454F"} bold>{convertCurrency(item.price)}</Text>
                </CardContent>
                <IconButton aria-label="add">
                  {/* <AddBoxRoundedIcon color="#244280" /> */}
                  <Add disabled={item.stock === 0} />
                </IconButton>
              </MenuDescWrapper>
            </CardActionArea>
          </CardWrapper>
        ))}
    </SlideWrapper>
  );
};

MenuListType2.propTypes = {
  menuCard: PropTypes.array,
  restInfo: PropTypes.object,
  onClickDetail: PropTypes.func,
  onClickAdd: PropTypes.func,
  disabled: PropTypes.bool,
};

MenuListType2.defaultProps = {
  menuCard: [],
  restInfo: {},
  onClickDetail: () => {},
  onClickAdd: () => { },
  disabled: false,
};

export default MenuListType2;
