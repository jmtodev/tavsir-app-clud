/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable indent */
import React from "react";
import PropTypes from "prop-types";
import InputAdornment from "@mui/material/InputAdornment";

import { Box, IconButton } from '@mui/material';
import Input from "./styled";
import IconLink from "../../molecules/IconLink";
import search from "../../../../public/search.png";

export default function InputField(props) {
  const {
    value,
    label,
    id,
    variant,
    onChange,
    error,
    errorText,
    required,
    type,
    placeholder,
    disabled,
    width,
    withEndIcon,
    onKeyDown,
    onSearchMenu,
    maxlength,
  } = props;

  const onChangeInput = (inputValue) => {
    let formattedValue = "";

    if (type === "number") {
      formattedValue = inputValue;
      onChange(formattedValue);
    } else if (type === "currency") {
      formattedValue = inputValue.replace(/[^\d.]|\.(?=.*\.)/g, "");
      if (!formattedValue.toLowerCase().includes("nan")) {
        onChange(formattedValue);
      }
    } else {
      // formattedValue = checkRegextType(inputValue);
      formattedValue = inputValue;
      onChange(formattedValue);
    }
  };

  const onChangeFunction = (e) => {
    onChangeInput(e.currentTarget.value);
  };

  return (
    <Input
      data-testid={`${id}-inputNormal`}
      id={id}
      value={value || ""}
      label={label}
      variant={variant}
      onChange={onChangeFunction}
      error={error}
      helperText={errorText}
      required={required}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      width={width}
      InputProps={
        withEndIcon
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  {/* <IconLink to="/" icon={search} /> */}

                  <IconButton onClick={() => onSearchMenu()}>
                    <Box
                      component="img"
                      sx={{ height: '1rem' }}
                      alt="search"
                      src={search}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }
          : null
      }
      inputProps={maxlength ? { maxLength: 25 } : { maxLength: 100 }}
      onKeyDown={(e) => onKeyDown(e)}
    />
  );
}

InputField.propTypes = {
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  variant: PropTypes.oneOf(["standard", "filled", "outlined"]),
  onChange: PropTypes.func,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  width: PropTypes.string,
  withEndIcon: PropTypes.bool,
  onKeyDown: PropTypes.func,
  onSearchMenu: PropTypes.func,
  maxlength: PropTypes.bool,
};

InputField.defaultProps = {
  id: "",
  value: "",
  label: "",
  variant: "outlined",
  onChange: () => undefined,
  error: false,
  errorText: "",
  required: false,
  type: "text",
  placeholder: "",
  disabled: false,
  width: "100% !important",
  withEndIcon: false,
  onKeyDown: () => undefined,
  onSearchMenu: () => undefined,
  maxlength: false,
};
