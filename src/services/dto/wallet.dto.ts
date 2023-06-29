export interface RequestCredits {
  qtdCreditosSolicitados: number;
}

export interface RequestCreditsResult {
  cpf: string;
  idCarteira: number;
  qtdCreditos: number;
  qtdCreditosSolicitados: number;
}
