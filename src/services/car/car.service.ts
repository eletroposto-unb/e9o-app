import api from '../../config/api';

export const getAllCars = async (): Promise<Result<Car[]>> => {
  try {
    const res = await api.get<Car>(`/cars/`);

    return {type: 'success', value: res.data} as unknown as Result<Car[]>;
  } catch (error) {
    if (error instanceof Error) return {type: 'error', error, value: undefined};

    return {
      type: 'error',
      error: new Error('Erro desconhecido'),
      value: undefined,
    };
  }
};

export const createCar = async (
  payload: formCarData,
): Promise<Result<formCarData>> => {
  try {
    const res = await api.post<formCarData>(`/cars/register/`, payload);
    return {type: 'success', value: res.data} as unknown as Result<Car>;
  } catch (error) {
    if (error instanceof Error) return {type: 'error', error, value: undefined};

    return {
      type: 'error',
      error: new Error('Erro desconhecido'),
      value: undefined,
    };
  }
};

export const deleteCar = async (id: number): Promise<Result<formCarData>> => {
  try {
    const res = await api.delete<formCarData>(`/cars/car/${id}`);
    return {type: 'success', value: res.data} as unknown as Result<Car>;
  } catch (error) {
    if (error instanceof Error) return {type: 'error', error, value: undefined};

    return {
      type: 'error',
      error: new Error('Erro desconhecido'),
      value: undefined,
    };
  }
};

export const getCarsByCpf = async (cpf: string): Promise<Result<Car[]>> => {
  try {
    const res = await api.get<Car>(`/cars/user/${cpf}`);

    return {type: 'success', value: res.data} as unknown as Result<Car[]>;
  } catch (error) {
    if (error instanceof Error) return {type: 'error', error, value: undefined};

    return {
      type: 'error',
      error: new Error('Erro desconhecido'),
      value: undefined,
    };
  }
};
