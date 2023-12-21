import React, {useRef} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useScrollToTop} from '@react-navigation/native';
import {ROUTES_PATHS} from '../constants/routesPaths';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {LogoutModal} from '../screens/Logout';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StackNavigator = () => {
  const scrollRef = useRef(null);
  useScrollToTop(scrollRef);

  return (
    <Stack.Navigator>
      {ROUTES_PATHS.map(route => (
        <Stack.Screen
          key={route.path}
          name={route.title}
          component={route.element}
          options={({navigation}) => ({
            headerLeft: '',
            headerTitle: '',
            headerRight: () => <LogoutModal />,
            headerTintColor: '#333',
            headerShown: navigation.isFocused(), // Mostra o cabeçalho quando a tela está em foco
          })}
        />
      ))}
    </Stack.Navigator>
  );
};

export const AppStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#3498db',
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="HomeTab"
        component={StackNavigator}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
              <FontAwesomeIcon
                icon={faHome}
                color={focused ? '#3498db' : 'gray'}
                size={20}
              />
              <Text style={{color: focused ? '#3498db' : 'gray', fontSize: 12}}>
                Home
              </Text>
            </View>
          ),
          tabBarHideOnKeyboard: true,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
  },
  tabIconContainer: {
    position: 'absolute',
    top: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
