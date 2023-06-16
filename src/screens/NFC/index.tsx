import {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {BACKGROUND, PRIMARY, SECUNDARY, WHITE} from '../../styles/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {startNFC} from './NFCHelper';

const title = 'Sistema NFC ';
const subTitle =
  'Aproxime seu celular da tag NFC disponível no Toten para dar inicio ao seu carregamento.';
const helperText = 'Aguardando aproximação...';

const NfcReader = () => {
  const [tagInfo, setTagInfo] = useState();

  useEffect(() => {
    handleReadTag();
  }, []);

  const handleReadTag = async () => {
    const tagData = await startNFC();
    console.log('TAG DATA', tagData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.nfcContainer}>
        <Text style={styles.primaryText}>{title}</Text>
        <Text style={styles.secondaryText}>{subTitle}</Text>
        <View style={styles.nfcIconContainer}>
          <MaterialCommunityIcons
            name="cellphone-nfc"
            color={SECUNDARY}
            size={96}
          />
        </View>
        <Text style={styles.helperText}> {helperText}</Text>
      </View>
      <View></View>
    </View>
  );
};

export default NfcReader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
    width: '100%',
  },
  nfcContainer: {
    height: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryText: {
    color: WHITE,
    fontSize: 24,
    fontWeight: 'bold',
  },
  secondaryText: {
    width: '80%',
    textAlign: 'center',
    marginTop: 10,
    color: WHITE,
    fontSize: 14,
    fontWeight: 'bold',
  },
  helperText: {
    width: '80%',
    textAlign: 'center',
    marginTop: 10,
    color: WHITE,
    fontSize: 12,
    fontWeight: 'bold',
  },
  nfcIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  qrCodeContainer: {},
});
