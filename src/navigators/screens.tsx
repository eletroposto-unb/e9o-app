import {createStackNavigator} from '@react-navigation/stack';
import Help from '../screens/Help';
import NfcWrite from '../screens/NFC/NFCWrite';

const StackScreens = [
  {name: 'Help', component: Help},
  {name: 'NfcWrite', component: NfcWrite},
];

const Stack = createStackNavigator();

export function NavigableScreens() {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          title: '',
          headerTransparent: true,
          headerShadowVisible: false,
        }}>
        {StackScreens.map((screen, index) => (
          <Stack.Screen
            key={index}
            name={screen.name}
            component={screen.component}
          />
        ))}
      </Stack.Group>
    </Stack.Navigator>
  );
}
