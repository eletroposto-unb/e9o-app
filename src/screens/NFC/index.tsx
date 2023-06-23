import {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {BACKGROUND, SECUNDARY, WHITE} from '../../styles/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {startNFC} from './NFCHelper';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';

const title = 'Sistema NFC ';
const subTitle =
  'Aproxime seu celular da tag NFC disponível no Toten para dar inicio ao seu carregamento.';
const helperText = 'Aguardando aproximação...';
const tagHelperText = 'Caso a leitura não tenha iniciado, clique aqui.';

const NfcReader = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [tagInfo, setTagInfo] = useState();

  useEffect(() => {
    handleReadTag();
  }, []);

  async function redirectToStation(tagData: any) {
    try {
      if (tagData.message.idPosto) {
        navigation.navigate('ChargeForm', {
          posto: tagData.message as station,
          teste: 'teste',
        });
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  const handleReadTag = async () => {
    const tagData = await startNFC();
    await redirectToStation(tagData);
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
        <Text style={styles.helperText}>
          Caso a leitura não tenha iniciado,{' '}
          <Text style={styles.tagHelperText} onPress={handleReadTag}>
            CLIQUE AQUI
          </Text>{' '}
          .
        </Text>
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
  tagHelperText: {
    width: '80%',
    textAlign: 'center',
    marginTop: 10,
    color: SECUNDARY,
    fontSize: 16,
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
