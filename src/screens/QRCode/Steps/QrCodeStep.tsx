import {BarCodeScanner} from 'expo-barcode-scanner';
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {getStationById} from '../../../services/stations/stations.service';
import {Station} from '../../../services/dto/Stations.dto';

type Props = {
  onBack: () => void;
};

const QrcodeStep = ({}: Props) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [idPosto, setIdPosto] = useState<number | null>(null);
  const [posto, setPosto] = useState<Station | undefined>(undefined);

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
  }, [idPosto]);

  async function getInformacaoPosto() {
    try {
      const response = await getStationById(idPosto!);
      setPosto(response.value);
    } catch (error) {
      console.log('error', error);
    }
  }

  const handleBarCodeScanned = ({data}: any) => {
    console.log('data', data);
    const qrCodeData = JSON.parse(data);

    if (qrCodeData.idPosto) {
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
          <View style={{backgroundColor: 'black'}}>
            {posto && (
              <>
                <Text>Nome: {posto.nome}</Text>
                <Text>Descrição: {posto.descricao}</Text>
                <Text>Tipo: {posto.tipoTomada}</Text>
                <Text>Valor KWh: {posto.precoKwh}</Text>
              </>
            )}
          </View>
          <Button
            title={'Clique para ler de novo'}
            onPress={() => {
              setPosto(undefined);
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
