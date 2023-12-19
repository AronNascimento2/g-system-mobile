import AsyncStorage from '@react-native-async-storage/async-storage';

export const getTokenAndExpiration = async () => {
  try {
    const dataStorage = await AsyncStorage.getItem('@AuthData');
    const data = JSON.parse(dataStorage ?? '{}');

    const token = data.JWT?.Token || null;
    const expiration = data.JWT?.expiration || null;

    return {token, expiration};
  } catch (error) {
    console.log('Erro ao recuperar token e expiração:', error);
    return {token: null, expiration: null};
  }
};
