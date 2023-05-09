import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { PRIMARY } from '../../styles/colors';

const SafeAreaPrivateLayout = ({children}: any) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

export default SafeAreaPrivateLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY,
    paddingHorizontal: 20
  },
});
