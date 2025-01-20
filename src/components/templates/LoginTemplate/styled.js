import styled from "styled-components";
import { size } from "styled-theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 3.75rem;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 6rem;
  @media screen and (max-width: 640px) {
    padding: 3.25rem;
  }
`;

export const Logo = styled.div`
  height: 100px;
  width: 100%;
  background-image: url("./getpay_logo.png");
  background-repeat: no-repeat, no-repeat;
  background-position: center, center;
`;

export const Content = styled.section`
  width: 100%;
  box-sizing: border-box;
  margin: 2rem auto;
  max-width: ${size("maxWidth")};
`;
