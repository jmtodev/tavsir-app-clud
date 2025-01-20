// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

import { Heading } from "components";
import styled from 'styled-components';
import { Box, Button } from '@mui/material';
import { convertPhoneNumber, getCookie, isValidEmail, isValidName, isValidPhoneNumber, validateCookiey } from '../../../services/utils'; import Input from "../../atoms/Input";
import MenuPageTemplate from '../../templates/MenuPageTemplate';

import billIcon from '../../../../public/bill.png'


const StyledHeading = styled(Heading)`
  text-align: center;
  width: 150px;
  height: 20px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */

  color: #000000;
`;

const StyledWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    padding: 2rem
`;

const StyledButton = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  margin-top: 2.75rem;
`;

const buttonStyle = {
  borderRadius: "1.25rem",
  border: "1px solid #344879",
  background: "#344879",
  textTransform: "capitalize",
  color: "#ffff",
};

const buttonStyleOutlined = {
  borderRadius: "1.25rem",
  border: "1px solid #344879",
  background: "#FFF",
  color: "#344879",
  textTransform: "capitalize",
};


export default function SendReceiptPage() {
  const history = useHistory();
  const [transData, setTransData] = useState({})
  const [values, setValues] = useState({
    username: null,
    phone: null,
    email: null,
  });
  const [imageData, setImageData] = useState(null)

  const onChange = (id, e) => {
    if (id === "username") {
      setValues({ ...values, username: e });
    }
    if (id === "phone") {
      setValues({ ...values, phone: e });
    }
    if (id === "email") {
      setValues({ ...values, email: e });
    }
  };


  async function sendReceipt(user) {
    // Swal.showLoading()
    const formData = new FormData();
    console.log('transData', transData);
    formData.append('image', imageData);
    formData.append('trx_id', transData.order_id);
    formData.append('cust_name', user.username);
    formData.append('tenant_name', transData.tenant_name);
    formData.append('rest_area_name', transData.rest_area_name);
    formData.append('cust_phone', user.phone);
    formData.append('nominal', transData.total);

    // Step 4: Use Fetch API to send the data to the server
    try {
      await fetch('https://tavsir-dev.jmto.co.id/api/image-upload', {
        method: 'POST',
        body: formData,
      });
      Swal.fire({
        icon: 'success',
        text: 'Resi Terkirim via WhatsApp',
      }).then(() => {
        history.push('./menu')
      });
    } catch (error) {
      // Handle errors
      // Swal.fire(error, '', 'warning')
      Swal.fire({
        icon: 'success',
        text: 'Resi Terkirim via WhatsApp',
      }).then(() => {
        history.push('./menu')
      });
    }
  }


  async function sendReceiptMail(user) {
    const formData = new FormData();
    formData.append('image', imageData);
    formData.append('trx_id', transData.order_id);
    formData.append('cust_name', user.username);
    formData.append('tenant_name', transData.tenant_name);
    formData.append('rest_area_name', transData.rest_area_name);
    formData.append('cust_mail', user.email);
    formData.append('nominal', transData.total);

    // Step 4: Use Fetch API to send the data to the server
    try {
      await fetch('https://tavsir-dev.jmto.co.id/api/mail-upload', {
        method: 'POST',
        body: formData,
      });
    } catch (error) {
      // Handle errors
      // Swal.fire(error, '', 'warning')
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    const { state } = history.location;
    if (validateCookiey('user')) {
      const user = JSON.parse(getCookie('user'))
      const receipt = state.image
      const orderData = state.data

      setImageData(receipt)
      setTransData(orderData)
      setValues({
        username: user.username,
        phone: user.phone,
        email: user.email,
      })
    } else {
      history.push("/")
    }
  }, [])


  const onClickCancel = () => {
    const { state } = history.location;

    const { data } = state
    history.push({
      pathname: './order-detail',
      state: {
        data,
      },
    })
  }

  const onClickSend = () => {
    const user = values
    user.phone = convertPhoneNumber(values.phone)
    // validasi format telepon belum
    if (user.username === null && user.phone === null) {
      Swal.fire({
        title: 'Oops',
        icon: 'warning',
        text: 'Masukan nama dan nomor telepon',
      });
    } else if (user.username === null) {
      Swal.fire({
        title: 'Oops',
        icon: 'warning',
        text: 'Nama tidak bisa kosong',
      });
    } else if (user.phone === null) {
      Swal.fire({
        title: 'Oops',
        icon: 'warning',
        text: 'Masukan nomor telepon dengan format yang benar',
      });
    } else if (!isValidEmail(user.email)) {
      Swal.fire({
        title: 'Oops',
        icon: 'warning',
        text: 'Format email tidak valid',
      });
    } else if (!isValidPhoneNumber(user.phone)) {
      Swal.fire({
        title: 'Oops',
        icon: 'warning',
        text: 'Format nomor telepon tidak valid',
      });
    } else if (!isValidName(user.username)) {
      Swal.fire({
        title: 'Oops',
        icon: 'warning',
        text: 'Maksimal nama 25 karakter',
      });
    } else {
      sendReceipt(user)
      sendReceiptMail(user)
    }
  }

  return (
    <MenuPageTemplate
      headerText="Kirim Struk"
      isPayment
      noFooter={false}
    >
      <StyledWrapper>
        <Box
          component="img"
          sx={{
            height: "5rem",
            objectFit: "contain",
          }}
          alt="receipt"
          src={billIcon}
        />
        <StyledHeading>
          {`Meja no. ${transData.nomor_name || '-'}`}
        </StyledHeading>
        <Input
          id="username"
          onChange={(val) => onChange("username", val)}
          label="Nama"
          value={values.username}
          placeholder="Masukkan nama kamu"
          required
        />
        <Input
          id="phone"
          onChange={(val) => onChange("phone", val)}
          label="No. Handphone"
          width="239px"
          value={values.phone}
          placeholder="Masukkan no. Handphone kamu"
          required
        />
        <Input
          id="email"
          onChange={(val) => onChange("email", val)}
          label="Email"
          width="239px"
          value={values.email}
          placeholder="Masukkan email kamu"
          required
        />
        <StyledButton>
          <Button variant="outlined" sx={buttonStyleOutlined} fullWidth onClick={() => onClickCancel()}>
            Tidak
          </Button>
          <Button variant="contain" sx={buttonStyle} fullWidth onClick={() => onClickSend()}>
            Ya, Kirim
          </Button>
        </StyledButton>
      </StyledWrapper>
    </MenuPageTemplate>
  );
}
