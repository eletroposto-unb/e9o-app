export {};

declare global {
  type User = {
    name: string;
    surname: string;
    email: string;
    cpf: string;
    is_admin?: boolean;
    telefone?: string;
    status: string;
    firebase_uid?: string;
  };

  type formData = {
    name: string;
    email: string;
    cpf: string;
    password: string;
    confirm_password: string;
  };

  type formCarData = {
    placa: string;
    modelo: string;
    cpf: string;
    marca: boolean;
    tipo: string;
    ano: number;
    tipoPlug: string;
    cpf?: string;
  };

  type Car = {
    id: number;
    placa: string;
    modelo: string;
    cpf: string;
    marca: boolean;
    tipo: string;
    ano: number;
    tipoPlug: string;
    cpf?: string;
  };

  type Result<T> = ResultSuccess<T> | ResultError;
  type ResultSuccess<T> = {type: 'success'; value: T};
  type ResultError = {type: 'error'; error: Error; value: undefined};
}
