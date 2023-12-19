import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const ChargeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela Cobrança em construção</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
  },
});
