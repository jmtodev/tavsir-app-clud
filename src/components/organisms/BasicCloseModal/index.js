import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";

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
  gap: "3rem",
  width: "70vw",
};

const wrapper = {
  display: "inline-flex",
  flexDirection: "column",
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
  color: "#fff",
};

export default function BasicCloseMOdal({
  open,
  modalText,
  buttonText,
  onClick,
}) {
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box component="div">
            <Typography
              id="modal-modal-description"
              sx={{ textAlign: "center", color: "#000" }}
            >
              {modalText}
            </Typography>
          </Box>
          <Box sx={wrapper}>
            <Button
              variant="outlined"
              sx={buttonStyle}
              fullWidth
              onClick={() => onClick()}
            >
              {buttonText}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

BasicCloseMOdal.propTypes = {
  open: PropTypes.bool,
  modalText: PropTypes.string,
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
};

BasicCloseMOdal.defaultProps = {
  open: false,
  modalText: "Text",
  buttonText: "Text",
  onClick: () => {},
};
