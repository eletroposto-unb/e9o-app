import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './src/navigators';

function App(): JSX.Element {
  return (
    <SafeAreaProvider style={{flex: 1}}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
