import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SafePrivateArea from '../SafeArea/SafePrivateArea';
import Profile from '../../screens/Profile';
import QrCodeReader from '../../screens/QRCode';
import Charge from '../../screens/Charge';
import NfcReader from '../../screens/NFC';
import History from '../../screens/History';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <SafePrivateArea>
      <Tab.Navigator>
        <Tab.Group
          screenOptions={{
            title: '',
            headerTransparent: true,
            headerShadowVisible: false,
          }}>
          <Tab.Screen name="Profile" component={Profile} />
          <Tab.Screen name="QrCodeReader" component={QrCodeReader} />
          <Tab.Screen name="Charger" component={Charge} />
          <Tab.Screen name="NfcReader" component={NfcReader} />
          <Tab.Screen name="History" component={History} />
        </Tab.Group>
      </Tab.Navigator>
    </SafePrivateArea>
  );
}

export default TabNavigator;
