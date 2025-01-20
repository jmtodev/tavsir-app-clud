/* eslint-disable no-nested-ternary */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useHistory,useLocation } from "react-router-dom";
import { font } from "styled-theme";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, CardMedia, IconButton } from "@mui/material";

import menu from "../../../../public/menu.png";


import cart from "../../../../public/cart.png";
import chat from "../../../../public/chat.png";

import {
  getCookie,
} from "../../../services/utils";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: white;
  position: fixed;
  top: 0;
  width: 100%;
`;

const Text = styled.p`
  font-family: ${font("primary")};
  font-weight: 500;
  font-size: 0.75rem;
  text-align: center;
`;

const Image = styled.img`
  margin-right: 0.5rem;
`;

const MenuHeader = ({
  headerText, withCart, withChat, isChat, tenantImage,
  tenantName, id, isFlo, backtocreatepayment }) => {
  const history = useHistory();
  const location = useLocation();


  // const backtocreatepayment = () => {
  //   const trans_id = JSON.parse(getCookie("init")).trans_id
  //   history.push({
  //     pathname: "./checkout",
  //     state: {
  //       data: {
  //         id: trans_id,
  //         isFlo: true
  //       },
  //     },
  //   });
  // };

  return (
    <Wrapper>
     {
        isFlo ? (
          <IconButton aria-label="back-button" onClick={() => backtocreatepayment()}>
            <ArrowBackIcon />
          </IconButton>
        ) : location.pathname !== "/checkout" ? (
          <IconButton aria-label="back-button" onClick={() => history.goBack()}>
            <ArrowBackIcon />
          </IconButton>
        ) : (
          <div style={{ width: 20, height: 20 }} />
        )
      }
      {!isChat ? (
        <>
          <Text>{headerText}</Text>
          {withCart ? (
            <IconButton aria-label="cart-button" onClick={() => history.push("/cart")}>
              <Image src={cart} width={20} height={20} />
            </IconButton>
          ) : withChat ? (
            <IconButton
              aria-label="chat-button"
              onClick={() => history.push({
                pathname: '/chat',
                state: {
                  id,
                },
              })}
            >
              <Image src={chat} width={20} height={20} />
            </IconButton>
          ) : (<div style={{ width: 20, height: 20 }} />)}
        </>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'flex-start', marginLeft: '5px', gap: 2 }}>
          <CardMedia
            component="img"
            sx={{ width: '2rem', borderRadius: '50px' }}
            image={tenantImage}
            alt="chat-photo"
          />
          <Text title responsive breakpoint={200} color="black">{tenantName}</Text>
        </Box>
      )}
    </Wrapper>
  );
};

MenuHeader.propTypes = {
  headerText: PropTypes.string,
  withCart: PropTypes.bool,
  withChat: PropTypes.bool,
  isChat: PropTypes.bool,
  tenantImage: PropTypes.string,
  tenantName: PropTypes.string,
  id: PropTypes.string,
  isFlo: PropTypes.bool,
  backtocreatepayment: PropTypes.func,
};

MenuHeader.defaultProps = {
  headerText: "",
  withCart: false,
  withChat: false,
  isChat: false,
  tenantImage: menu,
  tenantName: "[Tenant]",
  id: '',
  isFlo: false,
  backtocreatepayment: () => undefined,
};

export default MenuHeader;
