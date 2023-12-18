import React, {useState} from 'react';
import {Button, TextInput, View} from 'react-native';
import {useAuth} from '../../contexts/AuthProvider'; // Verifique se o caminho está correto

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [password, setPassword] = useState('');
  const {signIn} = useAuth(); // Verifique se o uso do contexto está correto

  const handleSignIn = async () => {
    try {
      await signIn(email, password, cnpj); // Verifique se os parâmetros estão corretos
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      // Lógica para lidar com erros de login, como exibir uma mensagem para o usuário
    }
  };

  return (
    <View>
      <TextInput placeholder="CNPJ" value={cnpj} onChangeText={setCnpj} />
      <TextInput placeholder="Usuario" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        onPress={handleSignIn} // Chame a função que realiza o signIn
        title="Entrar no App"
      />
    </View>
  );
};
