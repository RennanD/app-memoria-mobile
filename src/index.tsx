import React from 'react';
import { StatusBar, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { AppLoading } from 'expo';
import Routes from './routes/index.routes';

import { AppProvider, useAuth } from './hooks';

const Index: React.FC = () => {
  const { authLoading } = useAuth();

  const linking = {
    prefixes: ['https://appmemoria.herokuapp.com/accept', 'app-memoria://'],
    config: {
      screens: {
        AcceptInvites: {
          path: 'AcceptInvites/:contact_id',
        },
      },
    },
  };

  if (authLoading) {
    return <AppLoading />;
  }

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
