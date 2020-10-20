/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect } from 'react';
import { FlatList } from 'react-native';
// import socketio from 'socket.io-client';
import { useNavigation, useRoute } from '@react-navigation/native';

// import * as Notifications from 'expo-notifications';
// import AsyncStorage from '@react-native-community/async-storage';
import { useAuth } from '../../hooks';

import {
  Container,
  Content,
  CardItem,
  Header,
  CardItemTitle,
  Avatar,
  // Badge,
  // BadgeText,
  PageTitle,
} from './styles';
import boxShadowEffect from '../../styles/boxShadow';

import menuItems from '../../json/menuItems';
// import api from '../../services/api';

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

const Menu: React.FC = () => {
  const { navigate } = useNavigation();
  const { account } = useAuth();
  // const { numberOfNotifications } = useNotification();
  const { params } = useRoute<RouteProps>();

  // const socket = useMemo(() => socketio('https://app-memoria.tk', {
  //   query: {
  //     user_id: account.user.id,
  //   },
  // }), [account.user.id]);

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
              {/* {item.title === 'Notificações'
                && numberOfNotifications > 0
                && (
                <Badge>
                  <BadgeText>{numberOfNotifications}</BadgeText>
                </Badge>
                )} */}
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
