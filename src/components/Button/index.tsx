import {Button} from 'native-base';
import {StyleSheet} from 'react-native';

type inputProps = {
  title: string;
  onPress?: any;
  color: string;
  backgroundColor: string;
};

const StyledButton = ({title, onPress, color, backgroundColor}: inputProps) => {
  return (
    <Button
      style={styles.container}
      onPress={onPress}
      backgroundColor={backgroundColor}>
      {title}
    </Button>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '100%',
    borderRadius: 15,
    textTransform: 'uppercase',
  },
});
