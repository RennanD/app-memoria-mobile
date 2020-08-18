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

export const PreferencesContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 15,
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const SubmitButton = styled.TouchableOpacity`
  position: absolute;
  height: 50px;

  align-items: center;
  justify-content: center;
  right: 30px;
  left: 20px;
  bottom: 20px;
  border-radius: 20px;
  background: #25a182;
`;

export const SubmitButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;
