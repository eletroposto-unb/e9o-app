import React from 'react';
import {TouchableOpacity} from 'react-native';
import {View} from 'native-base';

interface RowItemProps {
  children: React.ReactNode;
}

export const RowItem = ({children}: RowItemProps) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 18,
        justifyContent: 'space-between',
        width: '100%',
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4, // for Android shadow
        backgroundColor: '#fff',
        borderRadius: 15,
      }}>
      {children}
    </View>
  );
};
