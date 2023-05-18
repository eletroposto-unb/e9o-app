import React from 'react';
import {View} from 'native-base';

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
}

export const FlexDiv = ({
  children,
  direction,
  aligment,
  gap,
  justify,
  width,
}: FlexDivProps) => {
  return (
    <View
      style={{
        width: width,
        display: 'flex',
        flexDirection: direction,
        alignItems: aligment,
        justifyContent: justify,
        gap: gap,
      }}>
      {children}
    </View>
  );
};
