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

export default function MandiriPaymentModal({ open, onClickClose }) {
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
                aria-controls="mandiri_1"
                id="mandiri_1"
              >
                <Text>Livin’ by Mandiri</Text>
              </AccordionSummary>
              <AccordionDetails sx={{ overflowY: 'auto' }}>
                <Text id="cara-bayar-buka">
                    Cara Bayar 1
                  <br />
                    1. Buka aplikasi Livin’ by Mandiri di handphone atau PC
                  <br />
                    2. Masukkan user id dan pin di halaman log in
                  <br />
                    3. Pilih menu BAYAR ➜ BUAT PEMBAYARAN BARU
                  <br />
                    4. Masukkan Penyedia Jasa ➜ “89080” (Jasamarga Tollroad Operator, PT)
                  <br />
                    5. Masukkan Nomor VA, contoh: 89080010XXXXX dan Nominal
                  <br />
                    6. Tekan LANJUT
                  <br />
                    7. Tekan KONFIRMASI
                  <br />
                    8. Masukkan MPIN Banking kemudian tekan OK
                  <br />
                    9. Transaksi Selesai
                  <br />
                  <br />
                    Cara Bayar 2
                  <br />
                    1. Buka aplikasi Livin’ by Mandiri di handphone atau PC
                  <br />
                    2. Masukkan user id dan pin di halaman log in
                  <br />
                    3. Pilih menu TRANSFER RUPIAH ➜ TRANSFER KE PENERIMA BARU
                  <br />
                    4. Masukkan Nomor VA, contoh: 89080010XXXXX dan Nominal
                  <br />
                    5. Tekan LANJUT
                  <br />
                    6. Tekan KONFIRMASI
                  <br />
                    7. Masukkan MPIN Banking kemudian tekan OK
                  <br />
                    8. Transaksi Selesai
                </Text>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="mandiri_2"
                id="mandiri_2"
              >
                <Text>ATM Mandiri</Text>
              </AccordionSummary>
              <AccordionDetails sx={{ overflowY: 'auto' }}>
                <Text id="masukkan-kartu-ATM">
                    1. Masukkan kartu ATM dan PIN
                  <br />
                    2. Pilih menu BAYAR/BELI
                  <br />
                    3. Pilih menu MULTIPAYMENT.
                  <br />
                    4. Masukkan Kode Perusahaan / Institusi, yaitu “89080” (Jasamarga Tollroad Operator, PT)
                  <br />
                    5. Masukkan Nomor VA, contoh: 89080010XXXXX dan Nominal
                  <br />
                    6. KONFIRMASI: Tekan 1 kemudian tekan OK
                  <br />
                    7. Transaksi Selesai
                  <br />
                    8. Simpan Struk Pembayaran
                </Text>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="mandiri_3"
                id="mandiri_3"
              >
                <Text>Mandiri Cabang</Text>
              </AccordionSummary>
              <AccordionDetails sx={{ overflowY: 'auto' }}>
                <Text id="datang-ke-cabang">
                1. Datang ke Cabang Bank Mandiri
                  <br />
                2. Isi slip setoran atau pindah buku
                  <br />
                3. Langkah Pengisian Aplikasi Setoran / Transfer:
                  <br />
                a. Isi Tanggal, Nama &amp; Alamat Pembayar.
                  <br />
                b. Isi penerima dengan kode “89080” (Jasamarga Tollroad Operator, PT)
                  <br />
                c. Isi No. Rekening Nomor VA, contoh: 89080010XXXXX
                  <br />
                d. Isi Jumlah Setoran &amp; Terbilang.
                  <br />
                e. Isi Tujuan Transaksi. Misal: PEMBAYARAN XXXX
                  <br />
                4. Antarkan slip setoran ke teller
                  <br />
                5. Teller akan memproses &amp; mencetak bukti pembayaran
                </Text>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="mandiri_4"
                id="mandiri_4"
              >
                <Text>MCM / MIB</Text>
              </AccordionSummary>
              <AccordionDetails sx={{ overflowY: 'auto' }}>
                <Text id="buka-aplikasi-MCM">
                 1. Buka aplikasi MCM / MIB
                  <br />
                 2. Masukkan company id, user id dan password
                  <br />
                 3. Pilih menu PEMBAYARAN ➜ PEMBAYARAN TAGIHAN
                  <br />
                 4. Pilih rekening debet
                  <br />
                 5. Pilih Institusi / Kode Perusahaan “89080” (Jasamarga Tollroad Operator, PT)
                  <br />
                 6. Masukkan Nomor VA, contoh: 89080010XXXXX dan Nominal
                  <br />
                 7. Tekan LANJUT ➜ KONFIRMASI
                  <br />
                 8. Approve transaksi dengan memasukkan pin dinamis token
                  <br />
                 9. Transaksi selesai
                </Text>
              </AccordionDetails>
            </Accordion>
            <Button fullwidth variant="contained" buttonText="Tutup" onClick={() => onClickClose()} />

          </Box>
        </Box>
      </Modal>
    </div>
  );
}

MandiriPaymentModal.propTypes = {
  open: PropTypes.bool,
  onClickClose: PropTypes.func,

};

MandiriPaymentModal.defaultProps = {
  open: false,
  onClickClose: () => {},

};
