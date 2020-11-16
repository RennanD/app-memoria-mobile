import styled from 'styled-components/native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ContainerProps {
  borderColor: string;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  height: 50px;
  background: #fff;
  border: 1.5px solid ${props => props.borderColor};
  padding: 0 10px;
  align-items: center;
  flex-direction: row;
  margin-bottom: 15px;
  border-radius: 20px;
`;

export const PlaceholderText = styled.Text`
  color: #ddd;
  font-size: 14px;
`;

export const DatePickerText = styled.Text`
  flex: 1;
`;

export const Icon = styled(MaterialCommunityIcons)`
  margin-right: 10px;
`;
