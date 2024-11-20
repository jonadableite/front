import * as yup from "yup";
export const signInValidator = yup.object().shape({
  email: yup.string().email("Formato incorreto").required("E-mail obrigatório"),
  password: yup.string().required("Senha obrigatória"),
});

