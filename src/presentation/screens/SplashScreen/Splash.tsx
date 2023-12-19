import React from 'react';
import {View, Image, StyleSheet, ActivityIndicator} from 'react-native';

export const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain" // Ajusta a imagem para caber no componente Image
      />
      <ActivityIndicator size="large" color="#3498db" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 200, // Ajuste as dimensões conforme necessário para o seu layout
    height: 200, // Ajuste as dimensões conforme necessário para o seu layout
  },
});
