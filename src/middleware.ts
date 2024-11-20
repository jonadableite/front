import { NextRequest, NextResponse } from "next/server"; // Importa NextRequest e NextResponse do pacote 'next/server'
import api from "@/services/api"; // Importa a instância da API configurada do serviço de API

// Função middleware para interceptar requisições
export async function middleware(request: NextRequest) {
  // Obtém o valor do cookie 'acl0' que contém o token de autenticação
  const token = request.cookies.get("acl0")?.value;
  // Obtém o valor do cookie 'acl1' que contém informações do usuário
  const userCookie = request.cookies.get("acl1")?.value;

  // Verifica se a URL requisitada começa com "/login"
  if (request.nextUrl.pathname.startsWith("/login")) {
    // Se o token e o cookie do usuário estão presentes, redireciona para o dashboard
    if (token && userCookie) {
      api.defaults.headers.Authorization = `Bearer ${token}`; // Define o cabeçalho de autorização com o token
      return NextResponse.redirect(new URL("/dashboard", request.url)); // Redireciona para o dashboard
    }
    return null; // Permite o acesso à página de login
  }

  // Verifica se a URL requisitada começa com "/dashboard"
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    // Se o token ou o cookie do usuário não estão presentes, redireciona para a página de login
    if (!token || !userCookie) {
      return NextResponse.redirect(new URL("/login", request.url)); // Redireciona para a página de login
    }
    api.defaults.headers.Authorization = `Bearer ${token}`; // Define o cabeçalho de autorização com o token
  }

  return null; // Permite a continuação da requisição
}

// Configuração do middleware para corresponder às rotas "/login" e "/dashboard/:path*"
export const config = {
  matcher: ["/login", "/dashboard/:path*"],
};
