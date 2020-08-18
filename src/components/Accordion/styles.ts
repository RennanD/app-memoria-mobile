import styled, { css } from 'styled-components/native';

export const Container = styled.View``;

interface PreferencesItemProps {
  selected: boolean;
}

export const PreferencesButton = styled.TouchableOpacity`
  height: 55px;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  flex-direction: row;
  background: #65c4b0;
  border-radius: 20px;
  margin-bottom: 15px;
`;

export const PreferencesButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
`;

export const PreferencesItem = styled.TouchableOpacity<PreferencesItemProps>`
  height: 46px;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  flex-direction: row;
  border-radius: 20px;
  margin-bottom: 5px;
  border: 1px solid #ddd;

  ${props =>
    props.selected &&
    css`
      border-color: #65c4b0;
    `}
`;

export const PreferencesItemText = styled.Text<PreferencesItemProps>`
  font-size: 16px;
  color: #333;

  ${props =>
    props.selected &&
    css`
      color: #65c4b0;
    `}
`;
