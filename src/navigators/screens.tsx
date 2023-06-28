import {createStackNavigator} from '@react-navigation/stack';
import Help from '../screens/Help';

const StackScreens = [{name: 'Help', component: Help}];

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
