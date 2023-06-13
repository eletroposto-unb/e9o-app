import {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

const QrCodeReader = (): JSX.Element => {
  const devices = useCameraDevices();
  const device = devices.back;
  const [cameraPermission, setCameraPermission] = useState<String | null>(null);

  useEffect(() => {
    async function getPermission() {
      const permission = await Camera.requestCameraPermission();
      console.log(`Camera permission status ${permission}`);
      if (permission == 'denied') await Linking.openSettings();
      setCameraPermission(permission);
    }
    getPermission();
  }, []);

  if (device == null) {
    return (
      <View>
        <Text>SEM DISPOSITIVO</Text>
      </View>
    );
  }

  return (
    <>
      {cameraPermission === 'authorized' ? (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
        />
      ) : (
        <Text style={styles.permissionText}>
          Permissão da câmera não concedida
        </Text>
      )}
    </>
  );
};

export default QrCodeReader;

const styles = StyleSheet.create({
  permissionText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
