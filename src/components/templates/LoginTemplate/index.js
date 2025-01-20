// https://github.com/diegohaz/arc/wiki/Atomic-Design#templates
import React from "react";
import PropTypes from "prop-types";

import { Wrapper, Logo, Content } from "./styled";

const LoginTemplate = ({ children, ...props }) => {
  return (
    <Wrapper {...props}>
      <Logo />
      <Content>{children}</Content>
    </Wrapper>
  );
};

LoginTemplate.propTypes = {
  children: PropTypes.any.isRequired,
};

export default LoginTemplate;
