import React, {useState, useEffect, useContext} from 'react';
import {View, Text, ScrollView, StyleSheet, RefreshControl} from 'react-native';
import {Center} from 'native-base';
import {Fonts} from '../../styles/fonts';
import {FlexDiv} from '../../components/DisplayFlex/FlexDiv';
import {NativeBaseProvider} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SECUNDARY, WHITE, BACKGROUND} from '../../styles/colors';
import Details from './Details';
import dayjs from 'dayjs';
import NoHistoryMessage from './NoHistoryMessage';
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');

import {getHistoryByCpf} from '../../services/history';
import {AuthContext} from '../../context/authProvider';
import {TouchableOpacity} from 'react-native-gesture-handler';

const History = () => {
  const {user} = useContext(AuthContext);
  const [histories, setHistories] = useState<History[]>([]);
  const [showDetails, setShowDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleShowDetails = detail => {
    setShowDetails(detail);
  };

  useEffect(() => {
    user && handleHistory();
  }, []);

  const handleHistory = async () => {
    setLoading(true);
    const res = await getHistoryByCpf(user.cpf);
    console.log('first', res.value?.history.length);
    setHistories(res.value?.history);
    setLoading(false);
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
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleHistory}
            colors={[BACKGROUND]}
            tintColor={BACKGROUND}
          />
        }>
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
              {histories.length >= 1 && (
                <Text style={{...Fonts.title, textAlign: 'center'}}>
                  Histórico de uso
                </Text>
              )}
              {histories.length >= 1 ? (
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
                          {history?.posto.nome}
                        </Text>
                      </FlexDiv>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <Center>
                  <NoHistoryMessage />
                </Center>
              )}
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
