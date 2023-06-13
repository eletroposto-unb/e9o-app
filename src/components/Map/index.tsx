import MapView, {Marker} from 'react-native-maps';
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {StationsDTO} from '../../services/dto/Stations.dto';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: height,
    width: width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const Map = ({stations}: {stations: StationsDTO[]}) => {
  const initialRegion = {
    latitude: -16.0077, // Latitude da posição inicial no Gama, DF
    longitude: -48.0416, // Longitude da posição inicial no Gama, DF
    latitudeDelta: 0.0922, // Zoom do mapa na direção latitudinal
    longitudeDelta: 0.0421, // Zoom do mapa na direção longitudinal
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {stations?.map((station, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: station.address.latitude,
              longitude: station.address.longitude,
            }}
            title={station.station.nome}
            description={station.station.descricao}
          />
        ))}
      </MapView>
    </View>
  );
};

export default Map;
