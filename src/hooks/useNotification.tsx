import React, {
  useState,
  useCallback,
  useEffect,
  createContext,
  useMemo,
  useRef,
  useContext,
} from 'react';
import fetch from 'node-fetch';

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface Notification {
  _id: string;
  ready: boolean;
  date: string;
  parsed_date: string;
  notification_message: string;
}

interface NotificationContextData {
  notifications: Notification[];
  numberOfNotifications: number;
  readNotification(notification_id: string): Promise<void>;
  emitiNotification(notification: Notification): Promise<void>;
}

const NotificationContext = createContext<NotificationContextData>(
  {} as NotificationContextData,
);

export const NotificationProvider: React.FC = ({ children }) => {
  const notificationListener = useRef<any>(null);
  const responseListener = useRef<any>(null);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [expoPushToken, setExpoPushToken] = useState('');

  const numberOfNotifications = useMemo(() => {
    const unreadNotifications = notifications.filter(
      notification => !notification.ready,
    );
    return unreadNotifications.length;
  }, [notifications]);

  useEffect(() => {
    async function registerTokenNotification(): Promise<string | undefined> {
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
          Alert.alert('Failed to get push token for push notification!');
          return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;

        const notificationsToken = await AsyncStorage.getItem(
          '@AppMemoria:token',
        );

        console.log(notificationsToken, token);

        if (!notificationsToken) {
          await api.post('/notifications/token', {
            token,
          });
          await AsyncStorage.setItem('@AppMemoria:token', token);
          setExpoPushToken(token);
        }
      } else {
        Alert.alert('Must use physical device for Push Notifications');
      }
    }

    registerTokenNotification();

    notificationListener.current = Notifications.addNotificationReceivedListener(
      notification => {
        console.log(notification);
      },
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      response => {
        console.log(response);
      },
    );
  });

  useEffect(() => {
    async function loadNotifications() {
      const storagedNotifications = await AsyncStorage.getItem(
        '@AppMemoria:notifications',
      );

      if (storagedNotifications) {
        setNotifications(JSON.parse(storagedNotifications));
      }
    }
    loadNotifications();
  }, []);

  const emitiNotification = useCallback(
    async (notification: Notification) => {
      const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Lembrete',
        body: notification.notification_message,
        data: { data: 'goes here' },
      };

      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      const data = [...notifications, notification].sort(
        (smaller, bigger) => Number(bigger.date) - Number(smaller.date),
      );

      setNotifications(data);

      await AsyncStorage.setItem(
        '@AppMemoria:notifications',
        JSON.stringify(data),
      );
    },
    [expoPushToken],
  );

  const readNotification = useCallback(
    async (notification_id: string) => {
      const filteredNotifications = notifications.map(notification => {
        if (notification._id === notification_id) {
          return {
            ...notification,
            ready: true,
          };
        }
        return notification;
      });

      setNotifications(filteredNotifications);

      await AsyncStorage.setItem(
        '@AppMemoria:notifications',
        JSON.stringify(filteredNotifications),
      );
    },
    [notifications],
  );

  return (
    <NotificationContext.Provider
      value={{
        emitiNotification,
        notifications,
        numberOfNotifications,
        readNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export function useNotification(): NotificationContextData {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider',
    );
  }

  return context;
}
