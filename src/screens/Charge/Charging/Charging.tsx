import {
  Box,
  Button,
  Modal,
  NativeBaseProvider,
  Text,
  Toast,
  View,
} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import StyledButton from '../../../components/Button';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SECUNDARY, SUCCESS, WHITE} from '../../../styles/colors';
import {stopCharge} from '../../../services/stations/stations.service';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../../context/authProvider';
import {getCarsByCpf} from '../../../services/car/car.service';

export function Charging({route}: any) {
  const [loading, setLoading] = useState(false);
  const navigator = useNavigation<NavigationProp<any>>();
  const {user} = useContext(AuthContext);

  const children = (remainingTime: number) => {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    return `${hours}:${minutes}:${seconds}`;
  };

  const handleChargeCanceled = async () => {
    setLoading(true);

    const car = await getCarsByCpf(user.cpf);

    await stopCharge(1, car.value[0]?.id)
      .then(response => {
        console.log(response);
        if (response === '204') {
          setShowModal(true);
        }
      })
      .catch(error => {
        console.log(error);
      });
    setLoading(false);
  };

  const [coinCount, setCoinCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const valor = route.params.coins / 60;

    const interval = setInterval(() => {
      setCoinCount(prevCount => Math.round(prevCount + valor));
    }, 59000);

    return () => {
      clearInterval(interval);
    };
  }, [route.params.coins]);

  return (
    <NativeBaseProvider>
      <View
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%">
        <CountdownCircleTimer
          isPlaying
          duration={route.params.totalTime * 60}
          colors={SECUNDARY}
          size={250}>
          {({remainingTime}) => (
            <Text style={styled.timer}>{children(remainingTime)}</Text>
          )}
        </CountdownCircleTimer>
        <View style={styled.painel}>
          <View style={styled.painelItem}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Potência: {route.params.totalTime} W
            </Text>
            <FontAwesome5 name="charging-station" size={20} color={SECUNDARY} />
          </View>
          <View style={styled.line} />
          <View style={styled.painelItem}>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>{coinCount}</Text>
            <FontAwesome5 name="coins" size={20} color={SECUNDARY} />
          </View>
        </View>
        <StyledButton
          title="Parar carregamento"
          backgroundColor="#27AE60"
          color="#FFF"
          loadingColor="#FFF"
          width="80%"
          loading={loading}
          onPress={handleChargeCanceled}
        />
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          style={{borderRadius: 20}}>
          <Modal.Content minWidth="80%" borderRadius={20} alignItems={'center'}>
            <Modal.Body gap={2} paddingBottom={10} paddingTop={10}>
              <View style={styled.modalIcon}>
                <AntDesign name="checkcircle" size={50} color={SUCCESS} />
              </View>
              <Text style={styled.titleModal}>
                Carregamento encerrado com sucesso!
              </Text>
              <Button.Group justifyContent="center">
                <StyledButton
                  borderRadius={30}
                  title="OK"
                  backgroundColor={SUCCESS}
                  color={WHITE}
                  width={'80%'}
                  onPress={() => {
                    setShowModal(false);
                    navigator.navigate('Home');
                  }}
                />
              </Button.Group>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </View>
    </NativeBaseProvider>
  );
}

const styled = StyleSheet.create({
  timer: {
    fontSize: 38,
    fontWeight: 'bold',
    lineHeight: 38,
  },
  painel: {
    height: 150,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '80%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 15,
    marginTop: 30,
    marginBottom: 20,
  },
  painelItem: {
    height: '45%',
    // minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  line: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderWidth: 1,
    width: '100%',
    borderColor: '#BDBDBD',
    height1: 1,
    lineHeight: 1,
  },
  toastMessage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: WHITE,
  },
  modalIcon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  titleModal: {
    fontSize: 16,
    // fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});
