import {LoginScreen, HomeScreen} from '../screens';

export const ROUTES_PATHS = [
  {
    path: '/Sumario',
    element: HomeScreen,
    title: 'Sumario',
    isPrivate: true,
    permissions: [],
  },
  {
    path: '/Atendimento',
    element: LoginScreen,
    title: 'Atendimento',
    isPrivate: true,
    Permissions: [],
  },
];
