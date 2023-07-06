import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Fonts} from '../../../styles/fonts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import {SECUNDARY, PRIMARY, WHITE} from '../../../styles/colors';
import StyledButton from '../../../components/Button';
dayjs.locale('pt-br');

const Details = ({handleBack, history}) => {
  const handleFormatDate = (date: Date) => {
    const currentDate = dayjs(date);
    return currentDate.format('D MMMM YYYY, HH:mm');
  };

  const handleUsageTime = (date1, date2) => {
    const startDate = dayjs(date1);
    const endDate = dayjs(date2);

    const diffInMinutes = endDate.diff(startDate, 'minutes');

    return diffInMinutes;
  };

  return (
    <View>
      <Text style={{...Fonts.title, textAlign: 'center', marginBottom: 20}}>
        Detalhes de Uso
      </Text>
      <View style={styles.historyDetail}>
        <View style={{gap: 5}}>
          <Text style={{...Fonts.detailTitle, marginBottom: 3}}>
            Posto:{' '}
            <Text style={{...Fonts.detailText}}>{history.posto.nome}</Text>
          </Text>
          <Text style={{...Fonts.detailTitle, marginBottom: 3}}>
            Entrada:{' '}
            <Text style={{...Fonts.detailText}}>
              {handleFormatDate(history.horarioEntrada)}
            </Text>
          </Text>
          <Text style={{...Fonts.detailTitle, marginBottom: 3}}>
            Saída:{' '}
            <Text style={{...Fonts.detailText}}>
              {handleFormatDate(history.horarioSaida)}
            </Text>
          </Text>
          <Text style={{...Fonts.detailTitle, marginBottom: 3}}>
            Tempo de uso:{' '}
            <Text style={{...Fonts.detailText}}>
              {handleUsageTime(history.horarioEntrada, history.horarioSaida)}{' '}
              minutos
            </Text>
          </Text>
          <Text style={{...Fonts.detailTitle, marginBottom: 3}}>
            Carro:{' '}
            <Text style={{...Fonts.detailText}}>{history.carro.modelo}</Text>
          </Text>
          <Text style={{...Fonts.detailTitle, marginBottom: 3}}>
            Placa:{' '}
            <Text style={{...Fonts.detailText}}>{history.carro.placa}</Text>
          </Text>
          <Text style={{...Fonts.detailTitle, marginBottom: 3}}>
            Custo:{' '}
            <Text style={{...Fonts.detailText}}>
              {history.valorTotal}{' '}
              <FontAwesome5 name="coins" color={SECUNDARY} size={25} />
            </Text>
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <StyledButton
          title="Voltar"
          backgroundColor={PRIMARY}
          color={WHITE}
          onPress={handleBack}
          width="80%"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  historyDetail: {
    display: 'flex',
    width: '100%',
    height: 'auto',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  textDetail: {
    gap: 3,
  },
});

export default Details;
