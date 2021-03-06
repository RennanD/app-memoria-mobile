import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Menu from '../screens/Menu';
import Notifications from '../screens/Notifications';

import DateRoutes from './date.routes';

import InviteFriends from '../screens/InviteFriends';
import ReminderDetail from '../screens/ReminderDetail';
import Contacts from '../screens/Contacts';
import ContactDetail from '../screens/ContactDetail';
import Preferences from '../screens/Preferences';
import ContactsPreferences from '../screens/ContactsPreferences';
import Profile from '../screens/Profile';
import GenericReminderDetail from '../screens/GenericReminderDetail';
import MyMessages from '../screens/MyMessages';
import AcceptInvites from '../screens/AcceptInvites';
// import ListDates from '../screens/ListDates';
// import CreateEvent from '../screens/CreateEvent';

const AppRoutes: React.FC = () => {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator headerMode="none">
      <Screen name="Menu" component={Menu} />
      <Screen name="PreferencesRoutes" component={Preferences} />
      <Screen name="DateRoutes" component={DateRoutes} />
      {/* <Screen name="CreateEvent" component={CreateEvent} /> */}
      <Screen name="MessagesRoutes" component={MyMessages} />
      <Screen name="EnviteFriends" component={InviteFriends} />
      <Screen name="Notifications" component={Notifications} />
      <Screen name="ReminderDetail" component={ReminderDetail} />
      <Screen name="GenericReminderDetail" component={GenericReminderDetail} />
      <Screen name="Contacts" component={Contacts} />
      <Screen name="ContactDetail" component={ContactDetail} />
      <Screen name="Profile" component={Profile} />
      <Screen name="ContactsPreferences" component={ContactsPreferences} />
      <Screen name="AcceptInvites" component={AcceptInvites} />
    </Navigator>
  );
};

export default AppRoutes;
