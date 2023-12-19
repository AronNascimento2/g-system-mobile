import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAuth} from '../../contexts/AuthProvider'; // Verifique se o caminho está correto
import {TextInputMask} from 'react-native-masked-text';

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

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image source={require('../../../assets/logo.png')} />
      </View>
      <View style={styles.wrapperInputs}>
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
        <TouchableOpacity
          disabled={loading}
          style={styles.button}
          onPress={handleSignIn}
          activeOpacity={0.8}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          disabled={true} // Altere conforme necessário
        >
          <Text style={styles.buttonText}>Esqueci a senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#2980b9',
    color: 'black',
  },
  containerLogo: {
    padding: 10,
    height: 'auto',
    backgroundColor: '#fff',
  },
  wrapperInputs: {
    flex: 1,
    display: 'flex',
    paddingTop: 40,

    justifyContent: 'flex-start',
    width: '100%',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    color: 'black',
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%',
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
