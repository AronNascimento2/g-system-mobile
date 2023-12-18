import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthData} from '../../../services/Authentication';

export interface AuthContextData {
  user: AuthData | null;
  permissions: string[] | null;
  logo: string | null; // Adicionando a logo ao contexto de autenticação
  login: (username: string, password: string, cnpj: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData | undefined>(
  undefined,
);

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<AuthData | null>(null);
  const [permissions, setPermissions] = useState<string[] | null>(null);
  const [logo, setLogo] = useState<string | null>('');

  useEffect(() => {
    const loadDataFromStorage = async () => {
      try {
        const storedToken = (await AsyncStorage.getItem('token')) ?? '';
        const storedExpiration =
          (await AsyncStorage.getItem('expiration')) ?? '';
        const storedPermissions =
          (await AsyncStorage.getItem('permissions')) ?? '';
        const storedLogo = (await AsyncStorage.getItem('logo')) ?? '';

        if (
          storedToken &&
          storedExpiration &&
          storedPermissions &&
          storedLogo
        ) {
          const expiration = new Date(storedExpiration).getTime();
          const currentDate = new Date().getTime();

          if (expiration > currentDate) {
            setUser({
              JWT: {Token: storedToken},
              Permissions: JSON.parse(storedPermissions),
            });
            setPermissions(JSON.parse(storedPermissions));
            setLogo(storedLogo);
          }
        }
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      }
    };

    loadDataFromStorage();
  }, []);

  const login = useCallback(
    async (username: string, password: string, cnpj: string) => {
      try {
        const response = await authenticate(username, password, cnpj);
        if (response.success && response.data) {
          const {JWT, Permissions, Logo} = response.data;
          setUser({JWT, Permissions});
          setPermissions(Permissions);
          setLogo(Logo);

          await AsyncStorage.setItem(
            'permissions',
            JSON.stringify(Permissions),
          );
          await AsyncStorage.setItem('logo', Logo);
        } else {
          throw new Error(response.message ?? 'Erro ao autenticar');
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      setUser(null);
      setPermissions(null);
      setLogo(null);

      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('expiration');
      await AsyncStorage.removeItem('permissions');
      await AsyncStorage.removeItem('logo');
    } catch (error) {
      console.error('Error clearing data from AsyncStorage:', error);
    }
  }, []);

  const authContextValue = useMemo(() => {
    return {user, permissions, logo, login, logout};
  }, [user, permissions, logo, login, logout]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
