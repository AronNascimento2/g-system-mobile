import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Alert} from 'react-native';
import {
  AuthService,
  AuthData,
  AuthResponse,
} from '../../../services/Authentication';
import {SplashScreen} from '../../screens/SplashScreen/Splash';

interface AuthContextData {
  authData?: AuthData;
  signIn: (email: string, password: string, cnpj: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}
interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [authData, setAuthData] = useState<AuthData>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    const authDataSerialized = await AsyncStorage.getItem('@AuthData');

    if (authDataSerialized) {
      const _authData: AuthData = JSON.parse(authDataSerialized);

      if (tokenExpired(_authData?.JWT?.Expiration)) {
        signOut();
        return;
      }

      setAuthData(_authData);
    }

    setIsLoading(false);
  }

  function tokenExpired(expirationDate: string | undefined): boolean {
    const expiration = new Date(expirationDate ?? '').getTime();
    const current = new Date().getTime();

    return current > expiration;
  }

  async function signIn(email: string, password: string, cnpj: string) {
    setIsLoading(true);
    try {
      const response: AuthResponse = await AuthService(email, password, cnpj);

      if (response.success && response.data) {
        const _authData: AuthData = response.data;
        setAuthData(_authData);
        AsyncStorage.setItem('@AuthData', JSON.stringify(_authData));
        return;
      }
      setIsLoading(false);
      throw new Error(response.message ?? 'Erro ao autenticar');
    } catch (error) {
      Alert.alert(error.message, 'Tente novamente');
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  async function signOut() {
    setAuthData(undefined);
    await AsyncStorage.removeItem('@AuthData');
  }
  const authContextValue = React.useMemo(
    () => ({authData, signIn, signOut, isLoading}),
    [authData, isLoading],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
