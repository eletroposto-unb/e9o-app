import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

type Props = {
  onNextStep: () => void;
};

const QrCodeLanding = ({onNextStep}: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onNextStep} style={styles.button}>
        <Text style={styles.buttonText}>Ler QR Code</Text>
      </TouchableOpacity>
    </View>
  );
};

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

export default QrCodeLanding;
