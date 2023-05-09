import React, {useContext} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../context/authProvider';
import PublicStack from './public';
import PrivateStack from './private';

function ApplicationRotues() {
  const {isAuthenticated} = useContext(AuthContext);

  console.log('isAuthenticated', isAuthenticated);

  return (
    <>
      {isAuthenticated ? (
        <NavigationContainer>
          <PrivateStack />
        </NavigationContainer>
      ) : (
        <SafeAreaProvider style={{flex: 1}}>
          <NavigationContainer>
            <PublicStack />
          </NavigationContainer>
        </SafeAreaProvider>
      )}
    </>
  );
}

export default ApplicationRotues;
