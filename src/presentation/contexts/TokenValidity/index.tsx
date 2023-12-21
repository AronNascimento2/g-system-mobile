import React from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useAuth} from '../AuthProvider';

export const TokenValidityChecker = () => {
  const {authData, signOut} = useAuth();

  useFocusEffect(
    React.useCallback(() => {
      const checkTokenValidity = async () => {
        if (authData && authData.JWT && authData.JWT.Expiration) {
          const expiration = new Date(authData.JWT.Expiration).getTime();
          const current = new Date().getTime();
          if (current > expiration) {
            await signOut();
          }
        }
      };

      checkTokenValidity();
    }, [authData, signOut]),
  );

  return null;
};
