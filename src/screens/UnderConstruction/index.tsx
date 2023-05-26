import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {BACKGROUND, SECUNDARY, WHITE, PRIMARY} from '../../styles/colors';

const UnderConstruction = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/under_construction_2.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Tela em construção</Text>
      <Text style={styles.content}>
        Agradecemos sua paciência e compreensão. Estamos ansiosos para
        surpreendê-lo em breve com a versão final deste aplicativo!
      </Text>
    </View>
  );
};

export default UnderConstruction;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: BACKGROUND,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '50%',
    height: '35%',
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: SECUNDARY,
  },
  content: {
    paddingHorizontal: 30,
    textAlign: 'center',
    color: WHITE,
  },
});
