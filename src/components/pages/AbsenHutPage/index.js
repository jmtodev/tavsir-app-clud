/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
// import qs from 'qs';
import { Container, Card, CardContent, Grid } from "@mui/material";
// import QrReader from "react-qr-reader";
import axios from "axios";
import Swal from "sweetalert2";
// import LoginTemplate from '../../templates/LoginTemplate';
import Html5QrcodePlugin from "./QrCodePlugin";
// import ResultContainerPlugin from './QrCodeResult';

const conatiner = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const title = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#3f51b5",
  color: "#fff",
  padding: 10,
  marginTop: 0,
  marginBottom: 0,
};

const AbsenHutPage = () => {
  const [code, setCode] = useState(null);
  function hitgetpay(result) {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    const data = {
      rest_area_id: 14,
      voucher: result.decodedText,
    };

    axios
      .post(
        process.env.TAVSIR_URL + `/api/travshop/absen`,
        { ...data },
        { headers }
      )
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Sukses",
          text: response.data.message,
          timer: 1000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error?.response?.data?.message,
          timer: 1000,
          showConfirmButton: false,
        });
      });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onNewScanResult = (decodedText, decodedResult) => {
    setCode(decodedResult);
  };

  useEffect(() => {
    if (code !== null) {
      const timer = setTimeout(() => {
        hitgetpay(code);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [code]);

  return (
    <Container sx={conatiner}>
      <Card>
        <h2 style={title}>ABSENSI HUT JMTO</h2>
        <CardContent>
          <Grid
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <h3>Qr Code Scan by Web Cam</h3>
              <Html5QrcodePlugin
                fps={10}
                qrbox={{ width: 500, height: 500 }}
                disableFlip={false}
                qrCodeSuccessCallback={(decodedText, decodedResult) =>
                  onNewScanResult(decodedText, decodedResult)
                }
              />
              {/* <ResultContainerPlugin results={decodedResults?.decodedText || ""} /> */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AbsenHutPage;
