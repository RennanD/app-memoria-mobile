import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Header = styled.View`
  height: 150px;
  background: #65c4b0;
  padding: 20px 30px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const PageTitle = styled.Text`
  color: #fff;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const Avatar = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  margin-bottom: 20px;
`;

export const Content = styled.View`
  flex: 1px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding: 20px;
  align-items: center;
  margin-top: -70px;
  z-index: 5;
`;

export const CardItem = styled.TouchableOpacity`
  height: 140px;
  width: 140px;
  background: #fff;
  justify-content: center;
  margin: 10px;
  border-radius: 4px;
  align-items: center;
  padding: 10px;
`;

export const CardItemTitle = styled.Text`
  color: #25a182;
  font-size: 16px;
  text-align: center;
  font-weight: 600;
`;

export const Badge = styled.View`
  padding: 3px 7px;
  border-radius: 15px;
  top: -9px;
  right: -8px;
  align-items: center;
  justify-content: center;
  background: #c53030;
  position: absolute;
  border: 2px solid #fff;
`;

export const BadgeText = styled.Text`
  font-size: 12px;
  color: #fff;
`;
