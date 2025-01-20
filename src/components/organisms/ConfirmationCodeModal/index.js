import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import { TextField } from '@mui/material';

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

const rowWrapper = {
  display: "inline-flex",
  // justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  gap: "0.75rem",
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

export default function ConfirmationCodeModal({
  open,
  onClickSubmit,
  onClickBack, inputValue }) {
  const [input, setInput] = React.useState("");

  const handleInputChange = (event) => {
    setInput(event.target.value);
    inputValue(event.target.value)
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={wrapper}>
            <Typography
              id="modal-modal-description"
              sx={{ textAlign: "center", fontWeight: 500 }}
            >
              Masukan kode konfirmasi
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ textAlign: "center" }}
            >
              Kode ini digunakan untuk mengkonfirmasi pesanan selesai.
            </Typography>
            <TextField
              fullWidth
              size="small"
              variant="standard"
              type="number"
              value={input}
              inputProps={{ maxLength: 4, style: { textAlign: 'center' } }} // the change is here
              onChange={handleInputChange}
            />
          </Box>
          <Box sx={rowWrapper}>
            <Button variant="outlined" sx={buttonStyleOutlined} fullWidth onClick={() => onClickSubmit()}>
              Submit
            </Button>
            <Button variant="contained" sx={buttonStyle} fullWidth onClick={() => onClickBack()}>
              Kembali
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

ConfirmationCodeModal.propTypes = {
  open: PropTypes.bool,
  onClickSubmit: PropTypes.func,
  onClickBack: PropTypes.func,
  inputValue: PropTypes.string,
};

ConfirmationCodeModal.defaultProps = {
  open: false,
  onClickSubmit: () => { },
  onClickBack: () => { },
  inputValue: "",
};
