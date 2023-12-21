import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Switch,
  Alert,
} from 'react-native';
import {useAuth} from '../../contexts/AuthProvider';
import {TextInputMask} from 'react-native-masked-text';
import {SplashScreen} from '../SplashScreen/Splash';
import TouchID from 'react-native-touch-id';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useBiometricAuthentication} from '../../contexts/hook';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [password, setPassword] = useState('');
  const {signIn} = useAuth();
  const [loading, setLoading] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [isBiometricStored, setIsBiometricStored] = useState(false);
  const [loadingToggle, setLoadingToggle] = useState(false);

  const checkBiometricStored = async () => {
    try {
      const storedBiometricEnabled = await AsyncStorage.getItem(
        'biometricEnabled',
      );

      if (storedBiometricEnabled === 'true') {
        setIsBiometricStored(true);
        setBiometricEnabled(false);
      } else {
        setIsBiometricStored(false);
        setBiometricEnabled(true);
      }
    } catch (error) {
      console.error(
        'Erro ao verificar configuração de login por biometria:',
        error,
      );
    }
  };

  // Chame a função quando o componente for montado
  useEffect(() => {
    checkBiometricStored();
  }, []);

  // ... outras lógicas do componente
  const toggleBiometricLogin = async newValue => {
    try {
      setLoadingToggle(true);

      if (!newValue) {
        // Remover a senha do AsyncStorage e desativar a biometria
        await AsyncStorage.removeItem('password');
        await AsyncStorage.removeItem('biometricEnabled');
        setBiometricEnabled(false); // Atualizar o estado do toggle
        setLoadingToggle(false);
      } else {
        // Verificar se todos os campos estão preenchidos
        if (!email || !password || !cnpj) {
          Alert.alert(
            'Preencha todos os campos',
            'Por favor, preencha todos os campos antes de ativar a biometria.',
          );
          setLoadingToggle(false);
          return;
        }

        // Salvar ou atualizar o estado da biometria no AsyncStorage e ativar o toggle
        await AsyncStorage.setItem('biometricEnabled', String(newValue));
        setIsBiometricStored(!newValue);
        setBiometricEnabled(true); // Atualizar o estado do toggle
        setLoadingToggle(false);
      }
    } catch (error) {
      console.error(
        'Erro ao salvar/remover configuração de login por biometria:',
        error,
      );
      setLoadingToggle(false);
    }
  };

  useEffect(() => {
    const getStoredData = async (key, setter) => {
      try {
        const storedValue = await AsyncStorage.getItem(key);
        if (storedValue !== null) {
          setter(storedValue);
        }
      } catch (error) {
        console.error(`Erro ao recuperar ${key} do AsyncStorage:`, error);
      }
    };

    const getBiometricSetting = async () => {
      try {
        const storedBiometricSetting = await AsyncStorage.getItem(
          'biometricEnabled',
        );
        const isEnabled = storedBiometricSetting === 'true';
        setBiometricEnabled(isEnabled);
        setIsBiometricStored(true);
      } catch (error) {
        console.error(
          'Erro ao recuperar/configurar login por biometria:',
          error,
        );
      }
    };

    getStoredData('cnpj', setCnpj);
    getStoredData('email', setEmail);
    getStoredData('password', setPassword);
    getBiometricSetting();
  }, []);

  const saveToStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(`Erro ao salvar ${key} no AsyncStorage:`, error);
    }
  };

  const handleSignIn = async () => {
    setLoading(true);
    try {
      if (!biometricEnabled) {
        // Se o toggle estiver desativado, limpe o campo de senha
        setPassword('');
      }

      const signInData = {email, password, cnpj};
      await signIn(signInData.email, signInData.password, signInData.cnpj);
      setIsBiometricStored(true);

      Object.entries(signInData).forEach(([key, value]) => {
        saveToStorage(key, value);
      });

      const biometricState = JSON.stringify(biometricEnabled);
      await AsyncStorage.setItem('biometricEnabled', biometricState);

      setLoading(false);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      if (biometricEnabled) {
        // Se estiver ativado, volta o toggle para falso
        setBiometricEnabled(false);
      }
    }
  };

  useEffect(() => {
    // Verifica se o input de senha está vazio e o toggle está desativado
    if (!biometricEnabled) {
      // Limpa o campo de senha quando o toggle é desativado
      setPassword('');
    }
  }, [biometricEnabled]);

  const authenticateWithBiometrics = useBiometricAuthentication(handleSignIn);

  const handleBiometricAuthentication = () => {
    authenticateWithBiometrics(); // Chama a função de autenticação
  };
  const handleInputChange = (text, setter, key) => {
    setter(text);
    saveToStorage(key, text);
  };
  if (loading) {
    return <SplashScreen />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.containerLogo}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('../../../assets/logo.png')}
          />
        </View>
        <>
          {biometricEnabled && isBiometricStored && !loadingToggle ? (
            <TouchableOpacity
              style={styles.button}
              onPress={handleBiometricAuthentication}>
              <Text style={styles.buttonText}>Acessar com Biometria</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TextInputMask
                placeholderTextColor="black" // Cor do placeholder
                style={styles.input}
                placeholder="CNPJ"
                type={'custom'}
                options={{
                  mask: '99.999.999/9999-99',
                }}
                value={cnpj}
                keyboardType="numeric" // Define o teclado como numérico
                onChangeText={text => handleInputChange(text, setCnpj, 'cnpj')}
              />
              <TextInput
                placeholderTextColor="black" // Cor do placeholder
                style={styles.input}
                placeholder="Usuario"
                value={email}
                onChangeText={text =>
                  handleInputChange(text, setEmail, 'email')
                }
              />
              <TextInput
                placeholderTextColor="black" // Cor do placeholder
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={text =>
                  handleInputChange(text, setPassword, 'password')
                }
              />
              <View style={styles.wrapperButtons}>
                <TouchableOpacity
                  disabled={loading}
                  style={styles.button}
                  onPress={handleSignIn}
                  activeOpacity={0.8}>
                  <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {backgroundColor: '#ccc', borderColor: '#999'}, // Ajuste a cor do botão desativado aqui
                    {opacity: loading ? 0.5 : 1}, // Mantém a opacidade durante o estado de carregamento
                  ]}
                  activeOpacity={0.8}
                  disabled={true} // Altere conforme necessário
                >
                  <Text style={styles.buttonText}>Esqueci a senha</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </>

        <View style={styles.wrapperBiometricToggle}>
          <Text style={{color: 'black'}}>Ativar login por biometria</Text>
          <Switch
            disabled={loadingToggle}
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={biometricEnabled ? '#3498db' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={newValue => toggleBiometricLogin(newValue)}
            value={biometricEnabled}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLogo: {
    height: 150,
    width: '100%',
    marginBottom: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperButtons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  input: {
    height: 50,

    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '80%',
    color: 'black',
  },
  button: {
    height: 50,
    backgroundColor: '#3498db',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: '80%',
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  wrapperBiometricToggle: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    alignItems: 'center', // Alinha os itens horizontalmente
    display: 'flex',
  },
});
