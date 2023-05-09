import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { PRIMARY } from '../../styles/colors';

const SafeAreaWrapper = ({children}: any) => {
  return <SafeAreaView style={styles.container} edges={['top']}>{children}</SafeAreaView>;
};

export default SafeAreaWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY,
  },
});
