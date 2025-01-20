import FloatingLabelInput from "@material-ui/core/TextField";
import styled from "styled-components";

const InputStyle = () => ({
  background: "#FCFCFD !important",
  /* grey 90 */
  width: "100% !important",
  height: "100% !important",
  marginTop: "15px !important",

  "& .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #CFD0D7 !important",
    borderRadius: "50px !important",
  },

  "& .MuiInputBase-input.MuiOutlinedInput-input": {
    padding: "18.5px 18px",
  },

  "& [class*=MuiFormLabel-root-MuiInputLabel-root]": {
    fontSize: "14px",
  },

  "& [class*=MuiInputBase-input-MuiOutlinedInput-input]": {
    padding: "8.5px 14px",
  },

  "& .MuiFormLabel-root.MuiInputLabel-root.MuiInputLabel-formControl.MuiInputLabel-shrink":
    {
      color: "rgba(0,0,0,0.4)",
    },
});

const Input = styled(FloatingLabelInput)(InputStyle);

export default Input;
