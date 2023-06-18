/* eslint-disable @typescript-eslint/no-shadow */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Map from '../../components/Map';
import {getAllStations} from '../../services/stations/stations.service';
import {StationsDTO} from '../../services/dto/Stations.dto';

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
    <View>
      <Map stations={stations!} />
    </View>
  );
};

export default Charge;
