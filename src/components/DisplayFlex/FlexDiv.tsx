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
}

export const FlexDiv = ({
  children,
  direction,
  aligment,
  gap,
  justify,
}: FlexDivProps) => {
  return (
    <View
      style={{
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
