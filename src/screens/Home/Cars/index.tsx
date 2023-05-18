import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {mockCarros} from './_mockCarros';
import {RowItem} from '../../../components/RowItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {FlexDiv} from '../../../components/DisplayFlex/FlexDiv';
import {Button, Center, Input} from 'native-base';
import {ERROR, PRIMARY, WHITE} from '../../../styles/colors';
import {Fonts} from '../../../styles/fonts';
import Svg, {Image} from 'react-native-svg';
import Car from '../../../assets/car.png';
import StyledButton from '../../../components/Button';

const Cars = () => {
  const [page, setPage] = React.useState(1);

  const handleAddCarButton = () => {
    setPage(2);
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '95%',
          paddingHorizontal: 5,
        }}>
        {
          // THIS SHOULD BE A COMPONENT BUT I'M LAZY
          page === 1 && (
            <>
              {mockCarros.map((carro, id) => {
                return (
                  <RowItem key={`${carro.modelo}-${id}`}>
                    <FlexDiv direction="row" aligment="center" gap={15}>
                      <Svg width={50} height={45}>
                        <Image href={Car} width={50} height={45} />
                      </Svg>
                      <FlexDiv direction="column" aligment="flex-start" gap={5}>
                        <Text style={Fonts?.labelBlue}>{carro.modelo}</Text>
                        <Text>{carro.marca}</Text>
                      </FlexDiv>
                    </FlexDiv>
                  </RowItem>
                );
              })}
              <Center>
                <Button
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: PRIMARY,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={handleAddCarButton}>
                  <MaterialCommunityIcons
                    name="plus"
                    size={30}
                    color={'white'}
                  />
                </Button>
              </Center>
            </>
          )
        }
        {
          // THIS SHOULD BE A COMPONENT BUT I'M LAZY
          page === 2 && (
            <FlexDiv direction="column" aligment="flex-start" gap={20}>
              <FlexDiv direction="column" gap={5} width={'100%'}>
                <Text style={{...Fonts.labelBlue}}>Modelo</Text>
                <Input
                  variant="rounded"
                  placeholder="Modelo"
                  style={loggendAreaInput}
                />
              </FlexDiv>
              <FlexDiv direction="column" gap={5} width={'100%'}>
                <Text style={{...Fonts.labelBlue}}>Marca</Text>
                <Input
                  variant="rounded"
                  placeholder="Marca"
                  style={loggendAreaInput}
                />
              </FlexDiv>
              <FlexDiv width={'100%'} direction="row" justify="space-between">
                <FlexDiv direction="column" gap={5} width={'45%'}>
                  <Text style={{...Fonts.labelBlue}}>Placa</Text>
                  <Input
                    variant="rounded"
                    placeholder="Placa"
                    style={loggendAreaInput}
                  />
                </FlexDiv>
                <FlexDiv direction="column" gap={5} width={'45%'}>
                  <Text style={{...Fonts.labelBlue}}>Ano</Text>
                  <Input
                    variant="rounded"
                    placeholder="Ano"
                    style={loggendAreaInput}
                  />
                </FlexDiv>
              </FlexDiv>

              <FlexDiv direction="column" gap={5} width={'60%'}>
                <Text style={{...Fonts.labelBlue}}>Tipo</Text>
                <Input
                  variant="rounded"
                  placeholder="Tipo"
                  style={loggendAreaInput}
                />
              </FlexDiv>
              <FlexDiv direction="column" gap={5} width={'60%'}>
                <Text style={{...Fonts.labelBlue}}>Plug</Text>
                <Input
                  variant="rounded"
                  placeholder="Plug"
                  style={loggendAreaInput}
                />
              </FlexDiv>
              <FlexDiv direction="column" gap={1} width={'100%'}>
                <StyledButton
                  title="SALVAR"
                  onPress={() => setPage(1)}
                  backgroundColor={PRIMARY}
                  color={WHITE}
                />
                <StyledButton
                  title="CANCELAR"
                  onPress={() => setPage(1)}
                  backgroundColor={ERROR}
                  color={WHITE}
                />
              </FlexDiv>
            </FlexDiv>
          )
        }
      </View>
    </ScrollView>
  );
};

export default Cars;

const loggendAreaInput = {
  // width: '100%',
  backgroundColor: '#FFF',
  borderRadius: 20,
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 20,
  paddingRight: 20,
  height: 50,
  fontSize: 16,
  lineHeight: 19,
};
