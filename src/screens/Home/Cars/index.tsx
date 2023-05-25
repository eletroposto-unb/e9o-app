import React, {useState, useContext} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {mockCarros} from './_mockCarros';
import {RowItem} from '../../../components/RowItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {FlexDiv} from '../../../components/DisplayFlex/FlexDiv';
import {Button, Center, Icon, useToast, Box, Alert} from 'native-base';
import {PRIMARY, WHITE, BACKGROUND, WARNING} from '../../../styles/colors';
import {Fonts} from '../../../styles/fonts';
import Svg, {Image} from 'react-native-svg';
import Car from '../../../assets/car.png';
import StyledButton from '../../../components/Button';
import {useForm, Controller} from 'react-hook-form';
import InputForm from '../../../components/Input';
import SpinnerLoading from '../../../components/SpinnerLoading';
import {createCar} from '../../../services/car/car.service';
import {formatCarPayload} from '../../../utils/formatPayload';
import {AuthContext} from '../../../context/authProvider';
import {getUser} from '../../../context/asyncStorage';

const Cars = () => {
  const toast = useToast();
  const {user} = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const {
    reset,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<formCarData>();

  const handleAddCarButton = () => {
    setPage(2);
  };

  const onSubmit = async (data: formCarData) => {
    setLoading(true);
    const user = await getUser();
    const payload = formatCarPayload(data, user);
    console.log('PAYLOAD', payload);
    const carCreated = await createCar(payload);
    if (carCreated.value) {
      console.log('carCreated', carCreated);
      toast.show({
        render: () => {
          return (
            <Box
              bg={`error.100`}
              px="3"
              py="2"
              rounded="sm"
              mb={5}
              style={styles.toastMessage}>
              <MaterialCommunityIcons
                name="check-circle"
                size={20}
                color={'green'}
              />
              <Text style={{marginLeft: 2}}>Carro cadastrado com sucesso!</Text>
            </Box>
          );
        },
      });
      reset();
    } else {
      toast.show({
        render: () => {
          return (
            <Box
              bg={`warning.100`}
              px="3"
              py="2"
              rounded="sm"
              mb={5}
              style={styles.toastMessage}>
              <Alert.Icon style={{marginRight: 10}} />
              <Text style={{marginLeft: 2}}>
                Carro não cadastrado, tente novamente!
              </Text>
            </Box>
          );
        },
      });
    }

    setLoading(false);
  };

  if (page === 1) {
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.carListingcontainer}>
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
              <MaterialCommunityIcons name="plus" size={30} color={'white'} />
            </Button>
          </Center>
        </View>
      </ScrollView>
    );
  } else if (page === 2) {
    return (
      <ScrollView>
        <View style={styles.carCreatingContainer}>
          <Text style={styles.inputLabel}>Modelo</Text>
          <Controller
            control={control}
            name="modelo"
            rules={{
              required: 'Nome do Modelo Obrigatório',
            }}
            render={({field: {value, onChange}}) => (
              <InputForm
                backgroundColor={WHITE}
                borderColor={BACKGROUND}
                color={BACKGROUND}
                borderWidth={1}
                variant="rounded"
                placeHolder="Ex: Volvo XC40"
                value={value}
                secureTextEntry={false}
                autoCapitalize="words"
                onChangeText={onChange}
              />
            )}
          />
          {errors?.modelo && (
            <Text style={styles.messageError}>{errors.modelo.message}</Text>
          )}
          <Text style={styles.inputLabel}>Marca</Text>
          <Controller
            control={control}
            name="marca"
            rules={{
              required: 'Nome da Marca Obrigatória',
            }}
            render={({field: {value, onChange}}) => (
              <InputForm
                backgroundColor={WHITE}
                borderColor={BACKGROUND}
                color={BACKGROUND}
                borderWidth={1}
                variant="rounded"
                placeHolder="Ex: Volvo"
                value={value}
                secureTextEntry={false}
                autoCapitalize="words"
                onChangeText={onChange}
              />
            )}
          />
          {errors?.marca && (
            <Text style={styles.messageError}>{errors.marca.message}</Text>
          )}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '49%'}}>
              <Text style={styles.inputLabel}>Placa</Text>
              <Controller
                control={control}
                name="placa"
                rules={{
                  required: 'Placa Obrigatória',
                }}
                render={({field: {value, onChange}}) => (
                  <InputForm
                    backgroundColor={WHITE}
                    borderColor={BACKGROUND}
                    color={BACKGROUND}
                    borderWidth={1}
                    variant="rounded"
                    placeHolder="Ex: BSB0000"
                    value={value}
                    secureTextEntry={false}
                    autoCapitalize="words"
                    onChangeText={onChange}
                  />
                )}
              />
              {errors?.placa && (
                <Text style={styles.messageError}>{errors.placa.message}</Text>
              )}
            </View>
            <View style={{width: '49%'}}>
              <Text style={styles.inputLabel}>Ano</Text>
              <Controller
                control={control}
                name="ano"
                rules={{
                  required: 'Ano Obrigatório',
                }}
                render={({field: {value, onChange}}) => (
                  <InputForm
                    backgroundColor={WHITE}
                    borderColor={BACKGROUND}
                    color={BACKGROUND}
                    borderWidth={1}
                    variant="rounded"
                    placeHolder="Ex: 2023"
                    value={value}
                    secureTextEntry={false}
                    autoCapitalize="words"
                    onChangeText={onChange}
                    width={'100%'}
                  />
                )}
              />
              {errors?.ano && (
                <Text style={styles.messageError}>{errors.ano.message}</Text>
              )}
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '49%'}}>
              <Text style={styles.inputLabel}>Tipo</Text>
              <Controller
                control={control}
                name="tipo"
                rules={{
                  required: 'Tipo Obrigatório',
                }}
                render={({field: {value, onChange}}) => (
                  <InputForm
                    backgroundColor={WHITE}
                    borderColor={BACKGROUND}
                    color={BACKGROUND}
                    borderWidth={1}
                    variant="rounded"
                    placeHolder="Ex: Elétrico"
                    value={value}
                    secureTextEntry={false}
                    onChangeText={onChange}
                    width={'100%'}
                  />
                )}
              />
              {errors?.tipo && (
                <Text style={styles.messageError}>{errors.tipo.message}</Text>
              )}
            </View>
            <View style={{width: '49%'}}>
              <Text style={styles.inputLabel}>Plug</Text>
              <Controller
                control={control}
                name="tipoPlug"
                rules={{
                  required: 'Plug Obrigatório',
                }}
                render={({field: {value, onChange}}) => (
                  <InputForm
                    backgroundColor={WHITE}
                    borderColor={BACKGROUND}
                    color={BACKGROUND}
                    borderWidth={1}
                    variant="rounded"
                    placeHolder="Ex: Tipo 2"
                    value={value}
                    secureTextEntry={false}
                    autoCapitalize="none"
                    onChangeText={onChange}
                    width={'100%'}
                  />
                )}
              />
              {errors?.tipoPlug && (
                <Text style={styles.messageError}>
                  {errors.tipoPlug.message}
                </Text>
              )}
            </View>
          </View>
          <StyledButton
            title="SALVAR"
            backgroundColor={PRIMARY}
            color={WHITE}
            onPress={handleSubmit(onSubmit)}
          />
          <Center>
            <Text style={styles.sair} onPress={() => setPage(1)}>
              SAIR
            </Text>
          </Center>
          {loading && <SpinnerLoading color={BACKGROUND} />}
        </View>
      </ScrollView>
    );
  }
};

export default Cars;

const styles = StyleSheet.create({
  carListingcontainer: {
    width: '100%',
    display: 'flex',
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '90%',
    paddingHorizontal: 5,
  },
  carCreatingContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    marginTop: 20,
  },
  inputLabel: {
    marginLeft: 5,
    marginBottom: 3,
    color: BACKGROUND,
    fontSize: 16,
    fontWeight: '600',
  },
  loggendAreaInput: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    height: 50,
    fontSize: 16,
    lineHeight: 19,
  },
  sair: {
    color: BACKGROUND,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  messageError: {
    display: 'flex',
    width: '100%',
    marginLeft: 20,
    color: WARNING,
    textAlign: 'left',
    marginBottom: 7,
  },
  toastMessage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
