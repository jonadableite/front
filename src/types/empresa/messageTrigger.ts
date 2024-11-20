// Definição do tipo MessageTrigger, que representa um gatilho de mensagem
export type MessageTrigger = {
  id: string; // Identificador único do gatilho de mensagem
  name: string; // Nome do gatilho de mensagem
  person: string; // Nome da pessoa associada ao gatilho
  phone: string; // Número de telefone da pessoa associada
  active: boolean; // Indicador se o gatilho está ativo
  image: string; // URL de uma imagem associada ao gatilho
  createdAt: string; // Data de criação do gatilho, no formato string
  updatedAt: string; // Data da última atualização do gatilho, no formato string
  data: string; // Dados adicionais associados ao gatilho, no formato string
  enviado: boolean; // Indicador se a mensagem foi enviada
  interaction: number; // Número de interações associadas ao gatilho
  lastInteractionDate?: Date; // Data da última interação, opcional
  conteudo?: messagesclient[] | undefined; // Conteúdo da mensagem, opcional, podendo ser um array de mensagens do tipo messagesclient
  companybarberId: string; // Identificador da empresa ou barbeiro associado ao gatilho
  customMessage: string; // Mensagem personalizada associada ao gatilho
};

// Definição do tipo messagesclient, que representa uma mensagem do cliente
type messagesclient = {
  text?: string; // Texto da mensagem, opcional
  image?: string; // URL de uma imagem na mensagem, opcional
  link?: string; // URL de um link na mensagem, opcional
  data?: string; // Dados adicionais na mensagem, opcional, no formato string
};
