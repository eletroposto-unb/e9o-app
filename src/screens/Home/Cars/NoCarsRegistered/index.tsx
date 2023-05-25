import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Center} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {BACKGROUND} from '../../../../styles/colors';

const NoCarsRegistered = () => {
  return (
    <View marginBottom={10} marginTop={10}>
      <Center>
        <AntDesign name="frowno" size={70} color={BACKGROUND} />
      </Center>
      <Text style={styles.message}>Nenhum carro encontrado</Text>
      <Text>Cadastre seu primeiro veículo agora mesmo!</Text>
    </View>
  );
};

export default NoCarsRegistered;

const styles = StyleSheet.create({
  message: {
    fontSize: 24,
    color: BACKGROUND,
    fontWeight: '500',
    textTransform: 'capitalize',
    paddingTop: 10,
  },
});
