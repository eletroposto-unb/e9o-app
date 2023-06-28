/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable radix */
import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  Icon,
  Center,
  useToast,
  Box,
  Alert,
  HStack,
  Fab,
  Modal,
  Button,
} from 'native-base';
import {AuthContext} from '../../../context/authProvider';
import InputForm from '../../../components/Input';
import StyledButton from '../../../components/Button';
import {
  BACKGROUND,
  ERROR,
  PRIMARY,
  SECUNDARY,
  WHITE,
} from '../../../styles/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import {getUser, storeUser} from '../../../context/asyncStorage';
import {updateUser} from '../../../services/user/user.service';
import {Controller, useForm} from 'react-hook-form';
import {
  getCredits,
  requestCredits,
} from '../../../services/wallet/wallet.service';

const Profile = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const {logout, user, setUser} = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [coins, setCoins] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingCoins, setLoadingCoins] = useState(false);
  const [telephone, setTelephone] = useState('');
  const [showModal, setShowModal] = useState(false);

  const form = useForm<formCarData>();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = form;

  useEffect(() => {
    handleUserData();
    handleCoins();
  }, [user && user, coins]);

  const handleLogout = () => {
    console.log('REALIZA LOGOUT');
    logout();
  };

  const handleCoins = async () => {
    const response = await getCredits(userData?.cpf);

    setCoins(response?.value?.qtdCreditos);
  };

  const handleUserData = async () => {
    setLoading(true);
    let currentUser;
    if (!user) {
      currentUser = await getUser();
      setUserData(currentUser);
      setTelephone(currentUser?.telefone && currentUser.telefone);
    } else {
      setUserData(user);
    }
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
      telefone: telephone,
      status: userData?.status,
    };
    const userUpdated = await updateUser(payload, payload.cpf);
    if (userUpdated?.value?.cpf) {
      await storeUser(userUpdated?.value);
      setUser(userUpdated && userUpdated?.value);
      toast.show({
        render: () => {
          return (
            <Box
              bg={'error.100'}
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
              bg={'error.300'}
              px="3"
              py="2"
              rounded="sm"
              mb={5}
              style={styles.toastMessage}>
              <Alert.Icon style={{marginRight: 10}} />
              Erro ao atualizar usuário, tente novamente!
            </Box>
          );
        },
      });
    }
    setLoading(false);
  };

  const handleRequestCoins = async (data: {coins: number}) => {
    setLoadingCoins(true);

    const payload = {
      qtdCreditosSolicitados: data.coins,
    };

    const response = await requestCredits(userData?.cpf, payload);

    if (response?.type === 'success') {
      setShowModal(false);
      toast.show({
        render: () => {
          return (
            <Box
              bg={'success.300'}
              px="3"
              py="2"
              rounded="sm"
              mb={5}
              style={styles.toastMessage}>
              <Text>Solicitação realizada com sucesso!</Text>
            </Box>
          );
        },
      });
    } else {
      setShowModal(false);
      toast.show({
        render: () => {
          return (
            <Box
              bg={'error.300'}
              px="3"
              py="2"
              rounded="sm"
              mb={5}
              style={styles.toastMessage}>
              <Alert.Icon style={{marginRight: 10}} />
              Erro ao solicitar moedas, tente novamente!
            </Box>
          );
        },
      });
    }

    setLoadingCoins(false);
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
          autoCapitalize="words"
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
          defaultValue={userData?.telefone}
          backgroundColor={WHITE}
          borderWidth={1}
          borderColor={BACKGROUND}
          color={BACKGROUND}
          variant="rounded"
          placeHolder="61 900000000"
          secureTextEntry={false}
          onChangeText={value => setTelephone(value)}
        />
        {!userData?.telefone && (
          <View style={styles.infoContainer}>
            <Alert maxW="400" status="warning" marginBottom={2} padding={1}>
              <HStack
                flexShrink={1}
                space={2}
                alignItems="center"
                justifyContent="space-between">
                <HStack flexShrink={1} space={2} alignItems="center">
                  <Alert.Icon />
                  <Text
                    fontSize="md"
                    fontWeight="medium"
                    _dark={{
                      color: 'coolGray.800',
                    }}>
                    Adicione seu numero de contato.
                  </Text>
                </HStack>
              </HStack>
            </Alert>
          </View>
        )}
        <View style={styles.moedas}>
          <View style={{width: '50%'}}>
            <Text style={styles.inputLabel}>Moedas</Text>
            <InputForm
              defaultValue={coins?.toString()}
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
            onPress={() => setShowModal(true)}
          />
        </View>
        <StyledButton
          loading={loading}
          loadingColor={SECUNDARY}
          title="SALVAR"
          backgroundColor={PRIMARY}
          color={WHITE}
          onPress={handleUpdateUser}
        />
        <View
          style={{
            paddingTop: 30,
          }}>
          <Center>
            <Text style={styles.sair} onPress={handleLogout}>
              SAIR
            </Text>
          </Center>
        </View>
        <View style={styles.footer}>
          <Fab
            renderInPortal={true}
            shadow={9}
            size="sm"
            backgroundColor={PRIMARY}
            onPress={() =>
              navigation.navigate('Help', {navigation: navigation})
            }
            icon={<Icon color="white" as={Entypo} name="help" size="lg" />}
          />
        </View>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content minWidth="80%">
            <Modal.CloseButton />
            <Modal.Header>Solicitar moedas</Modal.Header>
            <Modal.Body gap={2} paddingBottom={10} paddingTop={10}>
              <Text style={styles.inputLabel}>Quantidade de moedas</Text>
              <Controller
                control={control}
                name="coins"
                rules={{
                  required: true,
                  validate: {
                    positiveNumber: value =>
                      parseInt(value) > 0 || 'Quantidade de moedas inválida',
                  },
                }}
                render={({field: {value, onChange}}) => (
                  <InputForm
                    backgroundColor={WHITE}
                    borderWidth={1}
                    borderColor={BACKGROUND}
                    color={BACKGROUND}
                    variant="rounded"
                    placeHolder="100"
                    secureTextEntry={false}
                    value={value}
                    onChangeText={onChange}
                    keyboardType="numeric"
                  />
                )}
              />
              <Button.Group justifyContent="center">
                <StyledButton
                  borderRadius={30}
                  title="SOLICITAR"
                  backgroundColor={SECUNDARY}
                  color={PRIMARY}
                  width={'80%'}
                  onPress={handleSubmit(handleRequestCoins)}
                  loading={loadingCoins}
                />
              </Button.Group>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </View>
    </ScrollView>
  );
  // }
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
  infoContainer: {
    width: '100%',
  },
  footer: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    textAlign: 'center',
  },
});
