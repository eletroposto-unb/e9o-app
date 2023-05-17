import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Fonts} from '../../styles/fonts';
import {FlexDiv} from '../../components/DisplayFlex/FlexDiv';
import {mockHistory} from './_mockHistory';
import {RowItem} from '../../components/RowItem';
import {NativeBaseProvider} from 'native-base';
import {Image, Svg} from 'react-native-svg';
import historyBack from '../../assets/history-back.jpeg';
import {SECUNDARY} from '../../styles/colors';

const History = () => (
  <NativeBaseProvider>
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          marginTop: 20,
          paddingHorizontal: 20,
          gap: 20,
        }}>
        <Text style={Fonts.title}>Histórico de uso</Text>
        <FlexDiv direction="column" gap={10}>
          {mockHistory.map((item, index) => {
            return (
              <RowItem key={index}>
                <FlexDiv direction="row" gap={10} aligment="center">
                  <Svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="white"
                    style={{backgroundColor: 'trasparent'}}>
                    <Image width={24} height={24} href={historyBack} st />
                  </Svg>
                  <FlexDiv direction="column" gap={5}>
                    <Text style={Fonts.thinBlack}>{item.horarioEntrada}</Text>
                    <Text style={Fonts.labelBlue}>AutoPosto FGA</Text>
                  </FlexDiv>
                </FlexDiv>
                <Text style={{...Fonts.bold, color: SECUNDARY, fontSize: 14}}>
                  {'Detalhes >'}
                </Text>
              </RowItem>
            );
          })}
        </FlexDiv>
      </View>
    </ScrollView>
  </NativeBaseProvider>
);

export default History;
