import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ROUTES_PATHS} from '../constants/routesPaths';
import {SettingScreen} from '../screens';
import HomeScreen from '../screens/Home';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faScrewdriverWrench} from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Define the FontAwesomeIcon components outside the component
const homeIcon = <FontAwesomeIcon icon={faHome} />;
const settingsIcon = <FontAwesomeIcon icon={faScrewdriverWrench} />;

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: () => homeIcon, // Pass the component as a prop
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Settings',
          tabBarIcon: () => settingsIcon, // Pass the component as a prop
        }}
      />
    </Tab.Navigator>
  );
};

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeStack"
        component={HomeTabNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
