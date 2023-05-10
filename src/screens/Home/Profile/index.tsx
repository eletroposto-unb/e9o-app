import React, {useContext} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Button, Text, Alert, Stack, Icon, Pressable} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../../context/authProvider';
import InputForm from '../../../components/Input';
import StyledButton from '../../../components/Button';
import {BACKGROUND, PRIMARY, SECUNDARY, WHITE} from '../../../styles/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

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
        <InputForm
          readOnly={true}
          backgroundColor={WHITE}
          borderWidth={1}
          borderColor={BACKGROUND}
          color={BACKGROUND}
          variant="rounded"
          placeHolder="Nome"
          secureTextEntry={false}
        />
        <Text style={styles.inputLabel}>Email</Text>
        <InputForm
          readOnly={true}
          backgroundColor={WHITE}
          borderWidth={1}
          borderColor={BACKGROUND}
          color={BACKGROUND}
          variant="rounded"
          placeHolder="Email"
          secureTextEntry={false}
          autoCapitalize="words"
        />
        <Text style={styles.inputLabel}>CPF</Text>
        <InputForm
          readOnly={true}
          backgroundColor={WHITE}
          borderWidth={1}
          borderColor={BACKGROUND}
          color={BACKGROUND}
          variant="rounded"
          placeHolder="CPF"
          secureTextEntry={false}
        />
        <Text style={styles.inputLabel}>Telefone</Text>
        <InputForm
          backgroundColor={WHITE}
          borderWidth={1}
          borderColor={BACKGROUND}
          color={BACKGROUND}
          variant="rounded"
          placeHolder="Telefone"
          secureTextEntry={false}
        />
        <Text style={styles.inputLabel}>Moedas</Text>
        <InputForm
          readOnly={true}
          backgroundColor={WHITE}
          borderWidth={1}
          borderColor={BACKGROUND}
          color={BACKGROUND}
          width={'50%'}
          variant="rounded"
          placeHolder="Moedas"
          secureTextEntry={false}
          inputRightElement={
            <Icon
              as={<FontAwesome5 name="coins" />}
              size={6}
              mr="4"
              color="muted.400"
            />
          }
        />
        <StyledButton
          title="SOLICITAR MOEDAS"
          backgroundColor={SECUNDARY}
          color={PRIMARY}
        />
        <StyledButton title="SALVAR" backgroundColor={PRIMARY} color={WHITE} />
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
