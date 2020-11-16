import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Feather } from '@expo/vector-icons';

import Preferences from '../screens/Preferences';
import MyPreferences from '../screens/MyPreferences';

const PreferencesRoutes: React.FC = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#65C4B0',
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: 'Adicionar preferências',
          tabBarIcon: ({ color }) => (
            <Feather name="edit" size={22} color={color} />
          ),
        }}
        name="Preferences"
        component={Preferences}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Minhas preferências',
          tabBarIcon: ({ color }) => (
            <Feather name="list" size={22} color={color} />
          ),
        }}
        name="MyPreferences"
        component={MyPreferences}
      />
    </Tab.Navigator>
  );
};

export default PreferencesRoutes;
