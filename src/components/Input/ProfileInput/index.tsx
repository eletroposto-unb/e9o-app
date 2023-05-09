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
};

const ProfileInput = ({
  variant,
  placeHolder,
  value,
  autoCapitalize,
  onChangeText,
  secureTextEntry,
}: inputProps) => {
  return (
    <Input
      size="xl"
      marginBottom={3}
      backgroundColor={WHITE}
      borderColor={BACKGROUND}
      borderWidth={1}
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
    //   onChangeText={onChangeText}
      infoTex
    />
  );
};

export default ProfileInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
