import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import StorefrontIcon from "@mui/icons-material/Storefront";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import unreceivedPayment from '../../../../public/ureceived_payment.gif';
// import cancaledOrder from "../../../../public/orderConfirm.png";
import { convertCurrency, getCookie } from '../../../services/utils';

let restInfo = {}

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
  height: "70vh",
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

const accordionWrapper = {
  maxHeight: "42vh",
  overflowY: "auto",
  width: '100%',
};

const buttonStyleOutlined = {
  borderRadius: "1.25rem",
  border: "1px solid #344879",
  background: "#FFF",
  color: "#344879",
  textTransform: "capitalize",
};

export default function OrderCanceledModal({ open,
  orderData,
  onClickClose,
}) {
  useEffect(() => {
    restInfo = JSON.parse(getCookie('rest_info'))
  }, [])

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={wrapper}>
            {/* <Box
              component="img"
              sx={{
                height: "6.25rem",
                width: "6.25rem",
                objectFit: "contain",
              }}
              alt="Successfuly canceled order"
              src={cancaledOrder}
            /> */}
            <Box
              component="img"
              sx={{
                height: "6.25rem",
                width: "6.25rem",
                objectFit: "contain",
              }}
              alt="Order canceled"
              src={unreceivedPayment}
            />
            <Typography
              id="modal-modal-description"
              component="span"
              sx={{ textAlign: "center" }}
            >
              Pesanan Dibatalkan
            </Typography>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "1rem",
                color: "grey",
              }}
            >
              <StorefrontIcon />
              <Typography id="modal-description">
                {restInfo.name}
              </Typography>
            </Box>
            <Typography id="modal-reason">
              {`Alasan pembatalan: ${orderData.reason_cancel || '-'}`}
            </Typography>
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
          <Button variant="outlined" sx={buttonStyleOutlined} fullWidth onClick={() => onClickClose()}>
            Tutup
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

OrderCanceledModal.propTypes = {
  open: PropTypes.bool,
  orderData: PropTypes.object,
  onClickClose: PropTypes.func,
};

OrderCanceledModal.defaultProps = {
  open: false,
  orderData: {},
  onClickClose: () => { },
};
