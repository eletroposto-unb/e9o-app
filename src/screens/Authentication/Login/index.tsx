import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../../context/authProvider';

const Login = () => {
  const {login, isAuthenticated} = useContext(AuthContext);
  const navigation = useNavigation();

  const handleLogin = () => {
    console.log("isAuthenticated", isAuthenticated)
    login();
  };

  return (
    <View>
      <Text onPress={() => handleLogin()}>Login</Text>
    </View>
  );
};

export default Login;
