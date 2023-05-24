import React from 'react';
import {Spinner, Center} from 'native-base';
import {SECUNDARY} from '../../styles/colors';

type inputProps = {
  color?: string;
};

const SpinnerLoading = ({color}: inputProps) => {
  return (
    <Center>
      <Spinner
        color={color || SECUNDARY}
        size="lg"
        accessibilityLabel="Loading login"
        marginTop={10}
      />
    </Center>
  );
};

export default SpinnerLoading;
