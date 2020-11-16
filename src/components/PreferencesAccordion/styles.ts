import styled from 'styled-components/native';

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
  border: 1px solid #65c4b0;
  border-radius: 20px;
  margin-bottom: 15px;
`;

export const PreferencesButtonText = styled.Text`
  font-size: 18px;
  color: #65c4b0;
`;

export const PreferencesItemList = styled.View.attrs({
  numColumns: 4,
})`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const PreferencesItem = styled.View`
  padding: 5px 10px;
  border-radius: 5px;
  flex-direction: row;
  margin-bottom: 10px;
  margin-right: 10px;
  width: 30%;
  align-items: center;
  background: #fff;
  flex-shrink: 0;
`;

export const PreferencesItemText = styled.Text`
  color: #333;
  font-size: 16px;
  flex: 1;
`;
