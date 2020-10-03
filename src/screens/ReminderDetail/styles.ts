import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  background: #fff;
`;

export const ListDatesView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  padding: 0 20px;
`;

export const ListDatesTitle = styled.Text`
  color: #25a182;
  font-size: 22px;
  margin: 20px;
`;

export const ReminderContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  border-radius: 4px;
  background: #fff;
  border: 1px solid #eee;
  margin-bottom: 10px;
`;

export const EnventLabel = styled.View`
  flex: 1;
`;

export const EventLabelText = styled.Text`
  color: #333;
  font-weight: bold;
  font-size: 18px;
`;

export const EventLabelDate = styled.Text`
  color: #666;
  font-size: 16px;
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

export const ContactView = styled.View`
  flex-direction: row;
  padding: 0 20px;
  align-items: center;
`;

export const Avatar = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 25px;
`;

export const ContactName = styled.Text`
  font-size: 20px;
  color: #65c4b0;
  font-weight: bold;
`;

export const DateDescription = styled.Text`
  color: #999;
  font-size: 14px;
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
