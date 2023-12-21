import {useEffect} from 'react';
import {useAuth} from '../contexts/AuthProvider';

export const LogoutScreen = () => {
  const {signOut} = useAuth();

  useEffect(() => {
    signOut();
  }, [signOut]);

  return null;
};
