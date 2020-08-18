import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import MyMessages from '../screens/MyMessages';

const MessagesRoutes: React.FC = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#65C4B0',
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: 'Minhas mensagens',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="message-outline"
              size={22}
              color={color}
            />
          ),
        }}
        name="MyMessages"
        component={MyMessages}
      />
    </Tab.Navigator>
  );
};

export default MessagesRoutes;
