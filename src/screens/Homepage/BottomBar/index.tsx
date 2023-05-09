/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfilePage from '../../Profile';
import ChargePage from '../../Charge';
import NFCPage from '../../NFC';
import QRCodePage from '../../QRCode';
import HistoryPage from '../../History';
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
        onPress={() => navigation.navigate('profile')}
      />
    ),
  };

  const chargeScreenOptions = {
    tabBarLabel: 'Charge',
    tabBarButton: (props: any) => (
      <TouchableOpacity
        {...props}
        onPress={() => navigation.navigate('charge')}
      />
    ),
  };

  const NFCScreenOptions = {
    tabBarLabel: 'NFC',
    tabBarButton: (props: any) => (
      <TouchableOpacity {...props} onPress={() => navigation.navigate('nfc')} />
    ),
  };

  const qrCodeScreenOptions = {
    tabBarLabel: 'QRCode',
    tabBarButton: (props: any) => (
      <TouchableOpacity
        {...props}
        onPress={() => navigation.navigate('qrcode')}
      />
    ),
  };

  const historyScreenOptions = {
    tabBarLabel: 'History',
    tabBarButton: (props: any) => (
      <TouchableOpacity
        {...props}
        onPress={() => navigation.navigate('history')}
      />
    ),
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={profileScreenOptions}
      />
      <Tab.Screen
        name="Charge"
        component={ChargePage}
        options={chargeScreenOptions}
      />
      <Tab.Screen name="NFC" component={NFCPage} options={NFCScreenOptions} />
      <Tab.Screen
        name="QRCode"
        component={QRCodePage}
        options={qrCodeScreenOptions}
      />
      <Tab.Screen
        name="History"
        component={HistoryPage}
        options={historyScreenOptions}
      />
    </Tab.Navigator>
  );
}

export default BottomBar;
