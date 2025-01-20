import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";

import moment from 'moment';
import receivedPayment from '../../../../public/received_payment.gif';
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

const buttonStyleOutlined = {
  borderRadius: "1.25rem",
  border: "1px solid #344879",
  background: "#FFF",
  color: "#344879",
  textTransform: "capitalize",
};

const buttonStyle = {
  borderRadius: "1.25rem",
  border: "1px solid #344879",
  background: "#344879",
  textTransform: "capitalize",
  color: "#ffff",
};

export default function PaymentDoneModal({
  open,
  onMyOrder,
  onMyDownload,
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
              src={receivedPayment}
            />
            <Box component="div">
              <Typography
                id="modal-modal-description"
                sx={{ textAlign: "center", fontWeight: "bold" }}
              >
                Pembayaran Berhasil
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ textAlign: "center", color: "#818181" }}
              >
                {moment(orderData.exp_date).format('DD MMMM YYYY HH:mm:ss')}
              </Typography>
            </Box>
          </Box>
          <Box component="div">
            <Typography
              id="modal-modal-description"
              sx={{ textAlign: "center", fontWeight: "bold", color: "#244280" }}
            >
              {convertCurrency(orderData.amount || orderData.total)}
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ textAlign: "center", color: "#818181" }}
            >
              {orderData.sof_code}
            </Typography>
          </Box>
          <Box component="div">
            <Typography
              id="modal-modal-description"
              sx={{ textAlign: "center", fontWeight: "bold", color: "#000" }}
            >
              Terima Kasih!
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ textAlign: "center", color: "#818181" }}
            >
              Pesanan akan segera diproses oleh tenant
            </Typography>
          </Box>
          <Box sx={wrapper}>

            <Button
              variant="outlined"
              sx={buttonStyleOutlined}
              fullWidth
              onClick={() => onMyOrder()}
            >
              {validateCookiey("init") && JSON.parse(getCookie("init")).trans_id ? 'Lanjutkan' : 'Pesanan Saya'}
            </Button>

            {validateCookiey("init") && JSON.parse(getCookie("init")).trans_id ? (
              <Button
                variant="contained"
                sx={buttonStyle}
                fullWidth
                onClick={() => onMyDownload()}
              >
                Download Struk
              </Button>
            )
            : ''
            }
            
            
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

PaymentDoneModal.propTypes = {
  open: PropTypes.bool,
  onMyOrder: PropTypes.func,
  orderData: PropTypes.object,
  onClose: PropTypes.func,
  onMyDownload: PropTypes.func,
}

PaymentDoneModal.defaultProps = {
  open: false,
  onMyOrder: () => { },
  orderData: {},
  onClose: () => { },
  onMyDownload: () => { },
};
