// In App.js in a new project

import React from 'react';
import {AuthProvider} from './src/presentation/contexts/AuthProvider';
import {Router} from './src/presentation/routes/Routes';

export const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};
