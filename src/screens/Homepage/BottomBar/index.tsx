/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../../Profile';
import Charge from '../../Charge';
import NfcReader from '../../NFC';
import QrCodeReader from '../../QRCode';
import History from '../../History';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from 'native-base';
import {useNavigation} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

interface TabIconProps {
  color: string;
}

function BottomBar() {
  const navigation = useNavigation();

  const profileScreenOptions = {
    tabBarLabel: 'Profile',
    tabBarButton: (props: any) => (
      <TouchableOpacity
        {...props}
        onPress={() => navigation.navigate('Profile')}
      />
    ),
  };

  const chargeScreenOptions = {
    tabBarLabel: 'Charge',
    tabBarButton: (props: any) => (
      <TouchableOpacity
        {...props}
        onPress={() => navigation.navigate('Charge')}
      />
    ),
  };

  const NFCScreenOptions = {
    tabBarLabel: 'NFC',
    tabBarButton: (props: any) => (
      <TouchableOpacity {...props} onPress={() => navigation.navigate('NfcReader')} />
    ),
  };

  const qrCodeScreenOptions = {
    tabBarLabel: 'QRCode',
    tabBarButton: (props: any) => (
      <TouchableOpacity
        {...props}
        onPress={() => navigation.navigate('QrCodeReader')}
      />
    ),
  };

  const historyScreenOptions = {
    tabBarLabel: 'History',
    tabBarButton: (props: any) => (
      <TouchableOpacity
        {...props}
        onPress={() => navigation.navigate('History')}
      />
    ),
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={profileScreenOptions}
      />
      <Tab.Screen
        name="Charge"
        component={Charge}
        options={chargeScreenOptions}
      />
      <Tab.Screen name="NFC" component={NfcReader} options={NFCScreenOptions} />
      <Tab.Screen
        name="QRCode"
        component={QrCodeReader}
        options={qrCodeScreenOptions}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={historyScreenOptions}
      />
    </Tab.Navigator>
  );
}

export default BottomBar;
