import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../context/authProvider';
import {getUser} from '../context/asyncStorage';
import SafeAreaWrapper from '../components/SafeArea';
import {createStackNavigator} from '@react-navigation/stack';
import {PrivateNavigator} from './private';
import {PublicNavigator} from './public';
import Help from '../screens/Help';

const Stack = createStackNavigator();

function ApplicationRoutes() {
  const {isAuthenticated, user, setUser} = useContext(AuthContext);

  useEffect(() => {
    handleUser();
  }, [user]);

  const handleUser = async () => {
    const userStoraged = await getUser();
    if (!user) {
      setUser(userStoraged);
    }
  };

  return (
    <SafeAreaWrapper>
      <NavigationContainer>
        {isAuthenticated && user ? (
          <Stack.Navigator
            screenOptions={{
              title: '',
              headerShown: false,
              headerTransparent: false,
              headerShadowVisible: false,
            }}>
            <Stack.Screen name="TabScreens" component={PrivateNavigator} />
            <Stack.Screen name="Help" component={Help} />
          </Stack.Navigator>
        ) : (
          <PublicNavigator />
        )}
      </NavigationContainer>
    </SafeAreaWrapper>
  );
}

export default ApplicationRoutes;
