// AppStack.js

import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES_PATHS} from '../constants/routesPaths';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigationState} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faSignOut,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import {getTokenAndExpiration} from '../helpers/getAsyncStorage';
import {LoginScreen} from '../screens';
import {LogoutScreen} from './handleLogout';

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
  const navigation = useNavigationState(state => state);
  const [tokenExpired, setTokenExpired] = useState(false);

  useEffect(() => {
    const checkTokenExpiration = async () => {
      try {
        const {token, expiration} = await getTokenAndExpiration();

        if (token && expiration) {
          const expirationDate = new Date(expiration).getTime();
          const currentDate = new Date().getTime();

          if (currentDate > expirationDate) {
            await AsyncStorage.removeItem('@AuthData');
            setTokenExpired(true);
          }
        }
      } catch (error) {
        console.log('Erro ao verificar expiração do token:', error);
      }
    };

    checkTokenExpiration();
  }, [navigation]);

  if (tokenExpired) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#3498db',
      }}>
      <Tab.Screen
        name="Home"
        component={StackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({size, color}) => (
            <FontAwesomeIcon icon={faHome} color={color} size={20} />
          ),
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tab.Screen
        name="Sair"
        component={LogoutScreen} // Use the LogoutScreen component here
        options={{
          tabBarLabel: 'Sair',
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon icon={faSignOut} color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
