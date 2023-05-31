import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Accordion from '../../components/Accordion';
import {BACKGROUND, WHITE} from '../../styles/colors';

const Help = props => {
  return (
    <View style={styles.container}>
      <View style={styles.goBack}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Ionicons name="ios-return-up-back-outline" size={35} color={WHITE} />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Perguntas frequentes</Text>
      </View>
      <View style={styles.content}>
        <Image
          source={require('../../assets/support.webp')}
          style={styles.image}
        />
      </View>

      <Accordion />
    </View>
  );
};

export default Help;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 15,
    backgroundColor: BACKGROUND,
  },
  goBack: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    textAlign: 'center',
    alignItems: 'center',
  },
  goBackText: {
    color: WHITE,
    marginLeft: 5,
    fontSize: 16,
    fontWeight: '500',
  },
  header: {
    width: '100%',
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: 24,
    color: WHITE,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    height: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 180,
    alignItems: 'center',
  },
});
