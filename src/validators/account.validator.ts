import * as yup from "yup";

export const accountInValidator = yup.object().shape({
  name: yup.string().required("Nome obrigatória"),
  phone: yup.string(),
  email: yup.string().email("Formato incorreto").required("E-mail obrigatório"),
  password: yup.string().required("Senha obrigatória"),
});