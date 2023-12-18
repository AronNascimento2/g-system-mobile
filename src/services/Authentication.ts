import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AuthData {
  JWT: {
    Token: string;
    Expiration?: string;
  };
  Permissions: string[]; // Adicionando as permissões ao AuthData
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: AuthData;
}

export const authenticate = async (
  username: string,
  password: string,
  cnpj: string,
): Promise<AuthResponse> => {
  const url = 'https://api.gsystem.com.br/api/Auth';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        CNPJ: cnpj,
        Login: username,
        PasswordHash: password,
      }),
    });

    if (response.ok) {
      const data: AuthData = await response.json();
      AsyncStorage.setItem('token', data.JWT.Token);
      if (data.JWT.Expiration) {
        AsyncStorage.setItem('expiration', data.JWT.Expiration);
      }

      return {success: true, data};
    } else {
      const errorText: string = await response.text();
      throw new Error(errorText || 'Erro ao autenticar');
    }
  } catch (error: any) {
    // Aqui, o TypeScript não consegue inferir o tipo do erro, então estamos usando `any`
    throw new Error('Erro ao autenticar: ' + error.message);
  }
};
