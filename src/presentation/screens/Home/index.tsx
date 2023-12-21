import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ROUTES_PATHS} from '../../constants/routesPaths';
import {useAuth} from '../../contexts/AuthProvider';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {LogoutS} from '../logout';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {authData} = useAuth();

  const handleIconPress = path => {
    navigation.navigate(path);
  };

  const filteredRoutes = ROUTES_PATHS.filter(route => route.title !== 'Home');

  const renderIcons = () => {
    const icons = filteredRoutes.map(route => {
      const hasPermission = authData?.Permissions?.includes(route.title);
      const disabled = !hasPermission;

      return (
        <View key={route.path} style={styles.iconTextContainer}>
          <TouchableOpacity
            style={[
              styles.iconContainer,
              disabled ? styles.disabledIcon : null,
            ]}
            onPress={() => {
              if (!disabled) {
                handleIconPress(route.path);
              }
            }}
            disabled={disabled}>
            <FontAwesomeIcon
              size={25}
              icon={route.icon as IconProp}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={[styles.text, disabled ? styles.disabledText : null]}>
            {route?.label}
          </Text>
        </View>
      );
    });

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
  iconTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: '#fff',
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
    gap: 20,
  },
  iconContainer: {
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 90,
    borderRadius: 60,
    backgroundColor: '#3498db',
  },
  disabledIcon: {
    backgroundColor: '#ccc',
    color: '#999', // Cor do texto para botão desabilitado
  },
  disabledText: {
    color: '#999', // Cor do texto para botão desabilitado
  },
  text: {
    fontSize: 16,
    color: '#3498db',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLogo: {
    height: 150,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    paddingRight: 10,

    paddingTop: 30,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
