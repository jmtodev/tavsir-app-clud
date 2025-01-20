import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import orderConfirm from '../../../../public/order_confirm.gif';

const style = {
  display: "inline-flex",
  padding: "2.5rem 1.625rem 2.33838rem 1.625rem",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "1.25rem",
  background: "#FFF",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  gap: "1rem",
  width: "60vw",
};

const buttonStyle = {
  borderRadius: "1.25rem",
  border: "1px solid #344879",
  background: "#344879",
};

const buttonStyleOutlined = {
  borderRadius: "1.25rem",
  border: "1px solid #344879",
  background: "#FFF",
  color: "#344879",
};

export default function OrderRequestModal({ open, onClickChat,
  onClickCancelOrder }) {
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component="img"
            sx={{
              height: "6.25rem",
              width: "6.25rem",
              objectFit: "contain",
            }}
            alt="Order Request"
            src={orderConfirm}
          />
          <Box component="div">
            <Typography
              id="modal-modal"
              sx={{ textAlign: "center" }}
            >
              Tunggu yaa..
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ textAlign: "center" }}
            >
              Lagi nunggu konfirmasi pesanan dari toko
            </Typography>
          </Box>
          <Button variant="contained" sx={buttonStyle} fullWidth onClick={() => onClickChat()}>
          Hubungi Penjual
          </Button>
          <Button variant="outlined" sx={buttonStyleOutlined} fullWidth onClick={() => onClickCancelOrder()}>
          Batalkan Pesanan
          </Button>
        </Box>
      </Modal>
    </div>
  );
}


OrderRequestModal.propTypes = {
  open: PropTypes.bool,
  onClickChat: PropTypes.func,
  onClickCancelOrder: PropTypes.func,
};

OrderRequestModal.defaultProps = {
  open: false,
  onClickChat: () => { },
  onClickCancelOrder: () => { },
};
