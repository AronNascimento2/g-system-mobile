import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAuth} from '../../contexts/AuthProvider'; // Verifique se o caminho está correto
import {TextInputMask} from 'react-native-masked-text';
import {SplashScreen} from '../SplashScreen/Splash';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [password, setPassword] = useState('');
  const {signIn} = useAuth(); // Verifique se o uso do contexto está correto
  const [loading, setLoading] = useState(false);
  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signIn(email, password, cnpj);
      setLoading(false); // Verifique se os parâmetros estão corretos
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
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
          onChangeText={text => setCnpj(text)}
        />
        <TextInput
          placeholderTextColor="black" // Cor do placeholder
          style={styles.input}
          placeholder="Usuario"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholderTextColor="black" // Cor do placeholder
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
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
              {backgroundColor: '#ccc', borderColor: '#999'}, // Adjust disabled button color here
              {opacity: loading ? 0.5 : 1}, // Maintain opacity for loading state
            ]}
            activeOpacity={0.8}
            disabled={true} // Altere conforme necessário
          >
            <Text style={styles.buttonText}>Esqueci a senha</Text>
          </TouchableOpacity>
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
});
