import styled from 'styled-components/native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

export const Container = styled.View`
  height: 300px;
  width: 100%;
  padding: 20px;
  justify-content: space-between;
`;

export const LineCalendarPlaceholder = styled(ShimmerPlaceHolder)`
  height: 30px;
  width: 100%;
`;
