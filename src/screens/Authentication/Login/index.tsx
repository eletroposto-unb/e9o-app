/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {AuthContext} from '../../../context/authProvider';
import {Stack, Icon, Pressable, Text, Box, useToast, Alert} from 'native-base';
import {BACKGROUND, PRIMARY, SECUNDARY, WHITE} from '../../../styles/colors';
import InputForm from '../../../components/Input';
import {Controller, useForm} from 'react-hook-form';
import Entypo from 'react-native-vector-icons/Entypo';
import StyledButton from '../../../components/Button';

type formData = {
  email: string;
  password: string;
};

const Login = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const {login} = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<formData>();
  const toast = useToast();

  const onSubmit = async (data: formData) => {
    setLoading(true);
    login(data.email, data.password).catch(() => {
      console.log('error');
      setLoading(false);
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
              E-mail ou senha incorretos!
            </Box>
          );
        },
      });
    });
  };

  const handleForgotPassword = () => {
    console.log('handleForgotPassword');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/charging-station.png')}
        style={styles.image}
      />
      <Stack w="100%" alignItems="center">
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Insira seu email',
          }}
          render={({field: {value, onChange}}) => (
            <InputForm
              placeHolder="Email"
              backgroundColor={BACKGROUND}
              color={WHITE}
              borderWidth={0}
              variant={'rounded'}
              value={value}
              autoCapitalize="none"
              onChangeText={onChange}
            />
          )}
        />
        {/* {errors?.email && (
          <Text style={styles.messageError}>{errors.name.message}</Text>
        )} */}
        <Controller
          control={control}
          name="password"
          rules={{
            required: 'Insira sua senha',
          }}
          render={({field: {value, onChange}}) => (
            <InputForm
              backgroundColor={BACKGROUND}
              color={WHITE}
              borderWidth={0}
              variant={'rounded'}
              type={show ? 'text' : 'password'}
              placeHolder="Senha"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              inputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <Icon
                    as={<Entypo name={show ? 'eye' : 'eye-with-line'} />}
                    size={6}
                    mr="4"
                    color="muted.400"
                  />
                </Pressable>
              }
            />
          )}
        />
      </Stack>
      <StyledButton
        onPress={handleSubmit(onSubmit)}
        backgroundColor={SECUNDARY}
        color={PRIMARY}
        loading={loading}
        title="ENTRAR"
      />
      <Text style={styles.forgotPassword}>
        Esqueceu sua senha?{' '}
        <Text style={{fontWeight: 'bold'}} onPress={handleForgotPassword}>
          Clique aqui!
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    marginTop: 50,
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
  image: {
    width: 140,
    alignItems: 'center',
    marginBottom: 70,
    marginLeft: 20,
    marginTop: 20,
  },
  forgotPassword: {
    marginTop: 15,
    color: SECUNDARY,
  },
  toastMessage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Login;
