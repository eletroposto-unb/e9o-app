import api from '../../config/api';

export const getAllStations = async (): Promise<Result<ChargeStation[]>> => {
  try {
    const res = await api.get<ChargeStation>(`/stations/`);

    return {type: 'success', value: res.data} as unknown as Result<
      ChargeStation[]
    >;
  } catch (error) {
    if (error instanceof Error) return {type: 'error', error, value: undefined};

    return {
      type: 'error',
      error: new Error('Erro desconhecido'),
      value: undefined,
    };
  }
};
