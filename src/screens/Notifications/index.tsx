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
import EmptyView from '../../components/EmptyView';

const Notifications: React.FC = () => {
  const { notifications, readNotification } = useNotification();
  if (!notifications.length) {
    return (
      <Container>
        <Header>
          <Notfications width="60" height="60" />
          <PageTitle>Minhas notificações</PageTitle>
        </Header>
        <EmptyView icon="bell" text="Voçê ainda não possui notificações" />
      </Container>
    );
  }

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
            isReaded={notification.read}
          >
            <Feather name="bell" size={28} color="#65C4B0" />
            <NotificationContent>
              <NotificationTitle>{notification.description}</NotificationTitle>
              <NotificationDescription>
                Veja mais detalhes
              </NotificationDescription>
            </NotificationContent>
          </NotificationContainer>
        )}
      />
    </Container>
  );
};

export default Notifications;
