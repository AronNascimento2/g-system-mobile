// HomeScreen.js
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

export const HomeScreen = () => {
  return (
    <View style={styles.background}>
      <Text>Home</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'flex-start', // Alterado para alinhamento à esquerda
    justifyContent: 'center',
    backgroundColor: 'FFF', // Defina a cor de fundo desejada
  },
});
