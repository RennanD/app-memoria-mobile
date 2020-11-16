import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 20px;
  background: #fff;
  height: 70%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

export const Content = styled.View`
  flex: 1;
`;

export const Image = styled.Image`
  flex: 1;
  margin-bottom: 40px;
  border-radius: 4px;
`;

export const ConfirmButton = styled.TouchableOpacity`
  height: 50px;
  align-self: stretch;
  align-items: center;
  justify-content: center;
  background: #25a182;
  border-radius: 20px;
  margin-bottom: 7px;
`;

export const CancelButton = styled.TouchableOpacity`
  height: 50px;
  align-self: stretch;
  align-items: center;
  justify-content: center;
  background: #c53030;
  border-radius: 20px;
  margin-bottom: 7px;
`;

export const ButtonText = styled.Text`
  color: #fff;
`;
