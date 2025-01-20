import * as React from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";

import unreceivedPayment from '../../../../public/ureceived_payment.gif';
import loadingLogo from '../../../../public/loadinglogo.gif';

import { convertCurrency, getCookie, validateCookiey } from '../../../services/utils';


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
  width: "70vw",
};

const wrapper = {
  display: "inline-flex",
  flexDirection: "column",
  // justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  gap: "0.75rem",
};

export default function UnrecievedPaymentModal({
  open,
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
              src={validateCookiey("init") && JSON.parse(getCookie("init")).trans_id ? loadingLogo : unreceivedPayment}
              
            />
            <Box component="div">
              <Typography
                id="modal-modal-description"
                sx={{ textAlign: "center", fontWeight: "bold" }}
              >
                Pembayaran Belum Diterima
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ textAlign: "center", color: "#818181" }}
              >
                Silahkan lakukan pembayaran dengan metode pembayaran yang dipilih
              </Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

UnrecievedPaymentModal.propTypes = {
  open: PropTypes.bool,
  orderData: PropTypes.object,
  onClose: PropTypes.func,
}

UnrecievedPaymentModal.defaultProps = {
  open: false,
  orderData: {},
  onClose: () => {},
};
