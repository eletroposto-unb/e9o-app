import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Charge from '../screens/Charge';
import NfcReader from '../screens/NFC';
import QrCodeReader from '../screens/QRCode';
import History from '../screens/History';
import Home from '../screens/Home';

const TabScreens = [
  {name: 'Home', component: Home},
  {name: 'Charger', component: Charge},
  {name: 'NfcReader', component: NfcReader},
  {name: 'QrCodeReader', component: QrCodeReader},
  {name: 'History', component: History},
];

const Tab = createBottomTabNavigator();

export function PrivateNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Group
        screenOptions={{
          title: '',
          headerShown: false,
          headerTransparent: false,
          headerShadowVisible: false,
        }}>
        {TabScreens.map((screen, index) => (
          <Tab.Screen
            key={index}
            name={screen.name}
            component={screen.component}
          />
        ))}
      </Tab.Group>
    </Tab.Navigator>
  );
}
