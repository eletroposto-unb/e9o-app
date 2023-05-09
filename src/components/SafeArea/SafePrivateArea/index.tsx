import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { PRIMARY } from '../../../styles/colors';

const SafePrivateArea = ({children}: any) => {
  return <SafeAreaView style={styles.container}  edges={['right', 'left', 'top']}>{children}</SafeAreaView>;
};

export default SafePrivateArea;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY,
  },
});
