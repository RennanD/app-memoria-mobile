import React, { useCallback, useEffect, useRef, useState } from 'react';
import Modal from 'react-native-modal';
import { Alert, Platform, Vibration } from 'react-native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Constants from 'expo-constants';
// import * as Notifications from 'expo-notifications';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

import { subDays, format } from 'date-fns';
import {
  Container,
  Title,
  ConfirmButton,
  CancelButton,
  ButtonText,
  Content,
} from './styles';

import Input from '../TextInput';
import PickerInput from '../PickerInput';

import api from '../../services/api';

interface SubscriptionPush {
  remove: () => void;
}

interface ReminderModalProps {
  dateReminder: Date;
  isVisible: boolean;
  important_date_id: string;
  title: string;
  toggleModal(): void;
}

interface ReminderProps {
  hour: string;
  sub_days_date: string;
  notification_message: string;
}

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

const ReminderModal: React.FC<ReminderModalProps> = ({
  dateReminder,
  isVisible,
  toggleModal,
  important_date_id,
  title,
}) => {
  const formRef = useRef<FormHandles>(null);
  // const notificationListener = useRef<SubscriptionPush>();
  // const responseListener = useRef<SubscriptionPush>();

  const [myToken, setMyToken] = useState('');
  const [myStatus, setMyStatus] = useState<any>('');
  const [myResponse, setMyResponse] = useState<any>(null);

  const registerToken = useCallback(async () => {
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
        Alert.alert('Erorr', 'Failed to get push token for push notification!');
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS,
        );
        finalStatus = status;
        return;
      }
      const token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      setMyToken(token);
    } else {
      Alert.alert('Eror', 'Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  }, []);

  const handleNotification = useCallback(notification => {
    Vibration.vibrate(3);
    console.log(notification);
  }, []);

  useEffect(() => {
    registerToken();
    Notifications.addListener(handleNotification);
  }, [registerToken, handleNotification]);

  // useEffect(() => {
  //   // socket.on('notification', async (notification: Notification) => {
  //   //   await emitiNotification({
  //   //     ...notification,
  //   //     ready: false,
  //   //   });
  //   // });
  //   async function loadToken() {
  //     const token = (await Notifications.getExpoPushTokenAsync()).data;

  //     const response = await api.get(`/notifications/token/${token}`);

  //     const { hasToken } = response.data;

  //     console.log(hasToken);

  //     if (!hasToken) {
  //       await api.post('/notifications/token', {
  //         token,
  //       });
  //     }
  //   }

  //   loadToken();
  // }, []);

  const handleSubmit = useCallback(
    async (data: ReminderProps) => {
      const userDateDay = new Date(dateReminder).getDate();
      const subDaysReminder = subDays(
        new Date(dateReminder),
        Number(data.sub_days_date),
      );

      const stringDate = format(subDaysReminder, "MM'-'dd");
      const getMonth = subDaysReminder.getMonth() + 1;
      const getDay = subDaysReminder.getDate();

      try {
        await api.post('/reminders', {
          important_date_id,
          notification_message: data.notification_message,
          title,
          reminderDate: subDaysReminder,
          parsed_date: stringDate,
          date: `${data.hour} ${getDay}-${userDateDay} ${getMonth} *`,
        });

        Alert.alert('Sucesso', 'Lembrete Adicionado com sucesso');
        toggleModal();
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível adicionar o lembrete');
      }
    },
    [dateReminder, important_date_id, title, toggleModal],
  );

  return (
    <Modal
      useNativeDriver
      style={{ margin: 0, justifyContent: 'flex-end' }}
      isVisible={isVisible}
    >
      <Container>
        <Title>Adicionar lembrete</Title>
        <Title>{`meu token: ${myToken}, meu status: ${myStatus}`}</Title>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="notification_message"
              icon="card-text-outline"
              placeholder="Descrição"
              borderColor="#ddd"
            />

            <PickerInput
              icon="calendar"
              borderColor="#ddd"
              placeholder="Antecedência do lembrete"
              name="sub_days_date"
              items={[
                {
                  label: '3 dias',
                  value: '3',
                },
                {
                  label: '5 dias',
                  value: '5',
                },
                {
                  label: 'Uma semana',
                  value: '7',
                },
              ]}
            />

            <PickerInput
              icon="clock"
              placeholder="Horário do lembrete"
              borderColor="#ddd"
              name="hour"
              items={[
                { label: '8hrs', value: '0 8' },
                { label: '9hrs', value: '0 9' },
                { label: '10hrs', value: '0 10' },
                { label: '11hrs', value: '0 11' },
                { label: '14hrs', value: '0 14' },
                { label: '15hrs', value: '0 15' },
                { label: '16hrs', value: '0 16' },
                { label: '17hrs', value: '0 17' },
                { label: '18hrs', value: '0 18' },
                { label: '19hrs', value: '0 19' },
                { label: '20hrs', value: '0 20' },
              ]}
            />

            <ConfirmButton onPress={() => formRef.current?.submitForm()}>
              <ButtonText>Confirmar</ButtonText>
            </ConfirmButton>
            <CancelButton onPress={toggleModal}>
              <ButtonText>Cancelar</ButtonText>
            </CancelButton>
          </Form>
        </Content>
      </Container>
    </Modal>
  );
};

export default ReminderModal;
