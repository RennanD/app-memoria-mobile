import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CreateEvent from '../screens/CreateEvent';
import NewContact from '../screens/CreateEvent/steps/NewContact';
import PersonalDate from '../screens/CreateEvent/steps/PersonalDate';
import WithContact from '../screens/CreateEvent/steps/WithContact';

import ListDates from '../screens/ListDates';

const DateRoutes: React.FC = () => {
  const { Screen, Navigator } = createStackNavigator();

  return (
    <Navigator headerMode="none">
      <Screen name="ListDates" component={ListDates} />
      <Screen name="CreateEvent" component={CreateEvent} />
      <Screen name="NewContact" component={NewContact} />
      <Screen name="PersonalDate" component={PersonalDate} />
      <Screen name="WithContact" component={WithContact} />
    </Navigator>
  );
};

export default DateRoutes;
