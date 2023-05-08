import {Input, Icon} from 'native-base';
import {StyleSheet} from 'react-native';
import {BACKGROUND, WHITE} from '../../styles/colors';
import {InterfaceInputProps} from 'native-base/lib/typescript/components/primitives/Input/types';

type inputProps = {
  variant: string;
  placeHolder: string;
  value?: string;
  autoCapitalize?: string;
  onChangeText?: any;
  secureTextEntry?: boolean;
  type?: string;
  inputRightElement?: InterfaceInputProps['InputRightElement'];
};

const InputForm = ({
  variant,
  placeHolder,
  value,
  autoCapitalize,
  onChangeText,
  secureTextEntry,
  type,
  inputRightElement,
}: inputProps) => {
  return (
    <Input
      size="xl"
      height={55}
      marginBottom={3}
      backgroundColor={BACKGROUND}
      borderWidth={0}
      paddingTop={3}
      paddingBottom={3}
      paddingLeft={5}
      paddingRight={5}
      fontSize={17}
      color={WHITE}
      variant={variant}
      placeholder={placeHolder}
      value={value}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      onChangeText={onChangeText}
      infoTex
      type={type}
      InputRightElement={inputRightElement}
    />
  );
};

export default InputForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
