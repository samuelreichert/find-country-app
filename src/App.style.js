import styled from 'styled-components';
import { colors } from './components/shared/constants';

const { veryLightGray } = colors;

export const AppWrapper = styled.div`
  background-color: ${veryLightGray};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
