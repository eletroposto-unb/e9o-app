import React, {useContext} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Button, Text, Alert} from 'native-base';
import {useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../../context/authProvider';
import ProfileInput from '../../../components/Input/ProfileInput';
import StyledButton from '../../../components/Button';
import {BACKGROUND, PRIMARY, SECUNDARY} from '../../../styles/colors';

const Profile = () => {
  const navigation = useNavigation();
  const {logout} = useContext(AuthContext);

  const handleLogout = () => {
    console.log('REALIZA LOGOUT');
    logout();
  };

  const handleCoins = () => {};

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.inputLabel}>Nome</Text>
        <ProfileInput
          readOnly={true}
          variant="rounded"
          placeHolder="Nome"
          secureTextEntry={false}
        />
        <Text style={styles.inputLabel}>Email</Text>
        <ProfileInput
          readOnly={true}
          variant="rounded"
          placeHolder="Email"
          secureTextEntry={false}
          autoCapitalize="words"
        />
        <Text style={styles.inputLabel}>CPF</Text>
        <ProfileInput
          readOnly={true}
          variant="rounded"
          placeHolder="CPF"
          secureTextEntry={false}
        />
        <Text style={styles.inputLabel}>Telefone</Text>
        <ProfileInput
          variant="rounded"
          placeHolder="Telefone"
          secureTextEntry={false}
        />
        <Text style={styles.inputLabel}>Moedas</Text>
        <ProfileInput
          width={'50%'}
          variant="rounded"
          placeHolder="Moedas"
          secureTextEntry={false}
        />
        <StyledButton
          title="SOLICITAR MOEDAS"
          backgroundColor={SECUNDARY}
          color={PRIMARY}
        />
        <StyledButton
          title="SALVAR"
          backgroundColor={PRIMARY}
          color={SECUNDARY}
        />
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    marginTop: 10,
  },
  inputLabel: {
    marginLeft: 5,
    marginBottom: 3,
    color: BACKGROUND,
    fontSize: 16,
    fontWeight: '600',
  },
});
