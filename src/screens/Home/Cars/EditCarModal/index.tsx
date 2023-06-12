import React, {useState} from 'react';
import {Modal, StyleSheet, View, Text, ScrollView} from 'react-native';
import {Center, Button} from 'native-base';
import {useForm, Controller} from 'react-hook-form';
import AntDesign from 'react-native-vector-icons/AntDesign';
import InputForm from '../../../../components/Input';
import StyledButton from '../../../../components/Button';
import {
  WHITE,
  PRIMARY,
  SECUNDARY,
  BACKGROUND,
  WARNING,
} from '../../../../styles/colors';

type modalProps = {
  openModal: boolean;
  currentCar: Car;
  handleCloseModal: any;
};

const EditCarModal = ({
  openModal,
  currentCar,
  handleCloseModal,
}: modalProps) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<formCarData>({
    defaultValues: {
      modelo: currentCar.modelo,
      marca: currentCar.marca,
      placa: currentCar.placa,
      ano: String(currentCar.ano),
      tipo: currentCar.tipo,
      tipoPlug: currentCar.tipoPlug,
    },
  });
  const {
    reset,
    control,
    handleSubmit,
    formState: {errors},
  } = form;

  const onSubmit = async (data: formCarData) => {
    console.log('DATA', data);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={openModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <AntDesign
              name={'close'}
              size={30}
              color={PRIMARY}
              onPress={handleCloseModal}
            />
          </View>
          <View style={styles.main}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 22,
                fontWeight: 'bold',
                color: PRIMARY,
              }}>
              Edição de Carro
            </Text>
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
                  </View>
                </View>
                <StyledButton
                  title="SALVAR"
                  backgroundColor={PRIMARY}
                  color={WHITE}
                  onPress={handleSubmit(onSubmit)}
                  loading={loading}
                  loadingColor={SECUNDARY}
                />
                <Center>
                  <Text style={styles.sair} onPress={handleCloseModal}>
                    SAIR
                  </Text>
                </Center>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditCarModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalView: {
    width: '90%',
    height: 'auto',
    backgroundColor: WHITE,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  header: {
    width: '100%',
    alignItems: 'flex-end',
    height: 'auto',
  },
  main: {
    width: '100%',
    height: 'auto',
    paddingBottom: 20,
  },
  carListingcontainer: {
    width: '100%',
    display: 'flex',
    marginTop: 20,
    flexDirection: 'column',
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
