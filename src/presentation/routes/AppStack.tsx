import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ROUTES_PATHS} from '../constants/routesPaths';
import {SettingScreen} from '../screens';
import HomeScreen from '../screens/Home';

// const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator>
      {ROUTES_PATHS.map(route => (
        <Stack.Screen
          key={route.path}
          name={route.title}
          component={route.element} // Alterado de route.element para route.component
          options={{headerShown: false}} // Defina as opções de navegação, se necessário
        />
      ))}
    </Stack.Navigator>
  );
};

// const HomeTabNavigator = () => {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           headerShown: false,
//           tabBarLabel: 'Home',
//         }}
//       />
//       <Tab.Screen
//         name="Settings"
//         component={SettingScreen}
//         options={{
//           headerShown: false,
//           tabBarLabel: 'Settings',
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// export const Screens = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Home"
//         component={HomeTabNavigator}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="AppStack"
//         component={AppStack}
//         options={{headerShown: false}}
//       />
//     </Stack.Navigator>
//   );
// };
