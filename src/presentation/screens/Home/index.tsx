import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ROUTES_PATHS} from '../../constants/routesPaths';
import {useAuth} from '../../contexts/AuthProvider';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {signOut, authData} = useAuth();

  const handleIconPress = path => {
    navigation.navigate(path);
  };

  const handleLogout = () => {
    signOut();
  };
  const filteredRoutes = ROUTES_PATHS.filter(route => route.title !== 'Home');

  const renderIcons = () => {
    const icons = filteredRoutes.map(route => {
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
          <FontAwesomeIcon icon={route.icon as IconProp} style={styles.icon} />

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
        <FontAwesomeIcon icon={faSignOutAlt} style={styles.icon} />
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
    justifyContent: 'center',
    alignContent: 'center',
  },
  containerLogo: {
    height: 150,
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
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    gap: 15,
    padding: 15,
  },
  iconContainer: {
    elevation: 20,

    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
  },
  disabledIcon: {
    backgroundColor: '#ccc',
    color: '#999', // Cor do texto para botão desabilitado
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  wrapper: {
    paddingTop: 40,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
