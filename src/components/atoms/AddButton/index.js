/*
We're constantly improving the code you see.
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import PropTypes from "prop-types";
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';

import addIcon from "../../../../public/add.png"


export const Add = ({ disabled }) => {
  return (
    <>
      {disabled ? (<AddBoxRoundedIcon />) : (
        <img
          className="add"
          alt="Add"
          src={addIcon}
          style={{
            backgroundColor: "#49454F",
            borderRadius: '5px',
            height: '24px',
            width: '24px' }}
        />
      )}
    </>
  );
};

Add.propTypes = {
  disabled: PropTypes.bool,
};

Add.defaultProps = {
  disabled: false,
};
