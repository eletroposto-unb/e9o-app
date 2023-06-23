import {NativeBaseProvider, Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';

export function Charging({route}: any) {
  const [currentTime, setCurrentTime] = useState(route.params.totalTime * 60);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((prevTime: number) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <NativeBaseProvider>
      <View
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%">
        <Text>{`Timer: ${formatTime(currentTime)}`}</Text>
      </View>
    </NativeBaseProvider>
  );
}
