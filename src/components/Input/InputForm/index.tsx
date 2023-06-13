import {Input, Icon} from 'native-base';
import {StyleSheet} from 'react-native';
import {BACKGROUND, WHITE} from '../../../styles/colors';

type inputProps = {
  variant: string;
  placeHolder: string;
  value?: string;
  autoCapitalize?: string;
  onChangeText?: any;
  secureTextEntry?: boolean;
  readOnly?: boolean;
  type?: string;
  width?: string;
};

const ProfileInput = ({
  variant,
  placeHolder,
  value,
  autoCapitalize,
  onChangeText,
  secureTextEntry,
  readOnly,
  width,
}: inputProps) => {
  return (
    <Input
      width={width}
      isReadOnly={readOnly}
      size="xl"
      marginBottom={1}
      backgroundColor={WHITE}
      borderColor={BACKGROUND}
      borderWidth={1}
      paddingTop={3}
      paddingBottom={3}
      paddingLeft={5}
      paddingRight={5}
      fontSize={17}
      color={BACKGROUND}
      variant={variant}
      placeholder={placeHolder}
      value={value}
      defaultValue={value}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      onChangeText={onChangeText}
    />
  );
};

export default ProfileInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
