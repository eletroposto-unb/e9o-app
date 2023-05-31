import {createStackNavigator} from '@react-navigation/stack';
import Authentication from '../screens/Authentication';
import Login from '../screens/Authentication/Login';
import Register from '../screens/Authentication/Register';
import Help from '../screens/Help';
import SafeAreaWrapper from '../components/SafeArea';

const StackScreens = [
  // {name: 'Help', component: Help},
  {name: 'Authentication', component: Authentication},
  {name: 'Login', component: Login},
  {name: 'Register', component: Register},
];

const Stack = createStackNavigator();

export function PublicNavigator() {
  return (
    <SafeAreaWrapper>
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
    </SafeAreaWrapper>
  );
}
