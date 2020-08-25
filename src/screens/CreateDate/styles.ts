import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Header = styled.View`
  height: 100px;
  background: #65c4b0;
  flex-direction: row;
  align-items: center;
  padding: 0 15px;
`;

export const PageTitle = styled.Text`
  font-size: 30px;
  color: #fff;
  margin-left: 5px;
`;

export const FormContainer = styled.ScrollView.attrs({})`
  flex: 1;
  padding: 20px;
  margin-top: 20px;
`;
