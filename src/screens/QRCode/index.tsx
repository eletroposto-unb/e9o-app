import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import QrCodeLanding from './Steps/Landing';
import QrcodeStep from './Steps/QrCodeStep';

const QrCodeReader = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState(1);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <QrCodeLanding onNextStep={handleNextStep} />;
      case 2:
        return <QrcodeStep onBack={handlePreviousStep} />;
      default:
        return null;
    }
  };

  const handleNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return <View style={styles.container}>{renderStepContent()}</View>;
};

export default QrCodeReader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
