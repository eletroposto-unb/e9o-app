import api from '../../config/api';
import {RequestCredits, RequestCreditsResult} from '../dto/wallet.dto';

export const requestCredits = async (
  cpf: string,
  payload: RequestCredits,
): Promise<any> => {
  try {
    const res = await api.put('/wallet/creditosSolicitados/{cpf}', payload, {
      params: {cpf},
    });

    return {type: 'success', value: res.data as RequestCreditsResult};
  } catch (error) {
    console.log('error', error);
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

export const getCredits = async (cpf: string): Promise<any> => {
  try {
    const res = await api.get('/wallet/credits/' + cpf);

    return {type: 'success', value: res.data as RequestCreditsResult};
  } catch (error) {
    console.log('error', error);
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
