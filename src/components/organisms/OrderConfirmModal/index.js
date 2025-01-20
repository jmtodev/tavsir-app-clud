import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import orderAvailable from "../../../../public/availableOrder.png";
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
  gap: "1rem",
  height: "75vh",
  width: "80vw",
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

const accordionWrapper = {
  maxHeight: "42vh",
  overflowY: "auto",
  width: '100%',
};

const buttonStyle = {
  borderRadius: "1.25rem",
  border: "1px solid #344879",
  background: "#344879",
  textTransform: "capitalize",
};

const buttonStyleOutlined = {
  borderRadius: "1.25rem",
  border: "1px solid #344879",
  background: "#FFF",
  color: "#344879",
  textTransform: "capitalize",
};

export default function OrderConfirmModal({ open, orderData,
  onContinuePayment,
  onCancelOrder,
  onChat }) {
  return (
    <div>
      <Modal
        open={open}
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
              src={orderAvailable}
            />
            <Box component="div">
              <Typography
                id="modal-modal-description"
                sx={{ textAlign: "center", fontWeight: "bold" }}
              >
                Pesanan Tersedia
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ textAlign: "center", color: '#818181' }}
              >
                Produk yang tertera hanya produk yang tersedia
              </Typography>
            </Box>
            <Box sx={accordionWrapper}>
              {orderData && orderData?.detil?.length > 0 && orderData?.detil.map((item) => (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`order-${item.id}`}
                    id={`order-${item.id}`}
                  >
                    <Box justifyContent="space-between" flexDirection="column">
                      <Typography fontSize={12}>{`${item.product_qty}x ${item.product_name}`}</Typography>
                      <Typography fontSize={12}>{convertCurrency(item.product_total_price)}</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography fontSize={12}>
                      Variasi :
                      {item.customize && item.customize.length ? item.customize.map((item) => (
                        <span>
                          {` ${item.pilihan_name}  `}
                        </span>
                      )) : "-"}
                    </Typography>
                    <Typography
                      fontSize={12}
                      sx={{
                        wordBreak: 'break-word' }}
                    >
                      {item.product_note ? `Catatan : ${item.product_note}` : `Catatan : -`}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Box>
          <Box sx={wrapper}>
            <Button variant="contained" sx={buttonStyle} fullWidth onClick={() => onContinuePayment()}>
              Lanjutkan Pembayaran
            </Button>
            <Box sx={rowWrapper}>
              <Button variant="outlined" sx={buttonStyleOutlined} fullWidth onClick={() => onCancelOrder()}>
                Batalkan
              </Button>
              <Button variant="outlined" sx={buttonStyleOutlined} fullWidth onClick={() => onChat()}>
                Hubungi Penjual
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

OrderConfirmModal.propTypes = {
  open: PropTypes.bool,
  orderData: PropTypes.object,
  onContinuePayment: PropTypes.func,
  onCancelOrder: PropTypes.func,
  onChat: PropTypes.func,
};

OrderConfirmModal.defaultProps = {
  open: false,
  orderData: {},
  onContinuePayment: () => { },
  onCancelOrder: () => { },
  onChat: () => { },
};
