import styled from 'styled-components';
import { colors } from '../shared/constants';

const { white, ligthModeBlue } = colors;

export const Content = styled.div`
  color: ${ligthModeBlue};
  padding: 18px 18px 30px;
`;

export const Flag = styled.div`
  background-image: url(${props => props.flag});
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  height: 196px;
  width: 100%;
`;

export const Link = styled.a`
  background-color: ${white};
  border-radius: 6px;
  box-shadow: 0px 0px 8px 0px rgba(133,133,133,0.2);
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

export const Text = styled.p`
  font-size: 12px;
  font-weight: 300;
  margin-bottom: 4px;
  b {
    font-weight: 600;
  }
`;

export const Title = styled.p`
  font-size: 14px;
  font-weight: 800;
  margin-bottom: 12px;
`;

export const Wrapper = styled.div`
  display: grid;
  grid-gap: 64px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;

  max-width: 1440px;
  padding: 40px 0;
  width: 100%;
`;
