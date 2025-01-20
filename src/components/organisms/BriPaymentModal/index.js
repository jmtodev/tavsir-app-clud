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

export default function BriPaymentModal({ open, onClickClose }) {
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
                aria-controls="bri_1"
                id="bri_1"
              >
                <Text>Mobile Banking BRI</Text>
              </AccordionSummary>
              <AccordionDetails sx={{ overflowY: 'auto' }}>
                <Text id="login-aplikasi-BRI">
                    1. Login aplikasi BRI Mobile
                  <br />
                    2. Pilih menu Mobile Bankign BRI &gt; Pembayaran &gt; BRIVA
                  <br />
                    3. Masukkan 5 angka kode perusahaan PT Jasamarga Tollroad Operator (13798) dan nomor virtual account yang tertera
          pada halaman pembayaran (contoh:1379808123456789)
                  <br />
                    4. Masukan Jumlah Pembayaran
                  <br />
                    5. Masukan PIN
                  <br />
                    6. Simpan notifikasi SMS sebagai bukti pembayaran
                </Text>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="bri_2"
                id="bri_2"
              >
                <Text>Internet Banking BRI</Text>
              </AccordionSummary>
              <AccordionDetails sx={{ overflowY: 'auto' }}>
                <Text id="login-pada-alamat">
                    1. Login pada alamat internet Banking BRI
                  {' '}
                  <br />
                    (https://ib.bri.co.id/ib-bri/Login.html)
                  <br />
                    2. Pilih menu Pembayaran Tagihan &gt; Pembayaran &gt; BRIVA
                  <br />
                    3. Pada kolom bayar, masukkan 5 angka kode perusahaan PT Jasamarga Tollroad Operator (89080) dan Nomor HP yang
          terdaftar di akun Travoy Anda (contoh:8908008123456789)
                  <br />
                    4. Di halaman konfirmasi, pastikan detail pembayaran sudah sesuai seperti Nomor BRIVA, Nama Pelanggan dan Jumlah
          Pembayaran
                  <br />
                    5. Masukan password dan mToken
                  <br />
                    6. Cetak/simpan struk pembayaran BRIVA sebagai bukti pembayaran
                </Text>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="bri_3"
                id="bri_3"
              >
                <Text>ATM BRI</Text>
              </AccordionSummary>
              <AccordionDetails sx={{ overflowY: 'auto' }}>
                <Text id="masukan-kartu-debit">
                  1. Masukan Kartu Debit BRI dan PIN Anda
                  <br />
                  2. Pilih menu Transaksi Lain &gt; Pembayaran &gt; Lainnya&gt; BRIVA
                  <br />
                  3. Masukkan 5 angka kode perusahaan PT Jasamarga Tollroad Operator (13798) dan nomor virtual account yang tertera
          pada halaman pembayaran (contoh:1379808123456789)
                  <br />
                  4. Di halaman konfirmasi, pastikan detail pembayaran sudah sesuai seperti Nomor BRIVA, Nama Pelanggan dan Jumlah
          Pembayaran
                  <br />
                  5. Ikuti instruksi untuk menyelesaikan transaksi
                  <br />
                  6. Simpan struk transaksi sebagai bukti pembayaran
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

BriPaymentModal.propTypes = {
  open: PropTypes.bool,
  onClickClose: PropTypes.func,
};

BriPaymentModal.defaultProps = {
  open: false,
  onClickClose: () => {},
};
