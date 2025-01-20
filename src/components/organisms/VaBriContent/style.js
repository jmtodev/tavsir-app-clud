import styled from 'styled-components';
import { font } from 'styled-theme';

export const labelDiv = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`

export const tagihanWrapper = styled.div`
  border: 0px none;
  height: 105px;
  width: 295px;
`

export const tagihan = styled.p`
  color: #000000;
  font-family: ${font("primary")};
  font-size: 10px;
  font-weight: 400;
  left: 0;
  letter-spacing: 0;
  line-height: 15px;
  position: fixed;
  top: 0;
  width: 295px;
`

export const textWrapper = styled.span`
  color: #000000;
  font-family: ${font("primary")};
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 15px;
`

export const spanStyled = styled.span`
  font-family: ${font("primary")};
  font-weight: 600;
`
