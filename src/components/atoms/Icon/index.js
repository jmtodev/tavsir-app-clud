// https://github.com/diegohaz/arc/wiki/Example-components#icon
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { palette } from "styled-theme";
import { ifProp } from "styled-tools";

export const fontSize = ({ width, height }) => {
  const size = width || height;
  return size ? `${size / 16}rem` : "1.25em";
};

const Wrapper = styled.div`
  display: flex;
  font-size: ${fontSize};
  color: ${ifProp("palette", palette({ grayscale: 0 }, 1), "currentcolor")};
  width: 1.5rem;
  height: 1.5rem;
  box-sizing: border-box;
`;
const IconStyle = styled.img`
  max-width: 100%;
  height: 1.5rem;
  background-repeat: no-repeat no-repeat;
  background-size: contain;
`;

const Icon = ({ src, ...props }) => {
  return (
    <Wrapper {...props}>
      <IconStyle src={src} />
    </Wrapper>
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  palette: PropTypes.string,
  reverse: PropTypes.bool,
  src: PropTypes.string,
};

export default Icon;
