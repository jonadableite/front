// Definição do tipo Intention, que representa uma intenção no contexto do sistema
export type Intention = {
  id?: string; // Identificador único da intenção, opcional
  intent?: string; // Nome ou descrição da intenção, opcional
  utterances?: Answer[]; // Lista de respostas (ou utterances) associadas à intenção, opcional
  answers?: Utterances[]; // Lista de enunciados (ou utterances) associados à intenção, opcional
  text?: string; // Texto associado à intenção, opcional
  image?: string; // URL de uma imagem associada à intenção, opcional
  link?: string; // URL de um link associado à intenção, opcional
  type?: string; // Tipo da intenção, opcional
  content?: string; // Conteúdo associado à intenção, opcional
};

// Definição do tipo Answer, que representa uma resposta no contexto de uma intenção
type Answer = {
  text?: string; // Texto da resposta, opcional
  image?: string; // URL de uma imagem da resposta, opcional
  link?: string; // URL de um link na resposta, opcional
};

// Definição do tipo Utterances, que representa um enunciado no contexto de uma intenção
type Utterances = {
  image: any; // Imagem associada ao enunciado (tipo genérico para maior flexibilidade)
  text?: string; // Texto do enunciado, opcional
};
