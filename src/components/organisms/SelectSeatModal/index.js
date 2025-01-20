import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import styled from "styled-components";
import { font } from "styled-theme";
import { ifProp, prop } from "styled-tools";

import selectedIcon from "../../../../public/seat-white.png";
import unSelectedIcon from "../../../../public/seat-blue.png";

const style = {
  display: "inline-flex",
  padding: "1.5rem",
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
  height: "75vh",
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

const buttonStyleOutlined = {
  borderRadius: "1.25rem",
  border: "1px solid #FFF ",
  background: "#344879",
  color: "#FFF",
  textTransform: "capitalize",
};

const CardWrapper = styled.div`
  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  gap: 10px;

  width: 4rem;
  height: 5rem;

  background: ${ifProp("isActive", "#244280", "#ffffff")};
  border: 1px solid #344879;
  border-radius: 0.625rem;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const MenuIcon = styled.img`
  width: 1rem;
  height: 1rem;
  border-radius: 50px;
  background-repeat: no-repeat no-repeat;
  background-size: contain;
`;

const Text = styled.span`
  font-family: ${font("primary")};
  font-weight: 500;
  font-size: 0.75rem;
  text-align: center;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  color: ${ifProp("isActive", "#ffffff", "#244280")};
  @media screen and (max-width: ${prop("breakpoint")}px) {
    display: ${ifProp("responsive", "none !important")};
  }
`;

const TextTitle = styled.span`
  font-family: ${font("primary")};
  font-weight: 500;
  font-size: 0.75rem;
  text-align: center;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  @media screen and (max-width: ${prop("breakpoint")}px) {
    display: ${ifProp("responsive", "none !important")};
  }
`;

export default function SelectSeatModal({
  open,
  onSelectSeat,
  onClose,
  seatData,
}) {
  const [selected, setSelected] = React.useState(0)
  const [seatNum, setSeatNum] = React.useState(null)

  const onClick = (idx, num) => {
    setSelected(idx)
    setSeatNum(num)
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={() => onClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <Box sx={styleTitle}>
          <TextTitle>
              Pilih Meja
          </TextTitle>
        </Box> */}
        <Box sx={style}>
          <Box sx={wrapper}>
            <TextTitle>
              Pilih Meja
            </TextTitle>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', overflowY: 'auto', gap: '10px' }}>
            {seatData
        && seatData.length > 0
        && seatData.map((item, idx) => (
          <CardWrapper
            key={item.id}
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            isActive={selected === idx + 1}
            onClick={() => onClick(idx + 1, item.name)}
          >
            <Text responsive breakpoint={250} isActive={selected === idx + 1}>
              {item.name}
            </Text>
            <MenuIcon src={selected === idx + 1 ? selectedIcon : unSelectedIcon} />
          </CardWrapper>
        ))}
          </Box>
          <Box sx={wrapper}>
            <Button
              variant="outlined"
              sx={buttonStyleOutlined}
              fullWidth
              onClick={() => onSelectSeat(seatNum)}
            >
              Simpan
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

SelectSeatModal.propTypes = {
  open: PropTypes.bool,
  onSelectSeat: PropTypes.func,
  onClose: PropTypes.func,
  seatData: PropTypes.object,
};

SelectSeatModal.defaultProps = {
  open: false,
  onSelectSeat: () => { },
  onClose: () => { },
  seatData: {},
};
