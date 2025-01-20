import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";

import waitingPayment from '../../../../public/waiting_payment.png';
import { convertCurrency } from '../../../services/utils';

const style = {
  display: "inline-flex",
  padding: "2.5rem 1.625rem 2.33838rem 1.625rem",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: "1.25rem",
  background: "#FFF",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  gap: "2rem",
  width: "50vw",
};

const wrapper = {
  display: "inline-flex",
  flexDirection: "column",
  // justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  gap: "0.75rem",
};

const buttonStyleOutlined = {
  borderRadius: "1.25rem",
  border: "1px solid #344879",
  background: "#FFF",
  textTransform: "capitalize",
};

export default function WaitingPaymentModal({
  open,
  onMyOrder,
  orderData,
  onClose,
}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={() => onClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={wrapper}>
            <Box
              component="img"
              sx={{
                height: "6.25rem",
                width: "6.25rem",
                objectFit: "contain",
              }}
              alt="Order Available"
              src={waitingPayment}
            />
            <Box component="div">
              <Typography
                id="modal-modal-description"
                sx={{ textAlign: "center", fontWeight: "bold" }}
              >
                Menunggu Pembayaran
              </Typography>
            </Box>
          </Box>
          <Box component="div">
            <Typography
              id="modal-modal-description"
              sx={{ textAlign: "center", fontWeight: "bold", color: "#244280" }}
            >
              {orderData.total ? convertCurrency(orderData.total) : ''}
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ textAlign: "center", color: "#818181" }}
            >
              Bayar di Kasir
            </Typography>
          </Box>
          <Box component="div">
            <Typography
              id="modal-modal-description"
              sx={{ textAlign: "center", color: "#818181" }}
            >
              Pesanan akan disiapkan setelah melakukan pembayaran
            </Typography>
          </Box>
          <Box sx={wrapper}>
            <Button
              variant="outlined"
              sx={buttonStyleOutlined}
              fullWidth
              onClick={() => onMyOrder()}
            >
              Pesanan Saya
            </Button>
            
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

WaitingPaymentModal.propTypes = {
  open: PropTypes.bool,
  onMyOrder: PropTypes.func,
  onClose: PropTypes.func,
  orderData: PropTypes.object,
}

WaitingPaymentModal.defaultProps = {
  open: false,
  onMyOrder: () => { },
  onClose: () => { },
  orderData: {},
};
