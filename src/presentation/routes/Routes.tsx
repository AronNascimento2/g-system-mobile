import {AppState} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {useAuth} from '../contexts/AuthProvider';
import {TokenValidityChecker} from '../contexts/AuthProvider/tokenVAlidity';
import {SplashScreen} from '../screens/SplashScreen/Splash';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Router() {
  const {authData} = useAuth();
  const [appIsReady, setAppIsReady] = useState(false);

  // Esta função é chamada quando o estado do aplicativo muda
  const handleAppStateChange = nextAppState => {
    console.log('AppState mudou para:', nextAppState);

    // Verifique se o estado atual é 'background' (em segundo plano)
    if (nextAppState === 'background') {
      // Faça o que for necessário quando o aplicativo estiver inativo
      // Por exemplo, limpar os dados sensíveis, salvar o estado atual, etc.
      AsyncStorage.removeItem('@AuthData');
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
    }, 2000);
  }, []);

  // Renderiza a tela de splash enquanto o aplicativo está carregando
  if (!appIsReady) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
      {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
