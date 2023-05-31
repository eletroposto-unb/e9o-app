import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {BACKGROUND, LIGHTGRAY, PRIMARY, WHITE} from '../../../styles/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

type AccordionItemPros = PropsWithChildren<{
  title: string;
  index: number;
  items: string[];
}>;

const AccordionItem = ({
  children,
  title,
  index,
}: AccordionItemPros): JSX.Element => {
  const [expanded, setExpanded] = useState(false);

  function toggleItem() {
    setExpanded(!expanded);
  }

  const body = <View style={styles.accordBody}>{children}</View>;

  return (
    <View style={styles.accordContainer} key={index}>
      <TouchableOpacity style={styles.accordHeader} onPress={toggleItem}>
        <Text style={styles.accordTitle}>{title}</Text>
        <AntDesign
          name={expanded ? 'caretup' : 'caretdown'}
          size={20}
          color="#bbb"
        />
      </TouchableOpacity>
      {expanded && body}
    </View>
  );
};

export default AccordionItem;

const styles = StyleSheet.create({
  accordContainer: {
    paddingBottom: 5,
    marginHorizontal: 10,
  },
  accordHeader: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: PRIMARY,
    color: WHITE,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accordTitle: {
    fontSize: 18,
    color: WHITE,
  },
  accordBody: {
    padding: 12,
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: '#eaeaea',
  },
});
