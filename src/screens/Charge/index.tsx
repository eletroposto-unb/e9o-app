/* eslint-disable @typescript-eslint/no-shadow */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Map from '../../components/Map';
import {getAllStations} from '../../services/stations/stations.service';
import {StationsDTO} from '../../services/dto/Stations.dto';
import {BACKGROUND} from '../../styles/colors';
import {NativeBaseProvider} from 'native-base';

const Charge = () => {
  const [stations, setStations] = useState<any[]>();

  const handleChargeStations = async () => {
    const stations = await getAllStations();
    setStations(stations.value as StationsDTO[]);
  };

  useEffect(() => {
    handleChargeStations();
  }, []);

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Map stations={stations!} />
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: BACKGROUND,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Charge;
