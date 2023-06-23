import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {Station} from '../../../services/dto/Stations.dto';
import {FlexDiv} from '../../../components/DisplayFlex/FlexDiv';
import {Fonts} from '../../../styles/fonts';
import {BACKGROUND, PRIMARY, SECUNDARY, WHITE} from '../../../styles/colors';
import {Select, CheckIcon, NativeBaseProvider} from 'native-base';
import {getCarsByCpf} from '../../../services/car/car.service';
import {AuthContext} from '../../../context/authProvider';
import StyledButton from '../../../components/Button';
import {NavigationProp, useNavigation} from '@react-navigation/native';

function ChargeForm(props: any) {
  const {posto} = props.route.params;
  const navigator = useNavigation<NavigationProp<any>>();

  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState('15');
  const [selectedCar, setSelectedCar] = useState<Car>();
  const [cars, setCars] = useState<Car[]>([]);
  const handleTimeChange = (value: string) => {
    setTime(value);
  };

  const handleCarChange = (id: string) => {
    setSelectedCar(cars[+id]);
  };

  useEffect(() => {
    console.log(user);
    getCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getCars() {
    await getCarsByCpf(user.cpf).then(response => {
      if (response.type === 'success' && response.value.length > 0) {
        setCars(response.value!);
      }
    });
  }

  const handleChargeClick = () => {
    navigator.navigate('Charging', {totalTime: +time});
  };

  return (
    <NativeBaseProvider>
      <ScrollView>
        <View style={styles.container}>
          <FlexDiv direction="column" gap={10}>
            <Text style={Fonts.title}>{posto.nome}</Text>
            <Text style={Fonts.labelBlue}>Custo</Text>
            <Text style={Fonts.thinBlack}>
              {`${posto.precoKwh} moedas pow KWh`}
            </Text>
            <Text style={Fonts.labelBlue}>Tempo de Carga:</Text>
            <Select
              size="xl"
              height={50}
              marginBottom={3}
              paddingTop={3}
              paddingBottom={3}
              paddingRight={7}
              fontSize={17}
              minWidth="100"
              width={'100%'}
              variant="rounded"
              paddingX={10}
              textAlign={'left'}
              borderColor={BACKGROUND}
              color={BACKGROUND}
              backgroundColor={WHITE}
              accessibilityLabel="time"
              placeholder="Tempo de carga"
              onValueChange={handleTimeChange}
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size={3} />,
              }}
              mt="1">
              <Select.Item label="15 minutos" value="15" />
              <Select.Item label="30 minutos" value="30" />
            </Select>
            <Text style={Fonts.labelBlue}>Carro:</Text>
            <Select
              size="xl"
              height={50}
              marginBottom={3}
              paddingTop={3}
              paddingBottom={3}
              paddingRight={7}
              fontSize={17}
              minWidth="100"
              width={'100%'}
              variant="rounded"
              paddingX={10}
              textAlign={'left'}
              borderColor={BACKGROUND}
              color={BACKGROUND}
              backgroundColor={WHITE}
              accessibilityLabel="car"
              placeholder="Carro"
              onValueChange={handleCarChange}
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size={3} />,
              }}
              mt="1">
              {cars.map((car, index) => (
                <Select.Item
                  key={index}
                  label={`${car.modelo} - ${car.placa}`}
                  value={index.toString()}
                />
              ))}
            </Select>
            <StyledButton
              loading={loading}
              loadingColor={SECUNDARY}
              title="SALVAR"
              backgroundColor={PRIMARY}
              color={WHITE}
              onPress={handleChargeClick}
            />
          </FlexDiv>
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
}

export default ChargeForm;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  inputLabel: {
    marginLeft: 5,
    marginBottom: 3,
    color: BACKGROUND,
    fontSize: 16,
    fontWeight: '600',
  },
  moedas: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sairContainer: {
    borderBottomWidth: 1,
    width: '30%',
  },
  sair: {
    color: BACKGROUND,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -15,
  },
  loadingContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
  },
  toastMessage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoContainer: {
    width: '100%',
  },
  footer: {
    position: 'absolute',
    bottom: -40,
    right: 5,
    flex: 1,
  },
  writeNfcTagContainer: {
    width: '100%',
  },
});
