import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FlexDiv} from '../../../components/DisplayFlex/FlexDiv';
import {Fonts} from '../../../styles/fonts';
import {BACKGROUND, PRIMARY, SECUNDARY, WHITE} from '../../../styles/colors';
import {Select, CheckIcon, NativeBaseProvider, Box, Toast} from 'native-base';
import {getCarsByCpf} from '../../../services/car/car.service';
import {AuthContext} from '../../../context/authProvider';
import StyledButton from '../../../components/Button';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import firestore from '@react-native-firebase/firestore';
import {startCharge} from '../../../services/stations/stations.service';

const db = firestore();

const ChargeForm = (props: any) => {
  const {posto} = props.route.params;

  const {user} = useContext(AuthContext);
  const [time, setTime] = useState('');
  const [selectedCar, setSelectedCar] = useState<Car>();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const navigator = useNavigation<NavigationProp<any>>();

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

  useEffect(() => {
    const unsubscribe = db.collection('station').onSnapshot(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        // do something with documentSnapshot data
      });
    });
    return () => {
      unsubscribe(); // Stop the snapshot listener when the component unmounts or when the dependency changes
    };
  }, [posto.idPosto]);

  async function getCars() {
    await getCarsByCpf(user.cpf).then(response => {
      if (response.type === 'success' && response.value.length > 0) {
        setCars(response.value!);
      }
    });
  }

  const validate = () => {
    if (!time) {
      Toast.show({
        duration: 3000,
        render: () => {
          return (
            <Box
              bg={'error.600'}
              px="3"
              py="2"
              rounded="sm"
              mb={5}
              style={{...styles.toastMessage, backgroundColor: 'red'}}>
              <Text>Selecione um tempo</Text>
            </Box>
          );
        },
      });
      return false;
    }
    if (!selectedCar) {
      Toast.show({
        duration: 3000,
        render: () => {
          return (
            <Box
              bg={'error.600'}
              px="3"
              py="2"
              rounded="sm"
              mb={5}
              style={{...styles.toastMessage, backgroundColor: 'red'}}>
              <Text>Selecione um carro</Text>
            </Box>
          );
        },
      });
      return false;
    }
    return true;
  };

  const handleChargeClick = async () => {
    setLoading(true);
    if (validate()) {
      await startCharge(1, +time)
        .then(response => {
          console.log(typeof response);
          if (response === '200') {
            console.log('navigating');
            navigator.navigate('Charging', {
              totalTime: +time,
              coins: posto?.precoKwh,
              potencia: posto?.potencia,
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <FlexDiv direction="column" gap={10}>
          <Text style={Fonts.title}>{posto.nome}</Text>
          <Text style={Fonts.labelBlue}>Custo</Text>
          <Text style={Fonts.thinBlack}>
            {`${posto.precoKwh} moedas pow KWh`}{' '}
            <FontAwesome5 name="coins" size={20} color={SECUNDARY} />
          </Text>
          <Text style={Fonts.labelBlue}>Potência Aproximada</Text>
          <Text style={Fonts.thinBlack}>
            {`${posto.potencia} W`}{' '}
            <FontAwesome5 name="charging-station" size={20} color={SECUNDARY} />
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
            title="Carregar"
            backgroundColor={PRIMARY}
            color={WHITE}
            onPress={handleChargeClick}
          />
        </FlexDiv>
      </View>
    </NativeBaseProvider>
  );
};

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
    color: WHITE,
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
