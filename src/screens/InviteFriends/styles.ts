import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  height: 100%;
`;

export const Header = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

export const PageTitle = styled.Text`
  font-size: 24px;
  color: #65c4b0;
`;

export const EnviteButton = styled.TouchableOpacity`
  align-items: center;
  height: 50px;
  justify-content: center;
  border-radius: 20px;
  background: #25a182;
  margin: 0 20px;
`;

export const EnviteButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const Content = styled.View`
  flex: 1;
  margin-top: 10px;
  padding: 20px;
  height: 100%;
  border: 1px solid #ddd;
  justify-content: center;
`;

export const ContactCard = styled.TouchableOpacity`
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  flex-direction: row;
  align-items: center;
`;

export const ContatcContainer = styled.View`
  flex: 1;
`;

export const ContactAvatar = styled.Image`
  height: 200px;
  width: 200px;
  background: #eee;
  border-radius: 100px;
  align-self: center;
`;

export const ContactName = styled.Text`
  color: #65c4b0;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  margin-top: 30px;
`;
