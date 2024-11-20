// utils.js
export const formatarTelefone = (telefone: string | null | undefined) => {
  if (!telefone) {
    return '(00) 00000-0000'; // Retorna uma string vazia se telefone for null ou undefined
  }

  const numeros = telefone.replace(/\D/g, "");
  const formatoTelefone = `(${numeros.substring(0, 2)}) ${numeros.substring(2, 7)}-${numeros.substring(7)}`;
  return formatoTelefone;
};

  