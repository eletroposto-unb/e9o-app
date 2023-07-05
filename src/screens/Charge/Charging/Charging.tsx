import {Box, NativeBaseProvider, Text, Toast, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import StyledButton from '../../../components/Button';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {SECUNDARY, WHITE} from '../../../styles/colors';
import {startCharge} from '../../../services/stations/stations.service';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/auth';

export function Charging({route}: any) {
  const [loading, setLoading] = useState(false);
  const navigator = useNavigation<NavigationProp<any>>();

  const children = (remainingTime: number) => {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    return `${hours}:${minutes}:${seconds}`;
  };

  const tempoRecarga = 0.1;

  const handleChargeCanceled = async () => {
    setLoading(true);
    await startCharge(1, tempoRecarga)
      .then(response => {
        console.log(response);
        if (response === '200') {
          Toast.show({
            duration: 3000,
            render: () => {
              return (
                <Box
                  bg={'success.400'}
                  px="3"
                  py="2"
                  rounded="sm"
                  mb={5}
                  style={{...styled.toastMessage}}>
                  <Text>Carregamento parado com sucesso!</Text>
                </Box>
              );
            },
          });
          navigator.navigate('Home');
        }
      })
      .catch(error => {
        console.log(error);
      });
    setLoading(false);
  };

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
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>
              {route.params.coins}
            </Text>
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
});
