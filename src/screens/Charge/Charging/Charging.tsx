import {NativeBaseProvider, Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import StyledButton from '../../../components/Button';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {SECUNDARY} from '../../../styles/colors';

export function Charging({route}: any) {
  const [currentTime, setCurrentTime] = useState(route.params.totalTime * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((prevTime: number) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const children = (remainingTime: number) => {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    return `${hours}:${minutes}:${seconds}`;
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
          duration={currentTime}
          colors={SECUNDARY}
          size={250}
          // colorsTime={[7]}
        >
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
          onPress={() => {}}
          loadingColor="#FFF"
          width="80%"
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
});
