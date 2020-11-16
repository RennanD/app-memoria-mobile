/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { FlatList } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { useAuth, useNotification } from '../../hooks';

import {
  Container,
  Content,
  CardItem,
  Header,
  CardItemTitle,
  Avatar,
  PageTitle,
  Badge,
  BadgeText,
  SubtitleCard,
} from './styles';
import boxShadowEffect from '../../styles/boxShadow';

import menuItems from '../../json/menuItems';

interface Notification {
  _id: string;
  date: string;
  parsed_date: string;
  notification_message: string;
}

interface RouteProps {
  name: string;
  key: string;
  params?: {
    contact_id?: string;
  };
}

interface SubscriptionPush {
  remove: () => void;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Menu: React.FC = () => {
  const { navigate } = useNavigation();
  const { account } = useAuth();
  const { unreadNotifications, getPushToken } = useNotification();

  const { params } = useRoute<RouteProps>();

  const notificationListener = useRef<SubscriptionPush>();
  const responseListener = useRef<SubscriptionPush>();

  useEffect(() => {
    getPushToken();
    notificationListener.current = Notifications.addNotificationReceivedListener(
      notification => {
        // Alert.alert(JSON.stringify(notification));
        console.log(notification);

        navigate('Notification');
      },
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      response => {
        // Alert.alert('Notificação', JSON.stringify(response));
        console.log(response);
      },
    );
  }, [navigate]);

  useEffect(() => {
    if (params) {
      navigate('AcceptInvites', { contact_id: params.contact_id });
    }
  }, [navigate, params, params?.contact_id]);

  const handleNavigate = useCallback(
    route => {
      if (!route) {
        return;
      }
      navigate(route);
    },
    [navigate],
  );

  return (
    <Container>
      <Header>
        <PageTitle>
          Bem vindo,
          {'\n'}
          {account.user.name}
        </PageTitle>
        <Avatar
          source={{
            uri:
              account.user.avatar
                ? account.user.avatar
                : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
          }}
        />
      </Header>

      <Content>
        <FlatList
          data={menuItems}
          keyExtractor={item => item.title}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({ item }) => (
            <CardItem
              onPress={() => handleNavigate(item.route)}
              style={boxShadowEffect}
            >
              {item.title === 'Notificações'
                && unreadNotifications > 0
                && (
                <Badge>
                  <BadgeText>{unreadNotifications}</BadgeText>
                </Badge>
                )}
              {item.icon}
              <CardItemTitle>{item.title}</CardItemTitle>
              {item.subtitle && <SubtitleCard>{item.subtitle}</SubtitleCard>}
            </CardItem>
          )}
        />

      </Content>
    </Container>
  );
};

export default Menu;
