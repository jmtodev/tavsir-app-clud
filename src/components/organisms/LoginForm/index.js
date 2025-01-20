import React, { useEffect } from "react";
import styled from "styled-components";

import PropTypes from "prop-types";

import { Heading } from "components";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";

const StyledHeading = styled(Heading)`
  text-align: left;
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

const StyledRequired = styled(StyledHeading)`
  width: 100%;
  text-align: right;
  font-size: 11px;
  /* identical to box height, or 143% */

  color: #FF0000;
`;

const StyledButton = styled.div`
  display: flex;
  align-items: flex-end;
  height: 90px;
`;

export default function LoginForm(props) {
  const { values, onChange, onClick } = props;

  return (
    <div>
      <StyledHeading>
        Halo, Guest
        <span role="img" aria-label="hi">
          👋🏻
        </span>
      </StyledHeading>
      <Input
        id="username"
        onChange={(val) => onChange("username", val)}
        label="Nama"
        value={values.username}
        placeholder="Masukkan nama kamu"
        required
        maxlength
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
      <StyledRequired>
        * Wajib diisi
      </StyledRequired>
      <StyledButton>
        <Button
          id="masuk"
          buttonText="Masuk"
          onClick={() => onClick("masuk")}
        />
      </StyledButton>
    </div>
  );
}

LoginForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

LoginForm.defaultProps = {
  values: {
    username: "",
    phone: "",
  },
  onChange: () => undefined,
  onClick: () => undefined,
};
