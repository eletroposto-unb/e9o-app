import api from '../../config/api';

export const getAllStations = async (): Promise<Result<[]>> => {
  try {
    const res = await api.get('/stations/');

    return {type: 'success', value: res.data} as unknown as Result<[]>;
  } catch (error) {
    if (error instanceof Error) {
      return {type: 'error', error, value: undefined};
    }

    return {
      type: 'error',
      error: new Error('Erro desconhecido'),
      value: undefined,
    };
  }
};
