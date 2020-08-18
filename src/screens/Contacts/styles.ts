import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Header = styled.View`
  height: 200px;
  align-items: center;
  justify-content: center;
`;

export const PageTitle = styled.Text`
  font-size: 24px;
  color: #25a182;
  font-weight: 600;
  margin-top: 4px;
  text-align: center;
`;

export const ContactCard = styled.TouchableOpacity`
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  flex-direction: row;
  align-items: center;
`;

export const ContactAvatar = styled.Image`
  height: 50px;
  width: 50px;
  background: #eee;
  border-radius: 25px;
`;

export const ContactName = styled.Text`
  color: #333;
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
  flex: 1;
`;
