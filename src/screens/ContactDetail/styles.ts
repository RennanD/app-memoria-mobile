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

export const ContactDescription = styled.Text`
  color: #999;
  font-size: 18px;
  margin-top: 4px;
  text-align: center;
`;

export const SectionTitle = styled.Text`
  color: #25a182;
  font-size: 22px;
  margin: 20px;
`;

export const PreferencesAccordionList = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 15,
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const FloatButton = styled.TouchableOpacity`
  height: 60px;
  width: 60px;
  background: #65c4b0;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  right: 20px;
  bottom: 20px;
  position: absolute;
`;
