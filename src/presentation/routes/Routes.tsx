import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {useAuth} from '../contexts/AuthProvider';
import {TokenValidityChecker} from '../contexts/AuthProvider/tokenVAlidity';
import {SplashScreen} from '../screens/SplashScreen/Splash';

export function Router() {
  const {authData} = useAuth();
  const [appIsReady, setAppIsReady] = useState(false);

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
      <TokenValidityChecker />
      {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
