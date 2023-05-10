import React, {useContext} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {AuthContext} from '../../../context/authProvider';
import {Stack, Icon, Pressable, Button, Text} from 'native-base';
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
  const [show, setShow] = React.useState(false);
  const {login} = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<formData>();

  const onSubmit = (data: formData) => {
    login();
    console.log('data', data);
  };

  const handleForgotPassword = () => {
    console.log('dataaaaaaa');
    login();
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
        title="ENTRAR"
        backgroundColor={SECUNDARY}
        color={PRIMARY}
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
});

export default Login;
