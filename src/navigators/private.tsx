import {createStackNavigator} from '@react-navigation/stack';
import SafeAreaLayout from '../components/SafeArea';
import Profile from '../screens/Profile';
import QrCodeReader from '../screens/QRCode';
import Charge from '../screens/Charge';
import NfcReader from '../screens/NFC';
import History from '../screens/History';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function PrivateStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="QrCodeReader" component={QrCodeReader} />
      <Tab.Screen name="Charger" component={Charge} />
      <Tab.Screen name="NfcReader" component={NfcReader} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  );
}

export default PrivateStack;
