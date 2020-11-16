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
`;

export const PreferencesAccordionList = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 15,
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;
