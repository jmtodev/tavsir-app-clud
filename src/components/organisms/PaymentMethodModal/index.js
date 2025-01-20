import * as React from "react";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// import PropTypes from "prop-types";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

const accordionWrapper = {
  maxHeight: "auto",
  overflowY: "auto",
};

export default function PaymentMethodModal() {
  return (
    <div>
      <Modal
        open
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
                Cara Pembayaran
              </Typography>
            </Box>
            {/* <Box sx={accordionWrapper}>
              {orderData &&
                orderData.length > 0 &&
                orderData.map((item) => (
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`order-${item.id}`}
                      id={`order-${item.id}`}
                    >
                      <Typography>item</Typography>
                      <Typography>item</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>Rasa :</Typography>
                      <Typography>Topping :</Typography>
                      <Typography>Catatan :</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </Box> */}
            <Box sx={accordionWrapper}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="test"
                  id="order"
                >
                  <Typography>item</Typography>
                  <Typography>item</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Rasa :</Typography>
                  <Typography>Topping :</Typography>
                  <Typography>Catatan :</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="test"
                  id="order"
                >
                  <Typography>item</Typography>
                  <Typography>item</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Rasa :</Typography>
                  <Typography>Topping :</Typography>
                  <Typography>Catatan :</Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

// PaymentMethodModal.propTypes = {
//   open: PropTypes.bool,
//   orderData: PropTypes.array,
//   onContinuePayment: PropTypes.func,
//   onCancelOrder: PropTypes.func,
//   onChat: PropTypes.func,
// };

// PaymentMethodModal.defaultProps = {
//   open: false,
//   orderData: [],
//   onContinuePayment: () => {},
//   onCancelOrder: () => {},
//   onChat: () => {},
// };
