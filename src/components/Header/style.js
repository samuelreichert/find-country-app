import styled from 'styled-components';
import { colors } from '../shared/constants';

const { white, ligthModeBlue } = colors;

export const Header = styled.div`
  background-color: ${white};
  box-shadow: 0px 0px 8px 0px rgba(133,133,133,0.2);
  display: flex;
  justify-content: center;
  width: 100%;
`

export const HeaderContent = styled.div`
  align-items: center;
  color: ${ligthModeBlue};
  display: flex;
  justify-content: space-between;
  max-width: 1440px;
  padding: 34px 16px;
  width: 100%;

  @media(min-width: 1440px) {
    padding: 20px 0;
  }
`;

export const Title = styled.h3`
  font-size: 15px;

  @media(min-width: 1440px) {
    font-size: inherit;
  }
`;

export const ToggleMode = styled.div`
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;

  @media(min-width: 1440px) {
    font-size: 14px;
  }

  i {
    margin-right: 10px;
  }
`;
