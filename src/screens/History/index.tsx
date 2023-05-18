import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Button} from 'react-native';
import {Fonts} from '../../styles/fonts';
import {FlexDiv} from '../../components/DisplayFlex/FlexDiv';
import {mockHistory} from './_mockHistory';
import {RowItem} from '../../components/RowItem';
import {NativeBaseProvider} from 'native-base';
import {Image, Svg} from 'react-native-svg';
import historyBack from '../../assets/history-back.jpeg';
import coin from '../../assets/coin.png';
import {SECUNDARY} from '../../styles/colors';
import dayjs from 'dayjs';

const History = () => {
  const [showDetails, setShowDetails] = useState<any>(null);

  const handleShowDetails = (index: number) => {
    setShowDetails(mockHistory[index]);
  };

  console.log(!!showDetails);

  return (
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
          {showDetails === null && (
            <>
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
                          <Text style={Fonts.thinBlack}>
                            {item.horarioEntrada}
                          </Text>
                          <Text style={Fonts.labelBlue}>AutoPosto FGA</Text>
                        </FlexDiv>
                      </FlexDiv>
                      <TouchableOpacity
                        onPress={() => handleShowDetails(index)}>
                        <Text
                          style={{
                            ...Fonts.bold,
                            color: SECUNDARY,
                            fontSize: 14,
                          }}>
                          {'Detalhes >'}
                        </Text>
                      </TouchableOpacity>
                    </RowItem>
                  );
                })}
              </FlexDiv>
            </>
          )}
          {showDetails && (
            <Detalhes
              handleBack={() => setShowDetails(null)}
              data={showDetails}
            />
          )}
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default History;

interface DetalhesProps {
  handleBack: () => void;
  data: any;
}

const Detalhes = ({handleBack, data}: DetalhesProps) => {
  return (
    <>
      <Text style={Fonts.title}>Detalhes de uso</Text>
      <FlexDiv direction="column" gap={10}>
        <RowItem>
          <FlexDiv direction="column" gap={10}>
            <FlexDiv direction="column" gap={5}>
              <Text style={{...Fonts.labelBlue, fontSize: 24}}>Local</Text>
              <Text
                style={{...Fonts.thinBlack, fontSize: 20, color: '#4F4F4F'}}>
                {data.posto.endereco}
              </Text>
            </FlexDiv>
            <Divider />
            <FlexDiv direction="column" gap={5}>
              <Text style={{...Fonts.labelBlue, fontSize: 24}}>Horario</Text>
              <Text
                style={{...Fonts.thinBlack, fontSize: 20, color: '#4F4F4F'}}>
                {data.horarioEntrada}
              </Text>
            </FlexDiv>
            <Divider />
            <FlexDiv direction="column" gap={5}>
              <Text style={{...Fonts.labelBlue, fontSize: 24}}>
                Tempo de uso
              </Text>
              <Text
                style={{...Fonts.thinBlack, fontSize: 20, color: '#4F4F4F'}}>
                {dayjs(data.horarioSaida).diff(dayjs(data.horarioEntrada), 'm')}
              </Text>
            </FlexDiv>
            <Divider />
            <FlexDiv direction="column" gap={5}>
              <Text style={{...Fonts.labelBlue, fontSize: 24}}>Preço</Text>
              <FlexDiv direction="row" gap={10}>
                <Text
                  style={{...Fonts.thinBlack, fontSize: 20, color: '#4F4F4F'}}>
                  {data.valorTotal.toString() + ' moedas'}
                </Text>
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <Image width={24} height={24} href={coin} />
                </Svg>
              </FlexDiv>
            </FlexDiv>
          </FlexDiv>
        </RowItem>
        <Button onPress={handleBack} title="Voltar" />
      </FlexDiv>
    </>
  );
};

const Divider = () => {
  return (
    <View
      style={{
        width: '100%',
        height: 1,
        backgroundColor: '#BDBDBD',
        marginVertical: 10,
      }}
    />
  );
};
