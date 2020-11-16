import styled from 'styled-components/native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

export const Container = styled.View`
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  flex-direction: row;
  align-items: center;
`;

export const AvatarPlaceholder = styled(ShimmerPlaceHolder)`
  height: 50px;
  width: 50px;
  border-radius: 25px;
`;

export const NamePlaceholder = styled(ShimmerPlaceHolder)`
  height: 25px;
  flex: 1;
  margin: 0 10px;
`;
