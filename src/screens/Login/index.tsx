import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NativeBaseProvider, Box} from 'native-base';
import {PRIMARY} from '../../styles/colors';

const Login = () => {
  return (
      <View style={styles.container}>
        <NativeBaseProvider>
          <Box>Hello world</Box>
        </NativeBaseProvider>
      </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY,
  },
});
