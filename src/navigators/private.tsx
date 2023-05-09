import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';
import Charge from '../screens/Charge';
import NfcReader from '../screens/NFC';
import QrCodeReader from '../screens/QRCode';
import History from '../screens/History';

const TabScreens = [
  {name: 'Perfil', component: Profile},
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
