import {useEffect} from 'react';
import {useAuth} from '.';

export const TokenValidityChecker = () => {
  const {authData, signOut} = useAuth();

  useEffect(() => {
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
  }, [authData, signOut]);

  return null;
};
