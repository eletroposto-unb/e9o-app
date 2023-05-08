import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Button} from 'native-base';
import InputForm from '../../../components/Input';
import {BACKGROUND, SECUNDARY, WARNING} from '../../../styles/colors';
import { emailRegex } from '../../../utils/regex';

type formData = {
  name: string;
  email: string;
  cpf: string;
  password: string;
  confirm_password: string;
};

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<formData>();

  const onSubmit = (data: formData) => {
    console.log(data);
  };

  const handleForgotPassword = () => {
    console.log('handleForgotPassword');
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
          <InputForm
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
        }}
        render={({field: {value, onChange}}) => (
          <InputForm
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
          required: 'Senha Obrigatória',
        }}
        render={({field: {value, onChange}}) => (
          <InputForm
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
          required: 'Confirmação de Senha Obrigatória',
        }}
        render={({field: {value, onChange}}) => (
          <InputForm
            variant="rounded"
            placeHolder="Confirmar senha"
            value={value}
            secureTextEntry={true}
            onChangeText={onChange}
          />
        )}
      />
      {errors?.confirm_password && (
        <Text style={styles.messageError}>{errors.confirm_password.message}</Text>
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
