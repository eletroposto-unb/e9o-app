import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useToast, Box, Text, Alert, HStack, VStack, Center} from 'native-base';
import {useForm, Controller} from 'react-hook-form';
import {AuthContext} from '../../../context/authProvider';
import {createUser} from '../../../services/user/user.service';
import InputForm from '../../../components/Input';
import StyledButton from '../../../components/Button';
import SpinnerLoading from '../../../components/SpinnerLoading';
import {formatPayload} from '../../../utils/formatName';
import {
  BACKGROUND,
  SECUNDARY,
  WARNING,
  PRIMARY,
  WHITE,
} from '../../../styles/colors';
import {emailRegex, cpfRegex, passwordRegex} from '../../../utils/regex';
import {ScrollView} from 'react-native-gesture-handler';

const Register = () => {
  const toast = useToast();
  const {register} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<formData>();

  const verifyPasswords = (password: string, confirm_password: string) => {
    if (password === confirm_password) return true;
    else return false;
  };

  const onSubmit = async (data: formData) => {
    setLoading(true);
    if (verifyPasswords(data.password, data.confirm_password)) {
      const firebaseUser = await register(data.email, data.password);
      const payload = formatPayload(data);
      if (firebaseUser?.user?.uid) {
        const userCreated = await createUser(payload, firebaseUser.user.uid);
        if (userCreated.value) {
          console.log('userCreated', userCreated);
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
                  <Text>Usuário cadastrado com sucesso!</Text>
                </Box>
              );
            },
          });
        }
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
                Usuário já existe! Tente novamente com outro email.
              </Box>
            );
          },
        });
      }
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
              As senhas não coincidem! Tente novamente.
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
        <Controller
          control={control}
          name="name"
          rules={{
            required: 'Nome Obrigatório',
          }}
          render={({field: {value, onChange}}) => (
            <InputForm
              backgroundColor={BACKGROUND}
              color={WHITE}
              borderWidth={0}
              variant="rounded"
              placeHolder="Nome"
              value={value}
              secureTextEntry={false}
              autoCapitalize="words"
              onChangeText={onChange}
            />
          )}
        />
        {errors?.name && (
          <Text style={styles.messageError}>{errors.name.message}</Text>
        )}
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Email Obrigatório',
            pattern: {
              message: 'Email inválido',
              value: emailRegex,
            },
          }}
          render={({field: {value, onChange}}) => (
            <InputForm
              backgroundColor={BACKGROUND}
              color={WHITE}
              borderWidth={0}
              variant="rounded"
              placeHolder="Email"
              value={value}
              secureTextEntry={false}
              autoCapitalize="none"
              onChangeText={onChange}
            />
          )}
        />
        {errors?.email && (
          <Text style={styles.messageError}>{errors.email.message}</Text>
        )}
        <Controller
          control={control}
          name="cpf"
          rules={{
            required: 'CPF Obrigatório',
            pattern: {
              message: 'CPF inválido',
              value: cpfRegex,
            },
          }}
          render={({field: {value, onChange}}) => (
            <InputForm
              backgroundColor={BACKGROUND}
              color={WHITE}
              borderWidth={0}
              variant="rounded"
              placeHolder="CPF"
              value={value}
              secureTextEntry={false}
              autoCapitalize="words"
              onChangeText={onChange}
            />
          )}
        />
        {errors?.cpf && (
          <Text style={styles.messageError}>{errors.cpf.message}</Text>
        )}
        <Controller
          control={control}
          name="password"
          rules={{
            required: 'Senha obrigatória',
            pattern: {
              message: 'Senha inválida',
              value: passwordRegex,
            },
          }}
          render={({field: {value, onChange}}) => (
            <InputForm
              backgroundColor={BACKGROUND}
              color={WHITE}
              borderWidth={0}
              variant="rounded"
              placeHolder="Senha"
              value={value}
              secureTextEntry={true}
              onChangeText={onChange}
            />
          )}
        />
        {errors?.password && (
          <Text style={styles.messageError}>{errors.password.message}</Text>
        )}
        <Controller
          control={control}
          name="confirm_password"
          rules={{
            required: 'Confirmação de senha obrigatória',
          }}
          render={({field: {value, onChange}}) => (
            <InputForm
              backgroundColor={BACKGROUND}
              color={WHITE}
              borderWidth={0}
              variant="rounded"
              placeHolder="Confirmar senha"
              value={value}
              secureTextEntry={true}
              onChangeText={onChange}
            />
          )}
        />
        {errors?.confirm_password && (
          <Text style={styles.messageError}>
            {errors.confirm_password.message}
          </Text>
        )}
        <StyledButton
          onPress={handleSubmit(onSubmit)}
          title="REGISTRAR"
          backgroundColor={SECUNDARY}
          color={PRIMARY}
        />
        {errors.password && (
          <View style={styles.infoContainer}>
            <Alert maxW="400" status="error">
              <VStack space={1} flexShrink={1} w="100%">
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
                      A senha deve conter
                    </Text>
                  </HStack>
                </HStack>
                <Box
                  pl="6"
                  _dark={{
                    _text: {
                      color: 'coolGray.400',
                    },
                  }}>
                  <Text>Pelo menos uma letra minúscula;</Text>
                  <Text>Pelo menos uma letra maiúscula;</Text>
                  <Text>Pelo menos um número;</Text>
                  <Text>Pelo menos um careactere especial;</Text>
                  <Text>No mínimo 6 caracteres.</Text>
                </Box>
              </VStack>
            </Alert>
          </View>
        )}
      </View>
      <Center>
        <Text
          style={styles.privacyPolicy}
          onPress={() =>
            console.log(
              'DEVE REDIRECIONAR PARA PÁGINA DE POLÍTICA DE PRIVACIDADE',
            )
          }>
          Política de privacidade
        </Text>
      </Center>
      {loading && <SpinnerLoading color={SECUNDARY} />}
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    marginTop: 50,
  },
  toastMessage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageError: {
    display: 'flex',
    width: '100%',
    marginLeft: 20,
    color: WARNING,
    textAlign: 'left',
    marginBottom: 7,
  },
  forgotPassword: {
    width: '100%',
    marginLeft: 20,
    color: WARNING,
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: SECUNDARY,
    width: '100%',
    borderRadius: 15,
    marginTop: 30,
    height: 55,
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    color: PRIMARY,
  },
  infoContainer: {
    marginTop: 15,
    width: '100%',
  },
  privacyPolicy: {
    color: SECUNDARY,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 0,
  },
});
