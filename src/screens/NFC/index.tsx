import {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {startNFC} from './NFCHelper';

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
        <ScrollView>
          <Text style={styles.primaryText}>NFC System </Text>
          <Text style={styles.secondaryText}>
            Bring your phone to the NFC tag for ticket validation
          </Text>
          <View style={styles.nfcIconContainer}>
            <MaterialCommunityIcons
              name="cellphone-nfc"
              color="#cc2b5e"
              size={96}
            />
          </View>
          <Text style={styles.descriptionMessage}></Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default NfcReader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: '100%',
  },
  primaryText: {
    width: '100%',
    textAlign: 'center',
    margin: 0,
    marginTop: '30%',
  },
  secondaryText: {
    width: '100%',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: '20%',
  },
  nfcIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  nfcContainer: {
    height: '80%',
  },
  descriptionMessage: {
    fontWeight: 'normal',
    fontSize: 16,
    marginTop: 12,
    textAlign: 'center',
  },
});
