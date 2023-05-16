import api from '../../config/api';

export const getAllUsers = async (): Promise<Result<User[]>> => {
  try {
    const res = await api.get<User>(`/users/`);

    return {type: 'success', value: res.data} as unknown as Result<User[]>;
  } catch (error) {
    if (error instanceof Error) return {type: 'error', error, value: undefined};

    return {
      type: 'error',
      error: new Error('Erro desconhecido'),
      value: undefined,
    };
  }
};


export const getUserByCpf = async (cpf: string): Promise<Result<User>> => {
  try {
    const res = await api.get<User>(`/users/user/cpf/${cpf}`);

    return {type: 'success', value: res.data} as unknown as Result<User>;
  } catch (error) {
    if (error instanceof Error) return {type: 'error', error, value: undefined};

    return {
      type: 'error',
      error: new Error('Erro desconhecido'),
      value: undefined,
    };
  }
};

export const getUserByUid = async (firebase_uid: string): Promise<Result<User>> => {
  try {
    const res = await api.get<User>(`/users/user/uid/${firebase_uid}`);

    return {type: 'success', value: res.data} as unknown as Result<User>;
  } catch (error) {
    if (error instanceof Error) return {type: 'error', error, value: undefined};

    return {
      type: 'error',
      error: new Error('Erro desconhecido'),
      value: undefined,
    };
  }
};

export const createUser = async (payload: User, firebase_uid: string): Promise<Result<User>> => {
  try {
    const res = await api.post<User>(`/users/register/${firebase_uid}`, payload);
    return {type: 'success', value: res.data} as unknown as Result<User>;
  } catch (error) {
    if (error instanceof Error) return {type: 'error', error, value: undefined};

    return {
      type: 'error',
      error: new Error('Erro desconhecido'),
      value: undefined,
    };
  }
};

