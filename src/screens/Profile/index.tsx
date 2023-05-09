import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {AuthContext} from '../../context/authProvider';
import {useNavigation} from '@react-navigation/native';
import SafeAreaWrapper from '../../components/SafeArea';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomBar from '../Homepage/BottomBar';

const Profile = () => {
  const navigation = useNavigation();
  const {logout} = useContext(AuthContext);

  const handleLogout = () => {
    console.log('REALIZA LOGOUT');
    logout();
  };

  return (
      <View>
        <Text onPress={handleLogout}>PERFIL</Text>
        <Button title="logout" onPress={handleLogout} />
        {/* <BottomBar/> */}
      </View>
  );
};

export default Profile;
