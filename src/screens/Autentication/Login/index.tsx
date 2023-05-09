import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../../context/authProvider';

const Login = () => {
  const {login, isAuthenticated} = useContext(AuthContext);
  const navigation = useNavigation();

  const handleLogin = () => {
    login();
    navigation.navigate('Profile');
  };

  console.log("REALIZA LOGIN", isAuthenticated)

  return (
    <View>
      <Text onPress={() => handleLogin()}>Login</Text>
    </View>
  );
};

export default Login;
