import styled from 'styled-components/native';

import TextInput from '../../components/TextInput';

export const Container = styled.View`
  flex: 1;
  background: #65c4b0;
  justify-content: center;
  padding: 20px;
`;

export const LogoImage = styled.Image`
  height: 120px;
  width: 120px;
  align-self: center;
  margin-bottom: 30px;
`;

export const FormContainer = styled.View``;

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
