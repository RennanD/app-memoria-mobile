import styled from 'styled-components/native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ContainerProps {
  borderColor: string;
}

export const Container = styled.View<ContainerProps>`
  height: 50px;
  background: #fff;
  padding: 0 10px;
  border: 1.5px solid ${props => props.borderColor};
  align-items: center;
  flex-direction: row;
  margin-bottom: 15px;
  border-radius: 20px;
`;

export const Icon = styled(MaterialCommunityIcons)`
  margin-right: 5px;
`;
