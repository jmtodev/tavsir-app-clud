import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";

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
  gap: "3rem",
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

const rowWrapper = {
  display: "inline-flex",
  // justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  gap: "0.75rem",
};

const buttonStyle = {
  borderRadius: "1.25rem",
  border: "1px solid #344879",
  background: "#344879",
  textTransform: "capitalize",
  color: "#fff",
};

const buttonStyleOutlined = {
  borderRadius: "1.25rem",
  border: "1px solid #344879",
  background: "#FFF",
  color: "#344879",
  textTransform: "capitalize",
};

export default function CashierPaymentModal({
  open,
  onContinuePayment,
  onCancelOrder,
}) {
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={wrapper}>
            <Box component="div">
              <Typography
                id="modal-modal-description"
                sx={{ textAlign: "center", fontWeight: "bold" }}
              >
                Konfirmasi Pembayaran ke Kasir akan menutup transaksi
              </Typography>
            </Box>
          </Box>
          <Box component="div">
            <Typography
              id="modal-modal-description"
              sx={{ textAlign: "center", color: "#818181" }}
            >
              Yakin akan melanjutkan pembayaran?
            </Typography>
          </Box>
          <Box sx={wrapper}>
            <Box sx={rowWrapper}>
              <Button
                variant="outlined"
                sx={buttonStyleOutlined}
                fullWidth
                onClick={() => onCancelOrder()}
              >
                Kembali
              </Button>
              <Button
                variant="outlined"
                sx={buttonStyle}
                fullWidth
                onClick={() => onContinuePayment()}
              >
                Ya, Lanjutkan
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

CashierPaymentModal.propTypes = {
  open: PropTypes.bool,
  onContinuePayment: PropTypes.func,
  onCancelOrder: PropTypes.func,
};

CashierPaymentModal.defaultProps = {
  open: false,
  onContinuePayment: () => {},
  onCancelOrder: () => {},
};
