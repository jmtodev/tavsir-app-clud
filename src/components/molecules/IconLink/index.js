import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Icon, Link } from "components";

const Text = styled.span`
  @media screen and (max-width: 420px) {
    display: ${({ responsive }) => responsive && "none"};
  }
`;

const IconLink = ({ icon, right, responsive, children, ...props }) => {
  return (
    <Link {...props}>
      <Icon src={icon} />
      <Text responsive={responsive}>{children}</Text>
    </Link>
  );
};

IconLink.propTypes = {
  icon: PropTypes.any,
  palette: PropTypes.string,
  reverse: PropTypes.bool,
  responsive: PropTypes.bool,
  right: PropTypes.bool,
  children: PropTypes.node,
};

export default IconLink;
