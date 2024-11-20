import * as yup from "yup";

export const createInvestmentValidator = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  // price: yup.string().required("Valor obrigatório"),
  user_id: yup.number().required("id"),
  payment_type: yup.string().required("payment_type"),
  price: yup
  .number()
  .typeError('O preço não esta preenchido corretamente')
  .required("O preço é obrigatório")
  .min(10, "O valor mínimo é $ 10,00")
  .max(10000.00, "O valor máximo é $ 10.000,00"),
});
