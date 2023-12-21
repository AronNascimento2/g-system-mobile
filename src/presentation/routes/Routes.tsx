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
  const {authData, signOut, signIn} = useAuth();
  const [appIsReady, setAppIsReady] = useState(false);

  const handleSign = async () => {
    const storedEmail = await AsyncStorage.getItem('email');
    const storedCnpj = await AsyncStorage.getItem('cnpj');
    const storedPassword = await AsyncStorage.getItem('password');

    if (storedEmail && storedCnpj && storedPassword) {
      signIn(storedEmail, storedPassword, storedCnpj);
    }
  };

  const authenticateWithBiometrics = useBiometricAuthentication(handleSign);
  const handleAppStateChange = async nextAppState => {
    const biometricEnabledValue = await AsyncStorage.getItem(
      'biometricEnabled',
    );
    const email = await AsyncStorage.getItem('email');

    const password = await AsyncStorage.getItem('password');

    const cnpj = await AsyncStorage.getItem('cnpj'),
      handleBiometricAuthentication = () => {
        authenticateWithBiometrics();
      };
    const {expiration} = await getTokenAndExpiration();
    console.log(nextAppState);

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
          handleBiometricAuthentication();
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

  if (!appIsReady) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <TokenValidityChecker />
      {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
