import * as React from 'react';
import Box from '@mui/material/Box';
import {
  Fab,
  Button,
} from '@mui/material';
import PropTypes from "prop-types";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { font } from 'styled-theme';
import { ifProp } from 'styled-tools';
import styled from 'styled-components';
import { convertCurrency } from '../../../services/utils';

const Text = styled.p`
  font-family: ${font("primary")};
  font-weight: 500;
  font-size: ${ifProp("title", '1rem', '0.75rem')};
  margin: 0;
`


export default function FloatingActionButtons({ price, totalProduct, onClick }) {
  return (
    <Box sx={{ '& > :not(style)': { m: '10px 30px' } }}>
      <Fab
        aria-label="add"
        variant="extended"
        size="medium"
        sx={{
          py: 5,
          px: 3,
          position: 'fixed',
          bottom: 70,

          left: 0,
          right: 0,
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: "#E0F4FF",
          borderRadius: '50px',
        }}
        onClick={() => onClick()}
      >
        <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
          <ShoppingCartIcon
            color="primary"
            sx={{ backgroundColor: 'snow',
              padding: '10px',
              borderRadius: '50px' }}
          >
            add_circle
          </ShoppingCartIcon>
          <Box display="flex" flexDirection="column" alignItems="start">
            <Text>{`${totalProduct} items`}</Text>
            <Text title>{convertCurrency(price)}</Text>
          </Box>
        </Box>
      </Fab>
    </Box>
  );
}

FloatingActionButtons.propTypes = {
  price: PropTypes.number,
  totalProduct: PropTypes.string,
  onClick: PropTypes.func,
};

FloatingActionButtons.defaultProps = {
  price: 0,
  totalProduct: '0',
  onClick: () => {},
};
