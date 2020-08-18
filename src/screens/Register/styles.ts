import styled from 'styled-components/native';

import TextInput from '../../components/TextInput';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 20,
    justifyContent: 'center',
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  background: #65c4b0;
`;

export const ProfileImage = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 50px;
  align-self: center;
  margin: 10px 0;
`;

export const Input = styled(TextInput)``;

export const LinkTextContainer = styled.View`
  width: 100%;
  align-items: center;
  padding: 15px;
  margin-top: 5px;
  flex-direction: row;
  justify-content: center;
`;

export const HelpText = styled.Text`
  font-size: 16px;
  color: #fff;
`;

export const LinkButton = styled.TouchableOpacity`
  margin-left: 5px;
`;

export const LinkButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
  border-bottom-width: 1px;
  border-style: solid;
  border-bottom-color: #fff;
`;
