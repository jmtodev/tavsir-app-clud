import * as React from "react";
import PropTypes from 'prop-types'
import {
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { Backdrop, Modal,
  Fade } from '@material-ui/core';
import moment from 'moment';

const Message = ({ message }) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleImage = () => {
    setOpen(true);
  };
  const isBot = message.user_type === "tenant";
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isBot ? "flex-start" : "flex-end",
        mb: 2,
      }}
    >
      <Box>
        <Paper
          variant="outlined"
          sx={{
            p: 1,
            backgroundColor: isBot ? "#dddddd" : "#21CCF2",
            borderRadius: isBot ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
          }}
        >
          {message.file && (
          <Box
            component="img"
            sx={{
              height: "7rem",
              width: "7rem",
              objectFit: "contain",
            }}
            alt="image-attach"
            src={message.file}
            onClick={() => handleImage()}
          />
          )}
          <Typography variant="h6" fontSize={12}>{message.text}</Typography>
        </Paper>
        <Typography variant="h6" fontSize={9} textAlign="end">{moment(message.date).format('DD/MM/YY HH:mm')}</Typography>
      </Box>

      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            backgroundcolor: "red",
          },
        }}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open} timeout={500} style={{ outline: "none" }}>
          <img
            src={message.file}
            alt="asd"
            style={{ maxHeight: "90%", maxWidth: "90%" }}
          />
        </Fade>
      </Modal>
    </Box>
  );
};

export default Message;

Message.propTypes = {
  message: PropTypes.object,
}

Message.defaultProps = {
  message: {},
}
