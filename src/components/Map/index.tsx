import MapView from 'react-native-maps';
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

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

const Map = () => (
  <View style={styles.container}>
    <MapView
      style={styles.map}
      region={{
        latitude: -15.988826153080108,
        longitude: -48.044526246024574,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    />
  </View>
);

export default Map;
