import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import SafeAreaLayout from '../components/SafeArea';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <SafeAreaLayout>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{
            title: '',
            headerTransparent: true,
            headerShadowVisible: false,
          }}
          component={Login}
        />
        <Stack.Screen
          name="Register"
          options={{
            title: '',
            headerTransparent: true,
            headerShadowVisible: false,
          }}
          component={Register}
        />
      </Stack.Navigator>
    </SafeAreaLayout>
  );
}

export default MyStack;
