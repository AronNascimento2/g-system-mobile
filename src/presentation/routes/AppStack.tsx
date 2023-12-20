// AppStack.js

import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES_PATHS} from '../constants/routesPaths';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigationState} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faSignOut} from '@fortawesome/free-solid-svg-icons';
import {getTokenAndExpiration} from '../helpers/getAsyncStorage';
import {LoginScreen} from '../screens';
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
        tabBarActiveTintColor: '#3498db', // Color for active tab
        tabBarInactiveTintColor: 'gray', // Color for inactive tab
      }}>
      <Tab.Screen
        name="Home"
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
