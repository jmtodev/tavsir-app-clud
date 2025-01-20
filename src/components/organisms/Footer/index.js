import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import EventNoteIcon from "@mui/icons-material/EventNote";
import HistoryIcon from "@mui/icons-material/History";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { IconButton, Paper } from "@mui/material";

import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types'
import { font } from 'styled-theme';
import { ifProp, prop } from 'styled-tools';
import styled from 'styled-components';
import Button from '../../atoms/Button';
import { getCookie } from '../../../services/utils';

let init = {}

const wrapper = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  gap: "0.75rem",
};

const rowWrapper = {
  display: "inline-flex",
  alignItems: "center",
  width: "90%",
  gap: "0.75rem",
  marginBottom: '1rem',
};

const buttonStyleOutlined = {
  borderRadius: "1.25rem",
  border: "1px solid #344879",
  background: "#FFF",
  color: "#344879",
  textTransform: "capitalize",
};

const Text = styled.p`
  font-family: ${font("primary")};
  font-weight: 500;
  font-size: 0.75rem;
  text-align: center;
  word-break: break-word;
  @media screen and (max-width: ${prop("breakpoint")}px) {
    display: ${ifProp("responsive", "none !important")};
  }
`;

export default function Footer({ historyDetail, onOrderAgain,
  onDownload, sendReceipt, disabledPrint, isConfirmMyOrder,
  buttonText, disabledButton, onClickMyOrder }) {
  const history = useHistory();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    init = JSON.parse(getCookie('init'))
  }, [])


  return (
    <Box sx={{ width: 500 }}>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >

        {isConfirmMyOrder && (
          <div style={{ padding: '1rem' }}>
            <Button
              id="cart-checkout"
              buttonText={buttonText}
              onClick={() => onClickMyOrder()}
              disabled={disabledButton}
            />
          </div>
        )}
        {historyDetail && (
        <Box sx={wrapper}>
          <IconButton aria-label="more" onClick={() => sendReceipt()} disabled={disabledPrint}>
            <Text>Kirim struk ke Whatsapp atau Email</Text>
          </IconButton>
          <Box sx={rowWrapper}>
            {/* <Button variant="outlined" sx={buttonStyleOutlined} fullWidth onClick={() => onOrderAgain()} buttonText="Pesan Lagi" /> */}
            <Button variant="outlined" sx={buttonStyleOutlined} fullWidth onClick={() => onDownload()} buttonText="Download Struk" disabled={disabledPrint} />
          </Box>
        </Box>
        )}
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}

        >
          <BottomNavigationAction
            label="Menu"
            icon={<RestaurantIcon />}
            onClick={() => history.push("/menu")}
            sx={{ color: '#344879 !important' }}
          />
          <BottomNavigationAction
            label="Pesanan Saya"
            icon={<EventNoteIcon />}
            onClick={() => history.push("/my-order-list")}
            sx={{ color: '#344879 !important' }}
          />
          <BottomNavigationAction
            label="Riwayat"
            icon={<HistoryIcon />}
            onClick={() => history.push("/order-history")}
            sx={{ color: '#344879 !important' }}
          />
          <BottomNavigationAction
            label="Keluar"
            icon={<ExitToAppIcon />}
            onClick={() => init.seat ? history.push(`/?tenant_id=${init.tenantId}&nomor=${init.seat}`) : history.push(`/?tenant_id=${init.tenantId}`)}
            sx={{ color: '#344879 !important' }}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}


Footer.propTypes = {
  historyDetail: PropTypes.bool,
  onOrderAgain: PropTypes.func,
  onDownload: PropTypes.func,
  sendReceipt: PropTypes.func,
  disabledPrint: PropTypes.bool,
  isConfirmMyOrder: PropTypes.bool,
  buttonText: PropTypes.func,
  disabledButton: PropTypes.bool,
  onClickMyOrder: PropTypes.func,
};

Footer.defaultProps = {
  historyDetail: false,
  onOrderAgain: () => { },
  onDownload: () => { },
  sendReceipt: () => { },
  disabledPrint: false,
  isConfirmMyOrder: false,
  buttonText: () => { },
  disabledButton: false,
  onClickMyOrder: () => { },
}
