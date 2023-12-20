import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {DefaultTheme} from '@react-navigation/native';
import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {useAuth} from '../contexts/AuthProvider';

export function Router() {
  const {authData} = useAuth();

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      text: 'black', // Define a cor do texto como preto
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
