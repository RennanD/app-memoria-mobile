import React from 'react';
import { FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';

import {
  Container,
  Header,
  PageTitle,
  NotificationContainer,
  NotificationContent,
  NotificationTitle,
  NotificationDescription,
} from './styles';

import { useNotification } from '../../hooks';

import { Notfications } from '../../assets';

const Notifications: React.FC = () => {
  const { notifications, readNotification } = useNotification();
  return (
    <Container>
      <Header>
        <Notfications width="60" height="60" />
        <PageTitle>Minhas notificações</PageTitle>
      </Header>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={notifications}
        keyExtractor={notification => notification._id}
        renderItem={({ item: notification }) => (
          <NotificationContainer
            onPress={() => readNotification(notification._id)}
            isReaded={notification.ready}
          >
            <Feather name="bell" size={28} color="#65C4B0" />
            <NotificationContent>
              <NotificationTitle>
                {notification.notification_message}
              </NotificationTitle>
              <NotificationDescription>
                Entre na sessão de mensagens e celebre esta data especial
              </NotificationDescription>
            </NotificationContent>
          </NotificationContainer>
        )}
      />
    </Container>
  );
};

export default Notifications;
