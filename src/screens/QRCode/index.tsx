import React from 'react';
import {View, StyleSheet} from 'react-native';
import QrcodeStep from './Steps/QrCodeStep';

const QrCodeReader = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <QrcodeStep />
    </View>
  );
};

export default QrCodeReader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
