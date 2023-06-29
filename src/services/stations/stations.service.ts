import api from '../../config/api';
import {Station, StationsDTO} from '../dto/stations.dto';

export const getAllStations = async (): Promise<Result<StationsDTO[]>> => {
  try {
    const res = await api.get('/stations/');

    return {type: 'success', value: res.data} as unknown as Result<
      StationsDTO[]
    >;
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

export const getStationById = async (
  id: number,
): Promise<Result<Station | undefined>> => {
  try {
    const res = await api.get(`/stations/station/${id}`);

    return {type: 'success', value: res.data.station} as unknown as Result<
      Station | undefined
    >;
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

export const startCharge = async (
  id: number,
  minutes: number,
): Promise<String> => {
  try {
    const res = await api.post(`/stations/activate/${id}`, {
      charge_time: minutes,
    });

    return res.status.toString();
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }

    return 'Erro desconhecido';
  }
};
