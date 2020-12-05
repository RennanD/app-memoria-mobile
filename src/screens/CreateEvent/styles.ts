import { Platform } from 'react-native';
import styled from 'styled-components/native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

interface OptionButtonProps {
  selected: boolean;
}

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  background: #fff;
  padding-top: ${Platform.OS === 'ios' ? 40 : 0}px;
`;

export const OptionsTitle = styled.Text`
  color: #25a182;
  font-size: 22px;
  margin: 20px;
`;

export const OptionsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 10px;
`;

export const OptionButton = styled.TouchableOpacity<OptionButtonProps>`
  height: 100px;
  width: 31%;
  padding: 10px;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 4px;
  border: ${props => (props.selected ? '1px solid #25a182' : '1px solid #fff')};
`;

export const OptionText = styled.Text`
  text-align: center;
  font-size: 14px;
  color: #65c4b0;
`;

export const TextInputContainer = styled.View`
  height: 50px;
  background: #fff;
  padding: 0 10px;
  align-items: center;
  flex-direction: row;
  margin: 20px 10px 0;
  border-radius: 20px;
  border: 1.5px solid #25a182;
`;

export const Icon = styled(MaterialCommunityIcons)`
  margin-right: 10px;
`;

export const Input = styled.TextInput`
  flex: 1;
`;

export const SeugestionCard = styled.TouchableOpacity`
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  flex-direction: row;
  align-items: center;
`;

export const SugestionName = styled.Text`
  color: #666;
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
  flex: 1;
`;
