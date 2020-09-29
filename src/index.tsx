import React, { useEffect } from 'react';
import { StatusBar, Text } from 'react-native';
import * as Linking from 'expo-linking';

import { NavigationContainer } from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';
import Routes from './routes/index.routes';

import { AppProvider } from './hooks';

const prefix = Linking.makeUrl('/');

const Index: React.FC = () => {
  const linking = {
    prefixes: [
      'http://192.168.1.156:3000/teste',
      'https://expo.io/--/to-exp/exp%3A%2F%2Fxx-i8s.anonymous.mobile.exp.direct%3A80',
    ],
    config: {
      screens: {
        AcceptEnvites: {
          path: 'AcceptEnvites',
        },
      },
    },
  };

  useEffect(() => {
    async function setMyUrl() {
      await AsyncStorage.setItem('@AppMemoria:link', prefix);
    }

    setMyUrl();
  }, []);

  return (
    <NavigationContainer
      linking={linking}
      fallback={<Text>Carregando...</Text>}
    >
      <StatusBar barStyle="light-content" backgroundColor="#65C4B0" />
      <AppProvider>
        <Routes />
      </AppProvider>
    </NavigationContainer>
  );
};

export default Index;
