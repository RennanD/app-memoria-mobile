import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import RequestCode from '../screens/RequestCode';
import VerifyCode from '../screens/VerifyCode';

const CodeVerification: React.FC = () => {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator headerMode="none">
      <Screen name="RequestCode" component={RequestCode} />
      <Screen name="VerifyCode" component={VerifyCode} />
    </Navigator>
  );
};

export default CodeVerification;
