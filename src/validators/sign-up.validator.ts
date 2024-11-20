import * as yup from "yup";
export const signUpValidator = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  phone: yup.string(),
  email: yup.string().email("Formato incorreto").required("E-mail obrigatório"),
  //bitcoin_key: yup.string(),
  //pix_key: yup.string(),
  password: yup.string().required("Senha obrigatória"),
  passwordConfirm: yup.string().required("Confirmação de Senha obrigatória"),
});

