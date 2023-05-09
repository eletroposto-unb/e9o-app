import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {useToast, Button, Box, Text, Alert} from 'native-base';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../../context/authProvider';
import ProfileInput from '../../../components/Input/ProfileInput';
import {BACKGROUND, PRIMARY} from '../../../styles/colors';

const Profile = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<formData>();
  const {logout} = useContext(AuthContext);

  const handleLogout = () => {
    console.log('REALIZA LOGOUT');
    logout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>Nome</Text>
      <Controller
        control={control}
        name="name"
        rules={{
          required: 'Nome Obrigatório',
        }}
        render={({field: {value, onChange}}) => (
          <ProfileInput
            variant="rounded"
            placeHolder="Nome"
            value={value}
            secureTextEntry={false}
            autoCapitalize="words"
            onChangeText={onChange}
          />
        )}
      />
      <Text style={styles.inputLabel}>Email</Text>
      <Controller
        control={control}
        name="name"
        rules={{
          required: 'Nome Obrigatório',
        }}
        render={({field: {value, onChange}}) => (
          <ProfileInput
            variant="rounded"
            placeHolder="Email"
            value={value}
            secureTextEntry={false}
            autoCapitalize="words"
            onChangeText={onChange}
          />
        )}
      />
      <Text style={styles.inputLabel}>CPF</Text>
      <Controller
        control={control}
        name="cpf"
        rules={{
          required: 'CPF Obrigatório',
          pattern: {
            message: 'CPF inválido',
          },
        }}
        render={({field: {value, onChange}}) => (
          <ProfileInput
            variant="rounded"
            placeHolder="CPF"
            value={value}
            secureTextEntry={false}
            autoCapitalize="words"
            onChangeText={onChange}
          />
        )}
      />
      <Text style={styles.inputLabel}>Telefone</Text>
      <Controller
        control={control}
        name="cpf"
        rules={{
          required: 'CPF Obrigatório',
          pattern: {
            message: 'CPF inválido',
          },
        }}
        render={({field: {value, onChange}}) => (
          <ProfileInput
            variant="rounded"
            placeHolder="Telefone"
            value={value}
            secureTextEntry={false}
            autoCapitalize="words"
            onChangeText={onChange}
          />
        )}
      />
    </View>
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
