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

export default function DeleteItemModal({ open, onClickDelete,
  onClickCancelOrder }) {
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-description"
            sx={{ textAlign: "center" }}
          >
              Apakah Anda yakin menghapus produk ini?
          </Typography>
          <Button variant="contained" sx={buttonStyle} fullWidth onClick={() => onClickDelete()}>
          Ya
          </Button>
          <Button variant="outlined" sx={buttonStyleOutlined} fullWidth onClick={() => onClickCancelOrder()}>
          Batalkan
          </Button>
        </Box>
      </Modal>
    </div>
  );
}


DeleteItemModal.propTypes = {
  open: PropTypes.bool,
  onClickDelete: PropTypes.func,
  onClickCancelOrder: PropTypes.func,
};

DeleteItemModal.defaultProps = {
  open: false,
  onClickDelete: () => { },
  onClickCancelOrder: () => { },
};
