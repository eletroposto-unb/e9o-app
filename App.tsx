import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContextProvider} from './src/context/authProvider';
import PublicStack from './src/navigators/public';
import PrivateStack from './src/navigators/private';
import ApplicationRotues from './src/navigators';

function App(): JSX.Element {
  console.log('IS LOGGED', false);

  return (
    <AuthContextProvider>
      <ApplicationRotues />
    </AuthContextProvider>
  );
}

export default App;
