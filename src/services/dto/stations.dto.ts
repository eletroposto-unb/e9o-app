export interface StationsDTO {
  station: Station;
  address: Address;
}

export interface Station {
  cabo: boolean;
  idPosto: number;
  precoKwh: number;
  tipoTomada: string;
  idEndereco: number;
  statusFuncionamento: string;
  nome: string;
  descricao: string;
  horarioFuncionamento: string;
  potencia: number;
}

export interface Address {
  cep: string;
  comodidade: string;
  longitude: number;
  cidade: string;
  numero: number;
  latitude: number;
  idEndereco: number;
  estado: string;
  endereco: string;
  complemento: string;
}
