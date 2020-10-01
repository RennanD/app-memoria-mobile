import React from 'react';

import { AppLoading } from 'expo';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuth } from '../hooks';

import AuthRoutes from './auth.routes';

import AppRoutes from './app.routes';
import AcceptInvites from '../screens/AcceptInvites';

const { Screen, Navigator } = createStackNavigator();

const Routes: React.FC = () => {
  const { account, authLoading } = useAuth();

  if (authLoading) {
    return <AppLoading />;
  }

  return (
    <Navigator headerMode="none">
      <Screen name="MyApp" component={account ? AppRoutes : AuthRoutes} />
      <Screen name="AcceptInvites" component={AcceptInvites} />
    </Navigator>
  );
};

export default Routes;
