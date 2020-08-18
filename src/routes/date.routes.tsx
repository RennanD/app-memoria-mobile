import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import CreateDate from '../screens/CreateDate';
import ListDates from '../screens/ListDates';

const DateRoutes: React.FC = () => {
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
          tabBarLabel: 'Minhas datas',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="calendar-text"
              size={22}
              color={color}
            />
          ),
        }}
        name="ListDates"
        component={ListDates}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Adicionar data',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="calendar-plus"
              size={22}
              color={color}
            />
          ),
        }}
        name="CreateDate"
        component={CreateDate}
      />
    </Tab.Navigator>
  );
};

export default DateRoutes;
