import MapView, {Marker, Callout} from 'react-native-maps';
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {StationsDTO} from '../../services/dto/Stations.dto';
import {Text} from 'native-base';
import {BLACK, ERROR, PRIMARY, SUCCESS} from '../../styles/colors';

const {height, width} = Dimensions.get('window');

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
            pinColor={
              station.station.statusFuncionamento.toUpperCase() === 'DISPONIVEL'
                ? SUCCESS
                : ERROR
            }>
            <Callout>
              <View style={styles.marker}>
                <Text style={styles.title}>{station.station.nome}</Text>
                <Text>
                  {station.address.endereco +
                    ', ' +
                    station.address.complemento +
                    ' - ' +
                    station.address.cidade +
                    ' - ' +
                    station.address.estado}
                </Text>
                <Text style={styles.label}>Horario de funcionamento</Text>
                <Text style={styles.text}>
                  {station.station.horarioFuncionamento}
                </Text>
                <Text style={styles.label}>Tomada</Text>
                <Text style={styles.text}>{station.station.tipoTomada}</Text>
                <Text style={styles.label}>Comodidade</Text>
                <Text style={styles.text}>{station.address.comodidade}</Text>
                <Text style={styles.label}>Cabo</Text>
                <Text style={styles.text}>
                  {station.station.cabo === true ? 'Sim' : 'Não'}
                </Text>
                <Text style={styles.label}>Custo</Text>
                <Text style={styles.text}>{station.station.precoKwh}</Text>
                <Text style={styles.label}>Status</Text>
                <Text style={styles.text}>
                  {station.station.statusFuncionamento}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

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
  marker: {
    height: 'auto',
    width: '100%',
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: PRIMARY,
    paddingBottom: 6,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    color: PRIMARY,
  },
  text: {
    fontSize: 14,
    color: BLACK,
  },
});

export default Map;
