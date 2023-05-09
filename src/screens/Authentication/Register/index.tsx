import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useToast, Button, Box, Text, Alert} from 'native-base';
import AuthInput from '../../../components/Input/AuthInput';
import {BACKGROUND, SECUNDARY, WARNING} from '../../../styles/colors';
import {
  emailRegex,
  cpfRegex,
  nameRegex,
  passwordRegex,
} from '../../../utils/regex';

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
    console.log('data', data);

    if (data.password === data.confirm_password) {
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
              As senhas digitadas não coincidem!
            </Box>
          );
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="name"
        rules={{
          required: 'Nome Obrigatório',
        }}
        render={({field: {value, onChange}}) => (
          <AuthInput
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
          <AuthInput
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
          <AuthInput
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
          <AuthInput
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
          <AuthInput
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
      <Button
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        variant={BACKGROUND}>
        REGISTRAR
      </Button>
    </View>
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
  },
});
