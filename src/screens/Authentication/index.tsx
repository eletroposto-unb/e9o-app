import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {NativeBaseProvider, Box, Text} from 'native-base';
import {PRIMARY, SECUNDARY, WHITE} from '../../styles/colors';
import Login from './Login';
import Register from './Register';

const Authentication = () => {
  const [action, setAction] = useState({
    login: {
      title: 'LOGIN',
      status: true,
    },
    register: {
      title: 'REGISTRAR',
      status: false,
    },
  });

  const handleLogin = (value: number) => {
    setAction({
      login: {
        title: 'LOGIN',
        status: true,
      },
      register: {
        title: 'REGISTRAR',
        status: false,
      },
    });
  };

  const handleRegister = () => {
    setAction({
      login: {
        title: 'LOGIN',
        status: false,
      },
      register: {
        title: 'REGISTRAR',
        status: true,
      },
    });
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <View style={styles.containerTicketTypes}>
          <Box style={styles.tabBox(action.login.status ? 1 : 0)}>
            <Text
              color={action.login.status ? SECUNDARY : WHITE}
              bold
              fontSize={18}
              onPress={handleLogin}>
              {action.login.title}
            </Text>
          </Box>
          <Box style={styles.tabBox(action.register.status ? 1 : 0)}>
            <Text
              color={action.register.status ? SECUNDARY : WHITE}
              bold
              fontSize={18}
              onPress={handleRegister}>
              {action.register.title}
            </Text>
          </Box>
        </View>
        {action.login.status ? (
          <Login />
        ) : (
          action.register.status && <Register />
        )}
      </View>
    </NativeBaseProvider>
  );
};

export default Authentication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY,
    paddingHorizontal: 20,
  },
  containerTicketTypes: {
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabBox: type => ({
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    borderBottomColor: SECUNDARY,
    borderBottomWidth: type === 1 ? 1 : 0,
  }),
});
