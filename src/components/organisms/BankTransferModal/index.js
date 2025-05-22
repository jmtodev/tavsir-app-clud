import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "styled-components";
import { font } from "styled-theme";
import { ifProp } from "styled-tools";
import Button from "../../atoms/Button";

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
  width: "80vw",
};

const accordionWrapper = {
  maxHeight: "20rem",
  overflowY: "auto",
  width: "100%",
};

const Text = styled.p`
  font-family: ${font("primary")};
  font-weight: 500;
  font-size: ${ifProp("title", "0.875rem", "0.75rem")};
  margin: 0;
  margin-top: 5px;
`;

export default function TransferBankModal({ open, onClickClose }) {
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Text title>Cara Pembayaran</Text>
          <Box sx={accordionWrapper}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="bni_1"
                id="bni_1"
              >
                <Text>Transfer ATM Lainnya</Text>
              </AccordionSummary>
              <AccordionDetails sx={{ overflowY: "auto" }}>
                <Text id="masukan-kartu-anda">
                  1.⁠ ⁠Masukkan kartu ATM dan input PIN <br />
                  2.⁠ ⁠Pilih menu TRANSAKSI LAINNYA - TRANSFER - KE BANK LAIN
                  <br />
                  3.⁠ ⁠Masukan kode 002 (kode bank BRI) sebagai kode bank <br />
                  4.⁠ ⁠Masukkan nomor rekening / nomor virtual akun yang tertera
                  pada aplikasi Travoy <br />
                  5.⁠ ⁠Periksa informasi yang tertera di layar. Pastikan Nama
                  Rekening tujuan adalah GETPAY <br />
                  6.⁠ ⁠Masukkan nominal transfer dan pastikan nominal transfer
                  sesuai dengan total bayar pada aplikasi Travoy.
                  <br />
                  7.⁠ ⁠Konfirmasi pembayaran Anda <br />
                </Text>
              </AccordionDetails>
            </Accordion>
          </Box>
          <Button
            fullwidth
            variant="contained"
            buttonText="Tutup"
            onClick={() => onClickClose()}
          />
        </Box>
      </Modal>
    </div>
  );
}

TransferBankModal.propTypes = {
  open: PropTypes.bool,
  onClickClose: PropTypes.func,
};

TransferBankModal.defaultProps = {
  open: false,
  onClickClose: () => {},
};
