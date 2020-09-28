import React from 'react';
import { StatusBar, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes/index.routes';

import { AppProvider } from './hooks';

const Index: React.FC = () => {
  const linking = {
    prefixes: [
      'https://app-memoria.netlify.app/AcceptEnvites',
      'app-memoria://',
    ],
    config: {
      screens: {
        AcceptEnvites: {
          path: 'AcceptEnvites',
        },
      },
    },
  };

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
