/* eslint-disable react/react-in-jsx-scope */
import {Button, Spinner} from 'native-base';
import {StyleSheet} from 'react-native';
import {Text} from 'native-base';
import {PRIMARY} from '../../styles/colors';

type inputProps = {
  title?: string;
  onPress?: any;
  color: string;
  backgroundColor: string;
  width?: string;
  borderRadius?: number;
  loading?: boolean;
  loadingColor?: string;
};

const StyledButton = ({
  title,
  onPress,
  color,
  backgroundColor,
  width,
  borderRadius,
  loading,
  loadingColor,
}: inputProps) => {
  return (
    <Button
      style={styles.container}
      width={width ? width : '100%'}
      onPress={onPress}
      borderRadius={borderRadius ? borderRadius : 15}
      backgroundColor={backgroundColor}>
      {!loading ? (
        <Text style={styles.text} color={color}>
          {title}
        </Text>
      ) : (
        <Spinner size="sm" color={loadingColor ? loadingColor : PRIMARY} />
      )}
    </Button>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    height: 50,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});
