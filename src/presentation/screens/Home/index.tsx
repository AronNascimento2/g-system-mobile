import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ROUTES_PATHS} from '../../constants/routesPaths';
import {useAuth} from '../../contexts/AuthProvider';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {signOut, authData} = useAuth();
  console.log(authData?.Permissions);

  const handleIconPress = path => {
    navigation.navigate(path);
  };

  const handleLogout = () => {
    signOut();
  };

  const renderIcons = () => {
    const icons = ROUTES_PATHS.map(route => {
      const hasPermission = authData?.Permissions?.includes(route.title);
      const disabled = !hasPermission;

      return (
        <TouchableOpacity
          key={route.path}
          style={[styles.iconContainer, disabled ? styles.disabledIcon : null]}
          onPress={() => {
            if (!disabled) {
              handleIconPress(route.path);
            }
          }}
          disabled={disabled}>
          <Text style={styles.text}>{route?.title}</Text>
        </TouchableOpacity>
      );
    });

    // Adicionando o botão "Sair"
    icons.push(
      <TouchableOpacity
        key="logout"
        style={styles.iconContainer}
        onPress={handleLogout}>
        <Text style={styles.text}>Sair</Text>
      </TouchableOpacity>,
    );

    return icons;
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require('../../../assets/logo.png')}
        />
      </View>
      <View style={styles.wrapper}>
        <View style={styles.row}>{renderIcons()}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    display: 'flex',
  },
  containerLogo: {
    height: 120,
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center', // Centraliza os ícones horizontalmente
    alignItems: 'center', // Centraliza os ícones verticalmente
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    gap: 7,
    padding: 15,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
    height: 100,
    backgroundColor: '#fff',
  },
  disabledIcon: {
    backgroundColor: '#ccc',
    color: '#999', // Cor do texto para botão desabilitado
  },
  text: {
    color: 'black',
  },
  wrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
