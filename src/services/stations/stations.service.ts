import api from '../../config/api';
import {Station} from '../dto/Stations.dto';

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
