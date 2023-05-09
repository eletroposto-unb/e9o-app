import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {AuthContext} from '../../context/authProvider';

const Profile = () => {
  const {logout} = useContext(AuthContext);

  const handleLogout = () => {
    logout()
  };

  return (
    <View>
      <Text onPress={() => handleLogout(0)}>Profile</Text>
    </View>
  );
};

export default Profile;
