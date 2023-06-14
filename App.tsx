import 'react-native-gesture-handler';
import React from 'react';
import {AuthContextProvider} from './src/context/authProvider';
import ApplicationRoutes from './src/navigators';
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();

function App(): JSX.Element {
  return (
    <AuthContextProvider>
      <ApplicationRoutes />
    </AuthContextProvider>
  );
}

export default App;
