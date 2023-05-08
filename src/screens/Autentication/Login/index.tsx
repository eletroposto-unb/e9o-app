import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Stack, Icon, Pressable, Button, Text} from 'native-base';
import {BACKGROUND, PRIMARY, SECUNDARY} from '../../../styles/colors';
import InputForm from '../../../components/Input';
import {Controller, useForm} from 'react-hook-form';

type formData = {
  email: string;
  password: string;
};

const Login = () => {
  const [show, setShow] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<formData>();

  const onSubmit = (data: formData) => {
    console.log('data', data);
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
              variant={'rounded'}
              type={show ? 'text' : 'password'}
              placeHolder="Senha"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              inputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <Icon
                    as={<Icon name={show ? 'eye' : 'eye-with-line'} />}
                    size={5}
                    mr="2"
                    color="muted.400"
                    backgroundColor={BACKGROUND}
                  />
                </Pressable>
              }
            />
          )}
        />
      </Stack>
      <Button
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        variant={BACKGROUND}>
        <Text style={styles.text}>ENTRAR</Text>
      </Button>
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
});

export default Login;
