import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background: #fff;
`;

export const Header = styled.View`
  height: 180px;
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

export const ContactDeatilsContainer = styled.View`
  margin: 0 20px;
  padding-bottom: 20px;
  border-bottom-color: #ddd;
  border-bottom-width: 1px;
  align-items: center;
  flex: 1;
  justify-content: center;
`;

export const ContactAvatar = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 50px;
`;

export const ContactInfoContainer = styled.View`
  flex: 1;
`;

export const ContactName = styled.Text`
  color: #65c4b0;
  font-weight: bold;
  font-size: 22px;
  text-align: center;
`;

export const EnviteTitle = styled.Text`
  color: #999;
  font-size: 18px;
  margin-top: 4px;
  text-align: center;
`;

export const ButtonsContainer = styled.View`
  width: 100%;
  justify-content: space-between;
  margin-top: 20px;
  flex-direction: row;
  padding: 0 20px;
`;

export const ButtonsText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export const ConfirmButton = styled.TouchableOpacity`
  height: 50px;
  border-radius: 5px;
  width: 48%;
  background: #65c4b0;
  border: 0;
  align-items: center;
  justify-content: center;
`;

export const CancelButton = styled.TouchableOpacity`
  height: 50px;
  border-radius: 5px;
  width: 48%;
  background: #c53030;
  border: 0;
  align-items: center;
  justify-content: center;
`;
