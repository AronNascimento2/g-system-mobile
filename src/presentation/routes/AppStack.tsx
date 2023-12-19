import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTES_PATHS} from '../constants/routesPaths';

const Stack = createNativeStackNavigator();

export function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      {ROUTES_PATHS.map(route => (
        <Stack.Screen
          key={route.path}
          name={route.title}
          component={route.element as React.ComponentType}
        />
      ))}
    </Stack.Navigator>
  );
}
