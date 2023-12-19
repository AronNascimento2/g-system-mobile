import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export const AttendanceScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela Atendimento em construção !!!</Text>
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
