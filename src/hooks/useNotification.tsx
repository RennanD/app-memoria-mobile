/* eslint-disable @typescript-eslint/ban-types */
import React, { createContext, useCallback, useState, useContext } from 'react';

import { Alert, Platform } from 'react-native';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

// import AsyncStorage from '@react-native-community/async-storage';

// import { useVerification } from '.';

import api from '../services/api';

interface Notification {
  id: string;
  read: boolean;
  important_date_id: string;
  notification_message: string;
  title: string;
}
interface NotificationsContextData {
  notifications: Notification[];
  unreadNotifications: number;
  notificationsLoading: boolean;
  getNotifications(): Promise<void>;
  getPushToken(): Promise<void>;
}

const NotificationsContext = createContext<NotificationsContextData>(
  {} as NotificationsContextData,
);

export const NotificationProvider: React.FC = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [notificationsLoading, setNotificationsloading] = useState(false);

  const getNotifications = useCallback(async () => {
    setNotificationsloading(true);
    const response = await api.get('/notifications');

    const findUnreadNotifications: Notification[] = response.data.filter(
      (notification: Notification) => notification.read === false,
    );

    setUnreadNotifications(findUnreadNotifications.length);

    setNotifications(response.data);
  }, []);

  const getPushToken = useCallback(async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS,
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS,
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        Alert.alert(
          'Erro',
          'Você precisa aceitar as permissões de notificação.',
        );
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS,
        );
        finalStatus = status;
        return;
      }

      const { data } = await Notifications.getExpoPushTokenAsync();

      const response = await api.get(`/notifications/token/${data}`);

      const { hasToken } = response.data;

      if (!hasToken) {
        await api.post('/notifications/token', {
          token: data,
        });
      }
    } else {
      Alert.alert('Erro', 'Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  }, []);

  return (
    <NotificationsContext.Provider
      value={{
        getNotifications,
        getPushToken,
        notifications,
        notificationsLoading,
        unreadNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export function useNotification(): NotificationsContextData {
  const context = useContext(NotificationsContext);

  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider',
    );
  }

  return context;
}
