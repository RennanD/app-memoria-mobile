import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes/index.routes';

import { AppProvider } from './hooks';

const Index: React.FC = () => {
  const linking = {
    prefixes: ['https://appmemoria.herokuapp.com/accept', 'app-memoria://'],
    config: {
      screens: {
        Menu: {
          path: 'Menu',
        },
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <StatusBar barStyle="light-content" backgroundColor="#65C4B0" />
      <AppProvider>
        <Routes />
      </AppProvider>
    </NavigationContainer>
  );
};

export default Index;
