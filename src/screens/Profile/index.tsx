import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {AuthContext} from '../../context/authProvider';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();
  const {logout} = useContext(AuthContext);

  const handleLogout = () => {
    console.log('REALIZA LOGOUT');
    logout();
  };

  return (
    <View>
      <Text >PERFIL</Text>
      <Button title="logout" onPress={handleLogout}/>
    </View>
  );
};

export default Profile;
