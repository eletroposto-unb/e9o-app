import React from 'react';
import {View} from 'native-base';
import {TouchableOpacity} from 'react-native';

interface FlexDivProps {
  children: React.ReactNode;
  direction: 'row' | 'column';
  aligment?: 'center' | 'flex-start' | 'flex-end';
  justify?:
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'flex-start'
    | 'flex-end';
  gap?: number;
  width?: number | string;
  zIndex?: number;
  onPress?: any;
}

export const FlexDiv = ({
  children,
  direction,
  aligment,
  gap,
  justify,
  width,
  zIndex,
  onPress,
}: FlexDivProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: width,
        display: 'flex',
        flexDirection: direction,
        alignItems: aligment,
        justifyContent: justify,
        gap: gap,
        zIndex: zIndex,
      }}>
      {children}
    </TouchableOpacity>
  );
};
