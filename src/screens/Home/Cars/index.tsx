import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {mockCarros} from './_mockCarros';
import {RowItem} from '../../../components/RowItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {FlexDiv} from '../../../components/DisplayFlex/FlexDiv';
import {Button, Center} from 'native-base';
import {PRIMARY} from '../../../styles/colors';
import {Fonts} from '../../../styles/fonts';
import Svg, {Image} from 'react-native-svg';
import Car from '../../../assets/car.png';

const Cars = () => {
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
            }}>
            <MaterialCommunityIcons name="plus" size={30} color={'white'} />
          </Button>
        </Center>
      </View>
    </ScrollView>
  );
};

export default Cars;
