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
import {Controller} from 'react-hook-form';
import InputForm from '../../../components/Input';

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
            <FlexDiv direction="column" aligment="flex-start" gap={10}>
              <Text>ADD CAR</Text>
              <FlexDiv direction="column" gap={5} width={'100%'}>
                <Text>Modelo</Text>
                <Input variant="rounded" placeholder="Modelo" />
              </FlexDiv>
              <FlexDiv direction="column" gap={5} width={'100%'}>
                <Text>Marca</Text>
                <Input variant="rounded" placeholder="Marca" />
              </FlexDiv>
              <FlexDiv direction="column" gap={5} width={'100%'}>
                <Text>Placa</Text>
                <Input variant="rounded" placeholder="Placa" />
              </FlexDiv>
              <FlexDiv direction="column" gap={5} width={'100%'}>
                <Text>Ano</Text>
                <Input variant="rounded" placeholder="Ano" />
              </FlexDiv>
              <FlexDiv direction="column" gap={5} width={'100%'}>
                <Text>Tipo</Text>
                <Input variant="rounded" placeholder="Tipo" />
              </FlexDiv>
              <FlexDiv direction="column" gap={5} width={'100%'}>
                <Text>Plug</Text>
                <Input variant="rounded" placeholder="Plug" />
              </FlexDiv>
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
  paddingHorizontal: 20,
  paddingVertical: 16,
  border: '1px solid #BDBDBD',
};
