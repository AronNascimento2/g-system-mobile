// In App.js in a new project

import React from 'react';
import {LoginScreen} from './src/presentation/screens/LoginScreen';
import {AuthProvider} from './src/presentation/contexts/AuthProvider';

export const App = () => {
  return (
    <AuthProvider>
      <LoginScreen />
    </AuthProvider>
  );
};
