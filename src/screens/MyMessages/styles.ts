import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: 20,
  },
})`
  flex: 1;
  background: #fff;
  padding: 20px;
`;

export const Header = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

export const PageTitle = styled.Text`
  font-size: 24px;
  color: #65c4b0;
`;

export const SectionTitle = styled.Text`
  color: #65c4b0;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const SectionMessages = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  flex: 1;
  margin-bottom: 20px;
`;

export const MessageButtom = styled.TouchableOpacity`
  background: #fff;
  border-radius: 8px;
  height: 150px;
  width: 200px;
  border: 1px solid #ddd;
  padding: 5px;
  align-items: center;
  margin-right: 10px;
`;

export const TextMessageContent = styled.Text`
  color: #666;
  font-size: 16px;
`;

export const ImageMessageContent = styled.Image`
  height: 100%;
  width: 100%;
  border-radius: 4px;
`;

export const EmptyView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const EmptyViewText = styled.Text`
  font-size: 20px;
  color: #ddd;
  text-align: center;
`;
