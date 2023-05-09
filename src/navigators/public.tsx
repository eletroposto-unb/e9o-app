import {createStackNavigator} from '@react-navigation/stack';
import Authentication from '../screens/Authentication';
import Login from '../screens/Authentication/Login';
import Register from '../screens/Authentication/Register';
import SafePublicArea from '../components/SafeArea/SafePublicArea';

import Profile from '../screens/Profile';
import QrCodeReader from '../screens/QRCode';
import Charge from '../screens/Charge';
import NfcReader from '../screens/NFC';
import History from '../screens/History';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <SafePublicArea>
      <Stack.Navigator>
        <Stack.Group
          screenOptions={{
            title: '',
            headerTransparent: true,
            headerShadowVisible: false,
          }}>
          <Stack.Screen name="Autenticaiton" component={Authentication} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="QrCodeReader" component={QrCodeReader} />
          <Stack.Screen name="Charger" component={Charge} />
          <Stack.Screen name="NfcReader" component={NfcReader} />
          <Stack.Screen name="History" component={History} />
        </Stack.Group>
      </Stack.Navigator>
    </SafePublicArea>
  );
}

export default MyStack;
