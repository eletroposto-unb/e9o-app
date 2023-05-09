import {createStackNavigator} from '@react-navigation/stack';
import Autentication from '../screens/Autentication';
import Login from '../screens/Autentication/Login';
import Register from '../screens/Autentication/Register';
import SafeAreaLayout from '../components/SafeArea';
import ProfilePage from '../screens/Profile';
import QRCodePage from '../screens/QRCode';
import ChargePage from '../screens/Charge';
import NFCPage from '../screens/NFC';
import HistoryPage from '../screens/History';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <SafeAreaLayout>
      <Stack.Navigator>
        <Stack.Group
          screenOptions={{
            title: '',
            headerTransparent: true,
            headerShadowVisible: false,
          }}>
          <Stack.Screen name="Autenticaiton" component={Autentication} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="profile" component={ProfilePage} />
          <Stack.Screen name="qrcode" component={QRCodePage} />
          <Stack.Screen name="charge" component={ChargePage} />
          <Stack.Screen name="nfc" component={NFCPage} />
          <Stack.Screen name="history" component={HistoryPage} />
        </Stack.Group>
      </Stack.Navigator>
    </SafeAreaLayout>
  );
}

export default MyStack;
