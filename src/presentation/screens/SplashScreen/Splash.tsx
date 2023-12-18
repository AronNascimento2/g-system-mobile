// SplashScreen.tsx

import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  MainScreen: undefined; // Adicione outras telas aqui, se necessário
};

type SplashScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

const Splash: React.FC<SplashScreenProps> = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login'); // Navegar para a tela de Login após o tempo definido
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain" // Ajusta a imagem para caber no componente Image
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  logo: {
    width: 200, // Ajuste as dimensões conforme necessário para o seu layout
    height: 200, // Ajuste as dimensões conforme necessário para o seu layout
  },
});

export default Splash;
