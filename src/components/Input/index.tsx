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
  backgroundColor?: string;
  inputRightElement?: InterfaceInputProps['InputRightElement'];
  borderWidth?: number;
  borderColor?: string;
  readOnly?: boolean;
  color?: string;
  width?: string;
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
  backgroundColor,
  borderWidth,
  borderColor,
  readOnly,
  color,
  width
}: inputProps) => {
  return (
    <Input
      width={width}
      readOnly={readOnly}
      size="xl"
      height={55}
      marginBottom={3}
      backgroundColor={backgroundColor}
      borderWidth={borderWidth}
      borderColor={borderColor}
      paddingTop={3}
      paddingBottom={3}
      paddingLeft={5}
      paddingRight={5}
      fontSize={17}
      color={color}
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
