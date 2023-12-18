import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../utils/Auth';

export const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const [cnpj, setCnpj] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const navigation = useNavigation();
  const {login} = useAuth();

  const cnpjInputRef = useRef(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setLoading(true);

    try {
      await login(userName, password, cnpj);
      // Salvar CNPJ após login bem-sucedido (no AsyncStorage, por exemplo)
      // Exemplo: AsyncStorage.setItem('cnpj', cnpj);
      navigation.navigate('Agenda');
    } catch (error) {
      setError(error.message || 'Ocorreu um erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Lógica para redirecionar caso já esteja autenticado
    // Exemplo: Verificar se há um token no AsyncStorage
    // Se sim, navegar para a tela 'Sumario'
    // AsyncStorage.getItem('token').then(token => {
    //   if (token) {
    //     navigation.navigate('Sumario');
    //   }
    // });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Iniciar sessão</Text>
        {/* <InputMask
          style={styles.input}
          mask="99.999.999/9999-99"
          value={cnpj}
          onChangeText={setCnpj}
          placeholder="CNPJ"
          keyboardType="numeric"
          autoCompleteType="off"
          refInput={cnpjInputRef}
        /> */}
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          value={userName}
          onChangeText={setUserName}
        />
        <View style={styles.passwordInputWrapper}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            {showPassword ? <Text>Show</Text> : <Text>Hide</Text>}
          </TouchableOpacity>
        </View>
        {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
        <View style={styles.buttonContainer}>
          <Button title="Entrar" onPress={handleLogin} loading={loading} />
          <Button title="Esqueci a senha" disabled={true} />
        </View>
      </View>
      <View style={styles.logoContainer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    // Estilos do container de login
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    // Estilos do input
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  passwordInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
  },
  errorMessage: {
    // Estilos da mensagem de erro
    color: 'red',
    marginBottom: 10,
  },
  buttonContainer: {
    // Estilos do container dos botões
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoContainer: {
    // Estilos do container do logo
    marginTop: 20,
  },
  logo: {
    // Estilos do logo
    width: 100,
    height: 100,
  },
});
