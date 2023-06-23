import {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Select, CheckIcon, Badge, NativeBaseProvider} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getAllStations} from '../../../services/chargeStation';
import {writeNdef} from '../NFCHelper';
import {BACKGROUND, PRIMARY, WHITE, SECUNDARY} from '../../../styles/colors';
import StyledButton from '../../../components/Button';

const title = 'Sistema NFC ';
const subTitle =
  'Vincule Tags NFC a um determinado posto para ajudar os usuários na hora do abastecimento.';
const helperText = 'Aguardando aproximação...';

const NfcWrite = props => {
  const [chargeStation, setChargeStation] = useState<ChargeStation>();
  const [chargeStations, setChargeStations] = useState<ChargeStation[]>();

  useEffect(() => {
    handleStations();
  }, []);

  const handleStations = async () => {
    const stations = await getAllStations();
    setChargeStations(stations?.value);
  };

  const onSubmit = async () => {
    const payload_string = JSON.stringify({
      idPosto: chargeStation?.station.idPosto,
      nome: chargeStation?.station.nome,
      descricao: chargeStation?.station.descricao,
      horarioFuncionamento: chargeStation?.station.horarioFuncionamento,
      tipoTomada: chargeStation?.station.tipoTomada,
      comodidade: chargeStation?.station.comodidade,
      statusFuncionamento: chargeStation?.station.statusFuncionamento,
      precoKwh: chargeStation?.station.precoKwh,
      cabo: chargeStation?.station.cabo,
      potencia: chargeStation?.station.potencia,
      latitude: chargeStation?.address.latitude,
      longitude: chargeStation?.address.longitude,
      endereco: chargeStation?.address.endereco,
      estado: chargeStation?.address.estado,
      cep: chargeStation?.address.cep,
      cidade: chargeStation?.address.cidade,
      numero: chargeStation?.address.numero,
      complemento: chargeStation?.address.complemento,
    });
    const {serial} = await writeNdef(payload_string);
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <View style={styles.goBack}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Ionicons
              name="ios-return-up-back-outline"
              size={35}
              color={WHITE}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.nfcContainer}>
          <Text style={styles.primaryText}>{title}</Text>
          <Text style={styles.secondaryText}>{subTitle}</Text>
          <View style={styles.chargeStations}>
            <Select
              size="xl"
              height={50}
              marginBottom={3}
              paddingTop={3}
              paddingBottom={3}
              paddingRight={7}
              paddingLeft={5}
              fontSize={17}
              minWidth="100"
              width={'100%'}
              textAlign={'left'}
              borderColor={BACKGROUND}
              color={BACKGROUND}
              backgroundColor={WHITE}
              accessibilityLabel="Plug"
              placeholder={'Selecione o Eletroposto'}
              onValueChange={(value: ChargeStation) => setChargeStation(value)}
              value={chargeStation}
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size={3} />,
              }}
              mt="1">
              {chargeStations &&
                chargeStations.map((s, index) => {
                  return (
                    <Select.Item
                      label={s?.station?.nome}
                      value={s}
                      key={index}
                    />
                  );
                })}
            </Select>

            {chargeStation && (
              <View style={styles.stationContainer}>
                <Text style={{color: WHITE}}>
                  {' '}
                  Confirme as informações do posto
                </Text>
                <View style={styles.stationContent}>
                  <Text style={styles.stationNameText}>
                    {chargeStation.station.nome}
                  </Text>
                  <Text style={styles.stationText}>
                    {chargeStation.station.descricao}
                  </Text>
                  <Text style={styles.stationText}>
                    Precisa levar cabo:{' '}
                    {chargeStation.station.cabo === 1 ? `Sim` : 'Não'}
                  </Text>
                  <Text style={styles.stationText}>
                    Status de Funcionamento:{' '}
                    {chargeStation.station.statusFuncionamento}
                  </Text>
                  <Text style={styles.stationText}>
                    Preço: {chargeStation.station.precoKwh} Kwh
                  </Text>
                  <Text style={styles.stationText}>
                    Tipo tomada: {chargeStation.station.tipoTomada}
                  </Text>
                  <Text style={styles.stationText}>
                    Localização: {chargeStation.address.endereco} -{' '}
                    {chargeStation.address.cidade} / {chargeStation.address.cep}
                  </Text>
                  <Text style={styles.stationText}>
                    Comodidade: {chargeStation.station.comodidade}
                  </Text>
                </View>
                <StyledButton
                  title="CADASTRAR TAG"
                  backgroundColor={PRIMARY}
                  color={WHITE}
                  onPress={onSubmit}
                  loadingColor={PRIMARY}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </NativeBaseProvider>
  );
};

export default NfcWrite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
    width: '100%',
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  goBack: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    textAlign: 'center',
    alignItems: 'center',
  },
  nfcContainer: {
    paddingTop: '10%',
    height: '80%',
    display: 'flex',
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
  chargeStations: {
    position: 'relative',
    width: '100%',
    height: '80%',
    paddingVertical: 10,
  },
  stationContainer: {
    marginTop: 10,
    whidth: '100%',
    height: '80%',
  },
  stationContent: {
    backgroundColor: PRIMARY,
    borderWidth: 0.5,
    borderColor: WHITE,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  stationNameText: {
    color: WHITE,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 2,
  },
  stationText: {
    color: WHITE,
    marginTop: 5,
    textTransform: 'capitalize',
  },
});
