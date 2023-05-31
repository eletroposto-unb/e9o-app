/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import UnderConstruction from '../screens/UnderConstruction';
import Charge from '../screens/Charge';
import NfcReader from '../screens/NFC';
import QrCodeReader from '../screens/QRCode';
import History from '../screens/History';
import Home from '../screens/Home';
import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';

const TabScreens = [
  {name: 'Home', component: Home},
  {name: 'Charger', component: UnderConstruction},
  {name: 'NfcReader', component: UnderConstruction},
  {name: 'QrCodeReader', component: UnderConstruction},
  {name: 'History', component: UnderConstruction},
];

const icons: {[key: string]: any} = {
  Home: {icon: 'user', font: 'FontAwesome'},
  Charger: {icon: 'charging-station', font: 'FontAwesome5'},
  NfcReader: {icon: 'nfc', font: 'MaterialCommunityIcons'},
  QrCodeReader: {icon: 'qr-code-scanner', font: 'MaterialIcons'},
  History: {icon: 'log', font: 'Octicons'},
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export function PrivateNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FFC107',
        tabBarInactiveTintColor: '#004E9A',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#BDBDBD',
          borderTopWidth: 0.5,
          height: 110,
        },
      }}>
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
            options={({route}) => ({
              tabBarIcon: ({color}) => {
                const icon = icons[route.name];
                if (icon.font === 'Octicons') {
                  return <Octicons name={icon.icon} size={25} color={color} />;
                }
                if (icon.font === 'FontAwesome') {
                  return (
                    <FontAwesomeIcon name={icon.icon} size={25} color={color} />
                  );
                }
                if (icon.font === 'MaterialCommunityIcons') {
                  return (
                    <MaterialCommunityIcon
                      name={icon.icon}
                      size={25}
                      color={color}
                    />
                  );
                }
                if (icon.font === 'FontAwesome5') {
                  return (
                    <FontAwesome5 name={icon.icon} size={25} color={color} />
                  );
                }
                if (icon.font === 'MaterialIcons') {
                  return (
                    <MaterialIcons name={icon.icon} size={25} color={color} />
                  );
                }
              },
            })}
          />
        ))}
      </Tab.Group>
    </Tab.Navigator>
  );
}
