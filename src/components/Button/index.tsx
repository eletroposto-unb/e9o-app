import {Button} from 'native-base';
import {StyleSheet} from 'react-native';
import {Text} from 'native-base';

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
      <Text 
      style={styles.text}
      color={color}
      >{title}</Text>
    </Button>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '100%',
    borderRadius: 15,
    marginTop: 10,
    height: 50,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});
