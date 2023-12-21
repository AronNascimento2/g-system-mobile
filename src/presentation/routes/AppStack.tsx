// AppStack.js

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES_PATHS} from '../constants/routesPaths';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faSignOut} from '@fortawesome/free-solid-svg-icons';
import {LogoutScreen} from './handleLogout';
import {Text, View, StyleSheet} from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator>
    {ROUTES_PATHS.map(route => (
      <Stack.Screen
        key={route.path}
        name={route.title}
        component={route.element}
        options={{headerShown: false}}
      />
    ))}
  </Stack.Navigator>
);

export const AppStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#3498db', // Color for active tab
        tabBarInactiveTintColor: 'gray', // Color for inactive tab
      }}>
      <Tab.Screen
        name="HomeTab"
        component={StackNavigator}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
              <FontAwesomeIcon
                icon={faHome}
                color={focused ? '#3498db' : 'gray'}
                size={20}
              />
              <Text style={{color: focused ? '#3498db' : 'gray', fontSize: 12}}>
                Home
              </Text>
            </View>
          ),
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tab.Screen
        name="Sair"
        component={LogoutScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
              <FontAwesomeIcon
                icon={faSignOut}
                color={focused ? '#3498db' : 'gray'}
                size={20}
              />
              <Text style={{color: focused ? '#3498db' : 'gray', fontSize: 12}}>
                Sair
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  tabIconContainer: {
    position: 'absolute',
    top: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
