import styled, { css } from 'styled-components/native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { TextInputMask } from 'react-native-masked-text';

interface ContainerProps {
  error: boolean;
  isFocused: boolean;
  borderColor: string;
}

export const Container = styled.View<ContainerProps>`
  height: 50px;
  background: #fff;
  padding: 0 10px;
  align-items: center;
  flex-direction: row;
  margin-bottom: 15px;
  border-radius: 20px;
  border: 1.5px solid ${props => props.borderColor};
  ${props => props.isFocused
    && css`
      border-color: #25a182;
    `};
`;

export const Icon = styled(MaterialCommunityIcons)`
  margin-right: 10px;
`;

export const Input = styled(TextInputMask)`
  flex: 1;
`;
