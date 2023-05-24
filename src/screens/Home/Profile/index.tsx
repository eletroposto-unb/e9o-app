import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text, Icon, Center, useToast, Box, Alert} from 'native-base';
import {AuthContext} from '../../../context/authProvider';
import InputForm from '../../../components/Input';
import StyledButton from '../../../components/Button';
import {BACKGROUND, PRIMARY, SECUNDARY, WHITE} from '../../../styles/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {getUser} from '../../../context/asyncStorage';
import {updateUser} from '../../../services/user/user.service';
import SpinnerLoading from '../../../components/SpinnerLoading';

const Profile = () => {
  const toast = useToast();
  const {logout, user} = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const [telefone, setTelefone] = useState('');

  useEffect(() => {
    handleUserData();
  }, [user]);

  const handleLogout = () => {
    console.log('REALIZA LOGOUT');
    logout();
  };

  const handleUserData = async () => {
    setLoading(true);
    let currentUser;
    if (!user) {
      currentUser = await getUser();
      setUserData(currentUser);
    } else setUserData(user);
    setLoading(false);
  };

  const handleUpdateUser = async () => {
    setLoading(true);
    const payload = {
      name: userData?.name,
      surname: userData?.surname,
      email: userData?.email,
      cpf: userData?.cpf,
      is_admin: userData?.is_admin,
      telefone: telefone,
      status: userData.status,
    };
    const userUpdated = await updateUser(payload, payload.cpf);
    if (userUpdated) {
      toast.show({
        render: () => {
          return (
            <Box
              bg={`error.100`}
              px="3"
              py="2"
              rounded="sm"
              mb={5}
              style={styles.toastMessage}>
              <Text>Usuário atualizado com sucesso!</Text>
            </Box>
          );
        },
      });
    } else {
      toast.show({
        render: () => {
          return (
            <Box
              bg={`error.300`}
              px="3"
              py="2"
              rounded="sm"
              mb={5}
              style={styles.toastMessage}>
              <Alert.Icon style={{marginRight: 10}} />
              Erro ao atualizar usuário, tente novamente!.
            </Box>
          );
        },
      });
    }
    setLoading(false);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.inputLabel}>Nome</Text>
        <InputForm
          readOnly={true}
          defaultValue={userData?.name + ' ' + userData?.surname}
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
          defaultValue={userData?.email}
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
          defaultValue={userData?.cpf}
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
          value={telefone}
          borderColor={BACKGROUND}
          color={BACKGROUND}
          variant="rounded"
          placeHolder="Telefone"
          secureTextEntry={false}
          onChangeText={value => setTelefone(value)}
        />
        <View style={styles.moedas}>
          <View style={{width: '50%'}}>
            <Text style={styles.inputLabel}>Moedas</Text>
            <InputForm
              readOnly={true}
              backgroundColor={WHITE}
              borderWidth={1}
              borderColor={BACKGROUND}
              color={BACKGROUND}
              width={'100%'}
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
          </View>
          <StyledButton
            borderRadius={30}
            title="SOLICITAR"
            backgroundColor={SECUNDARY}
            color={PRIMARY}
            width={'45%'}
          />
        </View>
        <StyledButton
          title="SALVAR"
          backgroundColor={PRIMARY}
          color={WHITE}
          onPress={handleUpdateUser}
        />
      </View>
      <Center>
        <Text style={styles.sair} onPress={handleLogout}>
          SAIR
        </Text>
      </Center>
      {loading && (
        <View style={styles.loadingContainer}>
          <Center>
            <SpinnerLoading color={PRIMARY} />
          </Center>
        </View>
      )}
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    marginTop: 20,
  },
  inputLabel: {
    marginLeft: 5,
    marginBottom: 3,
    color: BACKGROUND,
    fontSize: 16,
    fontWeight: '600',
  },
  moedas: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sairContainer: {
    borderBottomWidth: 1,
    width: '30%',
  },
  sair: {
    color: BACKGROUND,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -15,
  },
  loadingContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
  },
  toastMessage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
