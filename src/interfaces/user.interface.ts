export interface IUser {
  id: string; // Identificador único do usuário (obrigatório)
  name: string; // Nome do usuário (obrigatório)
  email: string; // E-mail do usuário (obrigatório)
  profile: string; // Perfil do usuário (obrigatório)
  phone: string; // Número de telefone do usuário (obrigatório)
  active: Boolean; // Indica se o usuário está ativo ou não (obrigatório)
  createdAt?: Date; // Data de criação do usuário (opcional)
  updatedAt?: Date; // Data da última atualização do usuário (opcional)
  aceleraCompanyId: string; // ID da empresa no sistema Acelera (obrigatório)
  company?: any | undefined; // Informações da empresa associada ao usuário (opcional)
}
