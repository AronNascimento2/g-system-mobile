import {AppState} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {useAuth} from '../contexts/AuthProvider';
import {SplashScreen} from '../screens/SplashScreen/Splash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TokenValidityChecker} from '../contexts/TokenValidity';
import {getTokenAndExpiration} from '../helpers/getAsyncStorage';
import {convertToFormattedTime} from '../utils/convertFomratedTime';
import {useBiometricAuthentication} from '../contexts/hook';

export function Router() {
  const {authData, signOut, signIn, isLoading} = useAuth();
  const [appIsReady, setAppIsReady] = useState(false);

  const readFromAsyncStorage = async keys => {
    const result = await AsyncStorage.multiGet(keys);
    const formattedResult = Object.fromEntries(result);

    if (Object.values(formattedResult).some(value => value === null)) {
      throw new Error('Null value found in AsyncStorage');
    }

    return formattedResult;
  };

  const authenticateWithBiometrics = useBiometricAuthentication(async () => {
    const {email, password, cnpj} = await readFromAsyncStorage([
      'email',
      'password',
      'cnpj',
    ]);

    if (email && password && cnpj) {
      signIn(email, password, cnpj);
    } else {
      throw new Error('Null value found in email, password, or cnpj');
    }
  });

  const handleAppStateChange = async nextAppState => {
    const [biometricEnabledValue, email, password, cnpj] = await Promise.all([
      AsyncStorage.getItem('biometricEnabled'),
      AsyncStorage.getItem('email'),
      AsyncStorage.getItem('password'),
      AsyncStorage.getItem('cnpj'),
    ]);

    const {expiration} = await getTokenAndExpiration();

    if (nextAppState === 'background') {
      const backgroundTime = Date.now();
      await AsyncStorage.setItem('@BackgroundTime', backgroundTime.toString());
    } else if (nextAppState === 'active') {
      const backgroundTimeMillis = await AsyncStorage.getItem(
        '@BackgroundTime',
      );

      const currentTime = Date.now();
      const elapsedTime = currentTime - Number(backgroundTimeMillis);
      const elapsedMinutes = elapsedTime / (1000 * 60);

      const backgroundTimeFormatted =
        convertToFormattedTime(backgroundTimeMillis);

      if (
        elapsedMinutes > 10 ||
        (expiration && backgroundTimeFormatted > expiration)
      ) {
        signOut();

        if (biometricEnabledValue === 'true' && email && password && cnpj) {
          authenticateWithBiometrics();
        }
      }
    }
  };

  useEffect(() => {
    const appStateSubscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      appStateSubscription.remove();
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setAppIsReady(true);
    }, 1000);
  }, []);

  if (!appIsReady || isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <TokenValidityChecker />
      {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
