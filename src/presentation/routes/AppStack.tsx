import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES_PATHS} from '../constants/routesPaths';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigationState} from '@react-navigation/native';
import {LoginScreen} from '../screens';
import {getTokenAndExpiration} from '../helpers/getAsyncStorage';

const Stack = createStackNavigator();

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
};
