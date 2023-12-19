import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Button,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ROUTES_PATHS} from '../../constants/routesPaths';
import {useAuth} from '../../contexts/AuthProvider';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const {signOut} = useAuth();
  const handleIconPress = path => {
    navigation.navigate(path); // Navegue para a rota correspondente ao ícone pressionado
  };
  const handleLogout = () => {
    signOut();
  };
  const renderIcons = () => {
    return ROUTES_PATHS.map((route, index) => (
      <TouchableOpacity
        key={index}
        style={styles.iconContainer}
        onPress={() => handleIconPress(route.path)}>
        <Text style={styles.text}>{route?.title}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image source={require('../../../assets/logo.png')} />
      </View>
      <View style={styles.wrapper}>
        <View style={styles.row}>{renderIcons()}</View>
        <Button title="Sair" onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db',
    color: 'black',
  },
  containerLogo: {
    height: 'auto',
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 80,
    backgroundColor: '#fff',
    margin: 10,
    color: 'blue',
  },
  text: {
    color: 'black',
  },
  wrapper: {
    display: 'flex',

    justifyContent: 'center',
    flex: 1,
  },
});
