import {createStackNavigator} from '@react-navigation/stack';
import Autentication from '../screens/Autentication';
import Login from '../screens/Autentication/Login';
import Register from '../screens/Autentication/Register';
import SafeAreaLayout from '../components/SafeArea';

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
        </Stack.Group>
      </Stack.Navigator>
    </SafeAreaLayout>
  );
}

export default MyStack;
