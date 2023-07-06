export {};

declare global {
  type Wallet = {
    idCarteira: number;
    qtdCreditos: number;
    qtdCreditosSolicitados: number;
    cpf: string;
  };

  type User = {
    name: string;
    surname: string;
    email: string;
    cpf: string;
    is_admin?: boolean;
    telefone?: string;
    status: string;
    firebase_uid?: string;
    wallet?: Wallet;
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

  type History = {
    horarioEntrada: Date;
    horarioSaida: Date;
    valorTotal: number;
    idPosto: number;
    cpf: string;
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

  type station = {
    idPosto?: number;
    nome: string;
    descricao: string;
    horarioFuncionamento: string;
    tipoTomada: string;
    comodidade: string;
    statusFuncionamento: string;
    precoKwh: number;
    cabo: any;
    potencia: number;
  };

  type address = {
    latitude?: number;
    longitude?: number;
    endereco: string;
    estado: string;
    cep: string;
    cidade: string;
    numero: number;
    complemento: string;
  };

  type ChargeStation = {
    station: station;
    address: address;
  };
  type Result<T> = ResultSuccess<T> | ResultError;
  type ResultSuccess<T> = {type: 'success'; value: T};
  type ResultError = {type: 'error'; error: Error; value: undefined};
}
