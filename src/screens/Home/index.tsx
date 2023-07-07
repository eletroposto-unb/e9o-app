import React, {useContext, useState} from 'react';
import {View, StyleSheet, LogBox} from 'react-native';
import {NativeBaseProvider, Box, Text} from 'native-base';
import {PRIMARY} from '../../styles/colors';
import Profile from './Profile';
import Cars from './Cars';
import {StaggerComponent} from '../../components/Stagger';
import {AuthContext} from '../../context/authProvider';

LogBox.ignoreLogs([
  'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
]);

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
  const {user} = useContext(AuthContext);

  const handleLogin = () => {
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
              marginBottom={3}
              style={styles.text}>
              {action.profile.title}
            </Text>
          </Box>
          <Box style={styles.tabBox(action.cars.status ? 1 : 0)}>
            <Text
              color={PRIMARY}
              bold
              fontSize={18}
              marginBottom={3}
              onPress={handleRegister}
              style={styles.text}>
              {action.cars.title}
            </Text>
          </Box>
        </View>
        {action.profile.status ? <Profile /> : action.cars.status && <Cars />}
      </View>
      <View style={styles.footer}>
        <StaggerComponent user={user} />
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
  footer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flex: 1,
  },
});
