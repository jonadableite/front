import axios from "axios"; // Importa o módulo Axios para fazer requisições HTTP
import { parseCookies } from "nookies"; // Importa a função parseCookies do pacote nookies

// Parseia o cookie "acl0" para obter o token de autorização
const { acl0: token } = parseCookies();

// Cria uma instância do Axios com configurações pré-definidas
const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL, // URL base da API definida no ambiente Next.js
	headers: {
		"Access-Control-Allow-Origin": "*", // Permite que todas as origens façam requisições
		"Content-Type": "application/json", // Tipo de conteúdo das requisições
		"Access-Control-Allow-Methods": "*", // Métodos permitidos para requisições
		"Access-Control-Allow-Headers": "*", // Cabeçalhos permitidos para requisições
	},
});

// Se houver um token, adiciona-o aos cabeçalhos de autorização padrão da instância Axios
if (token) {
	api.defaults.headers["Authorization"] = `Bearer ${token}`;
}

// Interceptar respostas para tratamento global de erros
api.interceptors.response.use(
	(response) => response, // Retorna a resposta se não houver erros
	(error) => {
		// Retorna o erro recebido como uma promessa rejeitada
		return Promise.reject(error);
	},
);

export default api; // Exporta a instância configurada do Axios como padrão
