import React from 'react';
import {Spinner, Center} from 'native-base';
import {SECUNDARY} from '../../styles/colors';

const SpinnerLoading = () => {
  return (
    <Center>
      <Spinner
        color={SECUNDARY}
        size="lg"
        accessibilityLabel="Loading login"
        marginTop={10}
      />
    </Center>
  );
};

export default SpinnerLoading;
