import React, {useState, useEffect, useContext} from 'react';
import {View, Text, ScrollView, Button, StyleSheet} from 'react-native';
import {Fonts} from '../../styles/fonts';
import {FlexDiv} from '../../components/DisplayFlex/FlexDiv';
import {RowItem} from '../../components/RowItem';
import {NativeBaseProvider} from 'native-base';
import {Image, Svg} from 'react-native-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import coin from '../../assets/coin.png';
import {SECUNDARY, WHITE} from '../../styles/colors';
import Details from './Details';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');

import {getHistoryByCpf} from '../../services/history';
import {AuthContext} from '../../context/authProvider';
import {TouchableOpacity} from 'react-native-gesture-handler';

const History = () => {
  const {user} = useContext(AuthContext);
  const [histories, setHistories] = useState<History[]>([]);
  const [showDetails, setShowDetails] = useState<any>(null);

  const handleShowDetails = detail => {
    setShowDetails(detail);
  };

  useEffect(() => {
    user && handleHistory();
  }, []);

  const handleHistory = async () => {
    const res = await getHistoryByCpf(user.cpf);
    console.log('first', res.value?.history.length);
    setHistories(res.value?.history);
  };

  const handleFormatDate = (date: Date) => {
    const currentDate = dayjs(date);
    return currentDate.format('D MMMM YYYY, HH:mm');
  };

  const handleBack = () => {
    setShowDetails(null);
  };

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
          {showDetails === null ? (
            <>
              <Text style={{...Fonts.title, textAlign: 'center'}}>
                Histórico de uso
              </Text>
              {histories.length >= 1 &&
                histories.map((history, index) => {
                  return (
                    <TouchableOpacity
                      gap={10}
                      aligment="center"
                      style={styles.historyCard}
                      key={index}
                      onPress={() => handleShowDetails(history)}>
                      <MaterialCommunityIcons
                        name={'history'}
                        size={35}
                        color={SECUNDARY}
                        style={{marginRight: 10}}
                      />
                      <FlexDiv direction="column" gap={5}>
                        <Text style={Fonts.thinBlack}>
                          {handleFormatDate(history.horarioEntrada)}
                        </Text>
                        <Text style={Fonts.labelBlue} numberOfLines={2}>
                          {history.posto.nome}
                        </Text>
                      </FlexDiv>
                    </TouchableOpacity>
                  );
                })}
            </>
          ) : (
            <Details handleBack={handleBack} history={showDetails} />
          )}
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  historyCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: WHITE,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

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
