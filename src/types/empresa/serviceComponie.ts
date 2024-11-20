// Definição do tipo ServiceCompanie, que representa um serviço oferecido por uma empresa
export type ServiceCompanie = {
  id: string; // Identificador único do serviço
  name: string; // Nome do serviço
  person: string; // Nome da pessoa responsável pelo serviço
  phone: string; // Número de telefone para contato
  active: boolean; // Indicador se o serviço está ativo
  image: string; // URL de uma imagem associada ao serviço
  createdAt: Date; // Data de criação do registro do serviço
  updatedAt: Date; // Data da última atualização do registro do serviço
  hours: string; // Horário de funcionamento do serviço, no formato string
  companybarberId: string; // Identificador da empresa que oferece o serviço
  price: number; // Preço do serviço
  time: string; // Duração do serviço, no formato string
};
