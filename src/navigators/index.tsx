import React, {useContext} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../context/authProvider';
import TabNavigator from '../components/TabNavigator';
import MyStack from './public';

function ApplicationRoutes() {
  const {isAuthenticated} = useContext(AuthContext);

  return (
    <>
      {isAuthenticated ? (
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      ) : (
        <SafeAreaProvider>
          <NavigationContainer>
            <MyStack />
          </NavigationContainer>
        </SafeAreaProvider>
      )}
    </>
  );
}

export default ApplicationRoutes;
