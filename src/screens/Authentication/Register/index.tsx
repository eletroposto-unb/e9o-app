import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useToast, Box, Text, Alert, HStack, VStack} from 'native-base';
import auth from '@react-native-firebase/auth';
import {useForm, Controller} from 'react-hook-form';
import InputForm from '../../../components/Input';
import StyledButton from '../../../components/Button';
import {
  BACKGROUND,
  SECUNDARY,
  WARNING,
  PRIMARY,
  WHITE,
} from '../../../styles/colors';
import {emailRegex, cpfRegex, passwordRegex} from '../../../utils/regex';
import {ScrollView} from 'react-native-gesture-handler';

type formData = {
  name: string;
  email: string;
  cpf: string;
  password: string;
  confirm_password: string;
};

const Register = () => {
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<formData>();

  const onSubmit = (data: formData) => {
    console.log('dataAAAAA', data);

    if (data.password === data.confirm_password) {
      auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(userData => {
          console.log(userData); // chama endpoint de cadastrar no banco de dados
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
                  Usuário cadastrado com sucesso!
                </Box>
              );
            },
          });
          console.log('Usuário Logado!');
        })
        .catch(() => {
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
                  Usuário não cadastrado! Tente novamente.
                </Box>
              );
            },
          });
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
              As senhas não coincidem! Tente novamente.
            </Box>
          );
        },
      });
    }
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
    marginBottom: 50,
  },
});
