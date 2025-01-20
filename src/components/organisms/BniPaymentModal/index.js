import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from 'styled-components';
import { font } from 'styled-theme';
import { ifProp } from 'styled-tools';
import Button from '../../atoms/Button';

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
  width: '100%',
};

const Text = styled.p`
  font-family: ${font("primary")};
  font-weight: 500;
  font-size: ${ifProp("title", '0.875rem', '0.75rem')};
  margin: 0;
  margin-top: 5px;
`

export default function BniPaymentModal({ open, onClickClose }) {
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Text title>
              Cara Pembayaran
          </Text>
          <Box sx={accordionWrapper}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="bni_1"
                id="bni_1"
              >
                <Text>ATM BNI</Text>
              </AccordionSummary>
              <AccordionDetails sx={{ overflowY: 'auto' }}>
                <Text id="masukan-kartu-anda">
                    1. Masukan kartu Anda
                  <br />
                    2. Pilih Bahasa
                  <br />
                    3. Masukan PIN ATM Anda
                  <br />
                    4. Pilih ‘Menu Lainnya’
                  <br />
                    5. Pilih ‘Transfer’
                  <br />
                    6. Pilih jenis rekening yang akan Anda gunakan (contoh: ‘Dari Rekening Tabungan’)
                  <br />
                    7. Pilih ‘Virtual Account Billing’
                  <br />
                    8. Masukan nomor Virtual Account Anda (contoh: 8908008123456789)
                  <br />
                    9. Tagihan yang harus dibayarkan akan muncul pada layar konfirmasi
                  <br />
                    10. Transaksi telah selesai
                </Text>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="bni_1"
                id="bni_1"
              >
                <Text>Internet Banking BNI</Text>
              </AccordionSummary>
              <AccordionDetails>
                <Text id="akses-BNI-mobile">
                    1. Akses BNI Mobile Banking dari handphone kemudian masukan user ID dan password
                  <br />
                    2. Pilih menu ‘Transfer’
                  <br />
                    3. Pilih menu ‘Virtual Account Billing’ kemudian pilih rekening debet
                  <br />
                    4. Masukan nomor Virtual Account Anda (contoh: 8908008123456789) pada menu ‘input baru’
                  <br />
                    5. Tagihan yang harus dibayarakan akan muncul pada layar konfirmasi
                  <br />
                    6. Konfirmasi transaksi dan masukan Password Transaksi
                  <br />
                    7. Pembayaran Anda telah berhasil
                </Text>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="bni_2"
                id="bni_2"
              >
                <Text>Internet Banking BNI</Text>
              </AccordionSummary>
              <AccordionDetails sx={{ overflowY: 'auto' }}>
                <Text id="akses-BNI-mobile">
                    1. Akses BNI Mobile Banking dari handphone kemudian masukan user ID dan password
                  <br />
                    2. Pilih menu ‘Transfer’
                  <br />
                    3. Pilih menu ‘Virtual Account Billing’ kemudian pilih rekening debet
                  <br />
                    4. Masukan nomor Virtual Account Anda (contoh: 8908008123456789) pada menu ‘input baru’
                  <br />
                    5. Tagihan yang harus dibayarakan akan muncul pada layar konfirmasi
                  <br />
                    6. Konfirmasi transaksi dan masukan Password Transaksi
                  <br />
                    7. Pembayaran Anda telah berhasil
                </Text>
              </AccordionDetails>
            </Accordion>
          </Box>
          <Button fullwidth variant="contained" buttonText="Tutup" onClick={() => onClickClose()} />
        </Box>
      </Modal>
    </div>
  );
}

BniPaymentModal.propTypes = {
  open: PropTypes.bool,
  onClickClose: PropTypes.func,
};

BniPaymentModal.defaultProps = {
  open: false,
  onClickClose: () => {},
};
