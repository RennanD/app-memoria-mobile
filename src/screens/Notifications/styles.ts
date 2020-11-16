import styled from 'styled-components/native';

interface NotificationContainerProps {
  isReaded: boolean;
}

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
  text-align: center;
`;

export const NotificationContainer = styled.TouchableOpacity<
  NotificationContainerProps
>`
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  flex-direction: row;
  align-items: center;
  background: ${props => (props.isReaded ? '#fff' : 'rgba(101, 196, 176, .1)')};
`;

export const NotificationContent = styled.View`
  flex: 1;
  margin-left: 10px;
`;

export const NotificationTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

export const NotificationDescription = styled.Text`
  font-size: 14px;
  color: #999;
  margin-top: 5px;
`;
