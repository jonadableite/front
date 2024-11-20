import axios from "axios"; // Importa o módulo Axios para fazer requisições HTTP
import { parseCookies } from "nookies"; // Importa a função parseCookies do pacote nookies
import { ToastContainer, toast } from 'react-toastify'; // Importa componentes de toast da biblioteca react-toastify

// Função para criar e retornar uma instância configurada do Axios para fazer requisições à API
export function getAPIClient(ctx: any) {
	// Obtém o token de autorização do cookie "acl0" utilizando o contexto (ctx) fornecido
	const { "acl0": token } = parseCookies(ctx);

	// Cria uma instância do Axios com configurações pré-definidas
	const api = axios.create({
		baseURL: process.env.NEXT_PUBLIC_API_URL, // URL base da API definida no ambiente Next.js
		headers: {
			"Access-Control-Allow-Origin": "*", // Permite que todas as origens façam requisições
			"Content-Type": "application/json", // Tipo de conteúdo das requisições
			"Access-Control-Allow-Methods": "*", // Métodos permitidos para requisições
			"Access-Control-Allow-Headers": "*", // Cabeçalhos permitidos para requisições
			"Authorization": token ? `Bearer ${token}` : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZlcm5hbmRvLnNvcnJlbnRpbm9AYWNlbGVyYWlhLmNvbS5iciIsInN1YiI6IjY1MjNmOGM0YWVhOTlkZTg3ZmM4MGQ0YiIsImlhdCI6MTcxMjc4ODEzMywiZXhwIjoxNzEyNzkxNzMzfQ.FnmsGUy69ONw8RZxxszcR7F91ZElRggIhp38C0JQIX4' // Token padrão usado quando não há token no cookie
		},
	});

	// Intercepta respostas para tratamento global de erros
	api.interceptors.response.use(
		(response) => response, // Retorna a resposta se não houver erros
		(error) => {
			if (error.response.status === 401) { // Se a resposta retornar status 401 (não autorizado)
				toast.error("O tempo de sua sessão expirou, faça login novamente."); // Exibe um erro de toast informando que a sessão expirou
				return {
					redirect: {
						destination: "/login", // Redireciona o usuário para a página de login
						permanent: false, // Não mantém o redirecionamento permanente
					},
				};
			}
			return Promise.reject(error); // Rejeita a promessa com o erro recebido
		},
	);

	return api; // Retorna a instância configurada do Axios para ser utilizada na aplicação
}
