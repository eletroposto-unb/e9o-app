import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';
import {Alert} from 'react-native';

const isNFCSupported = async () => NfcManager.isSupported();

const startNFCManager = async () =>
  NfcManager.start()
    .then(result => ({
      Success: `Sucesso ${result}`,
    }))
    .catch(error => ({Error: error}));

const handleRead = async () => {
  try {
    return await readNdef();
  } catch (error) {
    Alert.alert(error);
  }
};

const readNdef = async () => {
  try {
    await NfcManager.requestTechnology(NfcTech.Ndef);
    const tagEvent = await NfcManager.getTag();
    const tag = tagEvent;
    tag.id = tagEvent.id;
    tag.tech = tagEvent.tech;
    if (tagEvent.ndefMessage[0]) {
      tag.message = Ndef.text.decodePayload(tagEvent.ndefMessage[0].payload);
      if (tag.message) tag.message = JSON.parse(tag.message);
      else tag.message = null;
    }
    return tag;
  } catch (error) {
    Alert.alert('Erro na leitura da Tag', `Essa não é uma tag do Eletrogama.`, [
      {text: 'FECHAR', onPress: () => console.log('OK Pressed')},
    ]);
  } finally {
    NfcManager.cancelTechnologyRequest();
  }
};

export const startNFC = async () => {
  const isSupported = await isNFCSupported();

  if (isSupported) {
    const startResult = await startNFCManager();
    if (startResult.Success) {
      return await handleRead();
    } else {
      Alert.alert(
        'Ocorreu um erro ao iniciar o Gerenciador NFC',
        'Tente novamente, entre em contato com o suporte ou use o código QR',
        [{text: 'CLOSE', onPress: () => console.log('OK Pressed')}],
      );
    }
  } else {
    Alert.alert(
      'Dispositivo não compatível com NFC',
      'Seu dispositivo não oferece suporte à leitura de tags NFC. Tente outro dispositivo ou use o código QR.',
      [{text: 'FECHAR', onPress: () => console.log('OK Pressed')}],
    );
  }
};
