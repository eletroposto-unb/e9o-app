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

  type Result<T> = ResultSuccess<T> | ResultError;
  type ResultSuccess<T> = {type: 'success'; value: T};
  type ResultError = {type: 'error'; error: Error; value: undefined};
}
