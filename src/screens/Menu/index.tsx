/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import React, { useCallback, useMemo, useEffect } from 'react';
import { FlatList } from 'react-native';
import socketio from 'socket.io-client';
import { useNavigation } from '@react-navigation/native';

import { useAuth, useNotification } from '../../hooks';

import {
  Container,
  Content,
  CardItem,
  Header,
  CardItemTitle,
  Avatar,
  Badge,
  BadgeText,
  PageTitle,
} from './styles';
import boxShadowEffect from '../../styles/boxShadow';

import menuItems from '../../json/menuItems';

interface Notification {
  _id: string;
  date: string;
  parsed_date: string;
  notification_message: string;
}

const Menu: React.FC = () => {
  const { navigate } = useNavigation();
  const { account } = useAuth();
  const { emitiNotification, numberOfNotifications } = useNotification();

  const socket = useMemo(() => socketio('http://192.168.25.9:3333', {
    query: {
      user_id: account.user.id,
    },
  }), [account.user.id]);

  useEffect(() => {
    socket.on('notification', async (notification: Notification) => {
      await emitiNotification({
        ...notification,
        ready: false,
      });
    });
  }, [emitiNotification, socket]);

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
                && numberOfNotifications > 0
                && (
                <Badge>
                  <BadgeText>{numberOfNotifications}</BadgeText>
                </Badge>
                )}
              {item.icon}
              <CardItemTitle>{item.title}</CardItemTitle>
            </CardItem>
          )}
        />

      </Content>
    </Container>
  );
};

export default Menu;
