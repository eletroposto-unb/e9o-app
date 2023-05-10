import {Button} from 'native-base';
import {StyleSheet} from 'react-native';
import {Text} from 'native-base';

type inputProps = {
  title: string;
  onPress?: any;
  color: string;
  backgroundColor: string;
  width?: string;
  borderRadius?: number;
};

const StyledButton = ({
  title,
  onPress,
  color,
  backgroundColor,
  width,
  borderRadius,
}: inputProps) => {
  return (
    <Button
      style={styles.container}
      width={width ? width : '100%'}
      onPress={onPress}
      borderRadius={borderRadius ? borderRadius : 15}
      backgroundColor={backgroundColor}>
      <Text style={styles.text} color={color}>
        {title}
      </Text>
    </Button>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginTop: 10,
    height: 50,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});
