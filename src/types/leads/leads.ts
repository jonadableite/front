// Definição do tipo Lead, que representa as informações de um lead (potencial cliente)
export type Lead = {
  messageCount: any; // Número de mensagens associadas ao lead (tipo genérico)
  id: string; // Identificador único do lead
  external_id?: string; // Identificador externo opcional do lead
  source_id?: string; // Identificador da fonte do lead, opcional
  name: string; // Nome do lead
  phone: string; // Número de telefone do lead
  email?: string; // E-mail opcional do lead
  last_message_sent?: Date; // Data do último envio de mensagem, opcional
  step_second_call_template?: number; // Número da etapa do segundo template de chamada, opcional
  step_no_interaction?: number; // Número da etapa sem interação, opcional
  no_interaction_quantity?: number; // Quantidade de interações sem resposta, opcional
  accept_template?: boolean; // Indicador se o lead aceitou o template, opcional
  accept_second_template?: boolean; // Indicador se o lead aceitou o segundo template, opcional
  status?: string; // Status do lead, opcional
  dialog: AceleraLeadsDialog[]; // Diálogos associados ao lead
  config: string; // Configuração do lead
  config_id: string; // Identificador da configuração
  whitelabel_config: string; // Configuração de whitelabel do lead
  last_intent?: string; // Última intenção registrada, opcional
  broker?: string; // Corretor associado ao lead, opcional
  origin?: string; // Origem do lead, opcional
  send?: boolean; // Indicador se deve enviar alguma mensagem, opcional
  sendAt?: Date; // Data de envio, opcional
  isBusinessAutoResponder?: boolean; // Indicador se é um auto respondedor de negócios, opcional
  start_message?: Date; // Data de início da mensagem, opcional
  scheduling_data?: string; // Dados de agendamento, opcional
  product_choose_by_client?: string; // Produto escolhido pelo cliente, opcional
  product_id?: number; // Identificador do produto, opcional
  created_at?: Date; // Data de criação do lead, opcional
  updated_at?: Date; // Data de atualização do lead, opcional
  curation?: AceleraLeadsCuration; // Informações de curadoria do lead, opcional
};

// Definição do tipo AceleraLeadsCuration, que representa as informações de curadoria de um lead
type AceleraLeadsCuration = {
  status?: CurationStatus; // Status da curadoria, opcional
  data_requirement?: Date; // Data de requisito da curadoria, opcional
  data_conclusion?: Date; // Data de conclusão da curadoria, opcional
  interest_ai?: CurationInterest; // Interesse identificado por IA, opcional
  interest_real?: CurationInterest; // Interesse real do lead, opcional
};

// Enumeração dos possíveis status de curadoria
enum CurationStatus {
  PENDENTE, // Curadoria pendente
  CONCLUIDO, // Curadoria concluída
}

// Enumeração dos possíveis níveis de interesse
enum CurationInterest {
  INTERESSADO, // Lead interessado
  SEM_INTERESSE, // Lead sem interesse
}

// Definição do tipo AceleraLeadsDialog, que representa os diálogos associados ao lead
type AceleraLeadsDialog = {
  error?: JSON; // Erro associado ao diálogo, opcional
  intent?: string; // Intenção do diálogo, opcional
  isDelivered?: Boolean; // Indicador se a mensagem foi entregue, opcional
  isRead?: Boolean; // Indicador se a mensagem foi lida, opcional
  isSent?: Boolean; // Indicador se a mensagem foi enviada, opcional
  statusFrom?: string; // Status inicial do diálogo, opcional
  statusTo?: string; // Status final do diálogo, opcional
  timestamp?: JSON; // Timestamp do diálogo, opcional
  who?: string; // Quem iniciou o diálogo, opcional
};
