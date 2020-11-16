import { MaterialCommunityIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';

interface InputContainerProps {
  borderColor: string;
}

export const Container = styled.View``;

export const Title = styled.Text`
  font-size: 24px;
  color: #25a182;
  font-weight: 600;
  margin-top: 4px;
  text-align: center;
  margin: 15px;
`;

export const InputContainer = styled.TouchableOpacity<InputContainerProps>`
  height: 50px;
  background: #fff;
  border: 1.5px solid ${props => props.borderColor};
  padding: 0 10px;
  align-items: center;
  flex-direction: row;
  margin-bottom: 15px;
  border-radius: 20px;
`;

export const Icon = styled(MaterialCommunityIcons)`
  margin-right: 10px;
`;

export const SelectedContactContainer = styled.View`
  flex: 1;
`;

export const SelectedContactName = styled.Text`
  color: #333;
  font-size: 14px;
`;

export const PlaceholderText = styled.Text`
  color: #999;
  font-size: 14px;
`;
