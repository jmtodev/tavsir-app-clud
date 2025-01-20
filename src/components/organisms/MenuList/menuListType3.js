/* eslint-disable operator-linebreak */
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { ifProp, prop } from "styled-tools";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import menu from "../../../../public/menu.png";
import { convertCurrency } from '../../../services/utils';
import { Add } from '../../atoms/AddButton';

const ListWrapper = styled.div`
  /* Auto layout */

  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-x: auto;
`;

const MenuDescWrapper = styled.div`
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
  color: ${prop("color")}
  word-break: break-word;
  @media screen and (max-width: ${prop("breakpoint")}px) {
    display: ${ifProp("responsive", "none !important")};
  }
`

const MenuListType3 = ({ restInfo, menuCard, onClickDetail, disabled }) => {
  return (
    <ListWrapper>
      {menuCard &&
        menuCard.length > 0 &&
        menuCard.map((item, idx) => (
          <Card
            id={`${item.id}-${idx}`}
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: "10px 0px 0px 10px",
              boxShadow: 'none',
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: '6.375rem',
                height: '4.875rem',
                flexShrink: 0,
                backgroundRepeat: 'no-repeat no-repeat',
                backgroundSize: 'contain',
                opacity: disabled ? 0.5 : 1,
              }}
              image={item.photo ? item.photo : menu}
              alt={`menu-${item.id}`}
            />
            <Box sx={{ display: "flex", flexDirection: "column", width: '100%' }} onClick={() => item.stock === 0 || item.is_active === 0 ? null : onClickDetail(item.id)}>
              <>
                <Typography variant="body2" color="text.primary">
                  {item.resto}
                </Typography>
              </>
              <MenuDescWrapper>
                <CardContent sx={{ pt: 0, pb: 0 }}>

                  <Text color={item.stock === 0 || item.is_active === 0 ? "#cccccc" : "#818181"}>{restInfo?.name?.toUpperCase() || null}</Text>
                  <Text color={item.stock === 0 || item.is_active === 0 ? "#cccccc" : "#49454F"}>{item.name}</Text>
                  <Text color={item.stock === 0 || item.is_active === 0 ? "#cccccc" : "#49454F"}>{`Stok: ${item.stock} item(s)`}</Text>
                  <Text color={item.stock === 0 || item.is_active === 0 ? "#cccccc" : "#49454F"} bold>{convertCurrency(item.price)}</Text>
                </CardContent>
                <IconButton aria-label="add">
                  {/* <AddBoxRoundedIcon color="#244280" /> */}
                  <Add disabled={item.stock === 0 || item.is_active === 0} />
                </IconButton>
              </MenuDescWrapper>
            </Box>
          </Card>
        ))}
    </ListWrapper>
  );
};

MenuListType3.propTypes = {
  menuCard: PropTypes.array,
  restInfo: PropTypes.object,
  onClickDetail: PropTypes.func,
  disabled: PropTypes.bool,
};

MenuListType3.defaultProps = {
  menuCard: [],
  restInfo: {},
  onClickDetail: () => {},
  disabled: false,
};

export default MenuListType3;
