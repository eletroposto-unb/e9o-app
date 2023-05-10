import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {NativeBaseProvider, Box, Text} from 'native-base';
import {PRIMARY, SECUNDARY, WHITE} from '../../styles/colors';
import Profile from './Profile';
import Cars from './Cars';

const Home = () => {
  const [action, setAction] = useState({
    profile: {
      title: 'PERFIL',
      status: true,
    },
    cars: {
      title: 'CARROS',
      status: false,
    },
  });

  const handleLogin = (value: number) => {
    setAction({
      profile: {
        title: 'PERFIL',
        status: true,
      },
      cars: {
        title: 'CARROS',
        status: false,
      },
    });
  };

  const handleRegister = () => {
    setAction({
      profile: {
        title: 'PERFIL',
        status: false,
      },
      cars: {
        title: 'CARROS',
        status: true,
      },
    });
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <View style={styles.containerTicketTypes}>
          <Box style={styles.tabBox(action.profile.status ? 1 : 0)}>
            <Text
              color={PRIMARY}
              bold
              fontSize={18}
              onPress={handleLogin}
              style={styles.text}>
              {action.profile.title}
            </Text>
          </Box>
          <Box style={styles.tabBox(action.cars.status ? 1 : 0)}>
            <Text
              color={PRIMARY}
              bold
              fontSize={18}
              onPress={handleRegister}
              style={styles.text}>
              {action.cars.title}
            </Text>
          </Box>
        </View>
        {action.profile.status ? <Profile /> : action.cars.status && <Cars />}
      </View>
    </NativeBaseProvider>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderBottomColor: PRIMARY,
    borderBottomWidth: type === 1 ? 1 : 0,
  }),
  text: {
    marginBottom: 3,
  },
});
