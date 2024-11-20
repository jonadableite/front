// Definição do tipo Profissional, que representa um profissional associado a uma empresa
export type Profissional = {
  id: string; // Identificador único do profissional
  name: string; // Nome do profissional
  person: string; // Nome da pessoa associada ao profissional
  phone: string; // Número de telefone do profissional
  active: boolean; // Indicador se o profissional está ativo
  image: string; // URL de uma imagem associada ao profissional
  createdAt: Date; // Data de criação do registro do profissional
  updatedAt: Date; // Data da última atualização do registro do profissional
  hours: string; // Horas de trabalho do profissional, no formato string
  companybarberId: string; // Identificador da empresa associado ao profissional
};
