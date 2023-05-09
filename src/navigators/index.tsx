import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../context/authProvider';
import SafeAreaWrapper from '../components/SafeArea';
import {createStackNavigator} from '@react-navigation/stack';
import {PrivateNavigator} from './private';
import {PublicNavigator} from './public';

const Stack = createStackNavigator();

function ApplicationRoutes() {
  const {isAuthenticated} = useContext(AuthContext);

  return (
    <SafeAreaWrapper>
      <NavigationContainer>
        {isAuthenticated ? <PrivateNavigator /> : <PublicNavigator />}
      </NavigationContainer>
    </SafeAreaWrapper>
  );
}

export default ApplicationRoutes;
