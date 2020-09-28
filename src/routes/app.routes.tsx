import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Menu from '../screens/Menu';
import DateRoutes from './date.routes';
import Notifications from '../screens/Notifications';

import EnviteFriends from '../screens/EnviteFriends';
import ReminderDetail from '../screens/ReminderDetail';
import Contacts from '../screens/Contacts';
import ContactDetail from '../screens/ContactDetail';
import Preferences from '../screens/Preferences';
import ContactsPreferences from '../screens/ContactsPreferences';
import Profile from '../screens/Profile';
import GenericReminderDetail from '../screens/GenericReminderDetail';
import MyMessages from '../screens/MyMessages';
import AcceptEnvites from '../screens/AcceptEnvites';

const AppRoutes: React.FC = () => {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator headerMode="none">
      <Screen name="Menu" component={Menu} />
      <Screen name="PreferencesRoutes" component={Preferences} />
      <Screen name="DateRoutes" component={DateRoutes} />
      <Screen name="MessagesRoutes" component={MyMessages} />
      <Screen name="EnviteFriends" component={EnviteFriends} />
      <Screen name="Notifications" component={Notifications} />
      <Screen name="ReminderDetail" component={ReminderDetail} />
      <Screen name="GenericReminderDetail" component={GenericReminderDetail} />
      <Screen name="Contacts" component={Contacts} />
      <Screen name="ContactDetail" component={ContactDetail} />
      <Screen name="Profile" component={Profile} />
      <Screen name="ContactsPreferences" component={ContactsPreferences} />
      <Screen name="AcceptEnvites" component={AcceptEnvites} />
    </Navigator>
  );
};

export default AppRoutes;
