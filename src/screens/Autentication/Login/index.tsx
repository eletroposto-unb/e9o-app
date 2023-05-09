import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NativeBaseProvider, Box} from 'native-base';
import {PRIMARY} from '../../../styles/colors';
import BottomBar from '../../Homepage/BottomBar';

const Login = () => {
  return (
    <View>
      <Text>Login</Text>
      <BottomBar />
    </View>
  );
};

export default Login;
