import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {useAuth} from '../contexts/AuthProvider';
import {SplashScreen} from '../screens/SplashScreen/Splash';

export function Router() {
  const {authData, isLoading} = useAuth();

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
      {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
