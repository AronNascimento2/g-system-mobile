import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Alert} from 'react-native';
import {
  AuthService,
  AuthData,
  AuthResponse,
} from '../../../services/Authentication';

interface AuthContextData {
  authData?: AuthData;
  signIn: (email: string, password: string, cnpj: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [authData, setAuthData] = useState<AuthData>();
  const [isLoading, setIsLoading] = useState(true);
  console.log(authData);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      const authDataSerialized = await AsyncStorage.getItem('@AuthData');
      if (authDataSerialized) {
        const _authData: AuthData = JSON.parse(authDataSerialized);

        if (tokenExpired(_authData?.JWT?.Expiration)) {
          // Se o token estiver expirado, limpe os dados e redirecione para a tela de login
          signOut();
          return;
        }

        setAuthData(_authData);
      }
    } catch (error) {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  }

  // Verifica se o token expirou
  function tokenExpired(expirationDate: string | undefined): boolean {
    if (!expirationDate) {
      return true; // Se não houver data de expiração, consideramos que o token está expirado
    }

    const expiration = new Date(expirationDate).getTime();
    const current = new Date().getTime();

    // Verifica se a hora atual (current) é posterior à hora de expiração (expiration)
    return current > expiration;
  }

  async function signIn(email: string, password: string, cnpj: string) {
    try {
      const response: AuthResponse = await AuthService(email, password, cnpj);

      if (response.success && response.data) {
        const _authData: AuthData = response.data;
        setAuthData(_authData);
        AsyncStorage.setItem('@AuthData', JSON.stringify(_authData));
      } else {
        throw new Error(response.message || 'Erro ao autenticar');
      }
    } catch (error) {
      Alert.alert(error.message, 'Tente novamente');
    }
  }

  async function signOut() {
    setAuthData(undefined);
    AsyncStorage.removeItem('@AuthData');
  }

  return (
    <AuthContext.Provider value={{authData, signIn, signOut, isLoading}}>
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
