import {BarCodeScanner} from 'expo-barcode-scanner';
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {getStationById} from '../../../services/stations/stations.service';
import {Station} from '../../../services/dto/Stations.dto';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';

const QrcodeStep = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [idPosto, setIdPosto] = useState<number | null>(null);
  const [posto, setPosto] = useState<Station | undefined>(undefined);

  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  useEffect(() => {
    getInformacaoPosto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idPosto, posto]);

  async function getInformacaoPosto() {
    try {
      await getStationById(idPosto!).then(response => {
        if (response.type === 'success') {
          navigation.navigate('ChargeForm', {
            posto: response.value as Station,
            teste: 'teste',
          });
        }
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  const handleBarCodeScanned = ({data}: any) => {
    console.log('qrcode data', data);
    const qrCodeData = JSON.parse(data);
    console.log('qrCodeData.idPosto', qrCodeData);
    if (qrCodeData.idPosto) {
      console.log('qrCodeData.idPosto', qrCodeData.idPosto);
      setIdPosto(qrCodeData.idPosto);
    }

    setScanned(true);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!scanned && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      {scanned && (
        <>
          <Button
            title={'Clique para ler de novo'}
            onPress={() => {
              setPosto(undefined);
              setIdPosto(null);
              setScanned(false);
            }}
          />
        </>
      )}
    </View>
  );
};

export default QrcodeStep;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 15,
    backgroundColor: 'white',
  },
  textError: {
    color: 'red',
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
