import { Platform } from 'react-native';
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
  padding-top: ${Platform.OS === 'ios' ? '40px' : '0'};
`;

export const PageTitle = styled.Text`
  font-size: 30px;
  color: #fff;
  margin-left: 5px;
`;

export const ListDatesView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const ListDatesViewHeader = styled.View`
  padding: 15px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

export const ListDatesViewHeaderText = styled.Text`
  font-size: 24px;
  color: #333;
`;

export const ListDatesText = styled.Text`
  font-size: 20px;
`;
export const ListDatesItem = styled.View`
  flex-direction: row;
`;

export const ListDatesDay = styled.View`
  border-right-width: 1px;
  border-right-color: #ccc;
  width: 100px;
  padding: 20px;
  align-items: flex-end;
`;

export const ListDatesMonth = styled.View`
  flex: 1;
  padding: 20px;
`;

export const EnventLabel = styled.TouchableOpacity`
  padding: 15px;
  border-radius: 4px;
  background: #25a182;
  margin-bottom: 5px;
`;

export const EventLabelText = styled.Text`
  color: #fff;
  font-size: 14px;
`;

export const EmptyView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const EmptyViewText = styled.Text`
  font-size: 24px;
  color: #ddd;
  text-align: center;
`;

export const FloatButton = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  background: #65c4b0;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  right: 20px;
  bottom: 20px;
  position: absolute;
`;
