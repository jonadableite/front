"use client";

import { useState } from "react"; // Hook do React para manipular o estado local
import { signInAction } from "@/actions/auth/sign-in.action"; // Função para realizar a ação de login
import { SignInButton } from "@/components/buttons/sign-in-button.component"; // Componente para o botão de login
import { InputForm } from "@/components/elements/input-form.component"; // Componente reutilizável para formulários de entrada de dados
import Link from "next/link"; // Componente de link do Next.js para navegação entre páginas
import { redirect } from "next/navigation"; // Função de redirecionamento do Next.js
import toast from "react-hot-toast"; // Biblioteca para exibir notificações de sucesso/erro
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Ícones de exibição/ocultação de senha
import React, { Fragment } from 'react'; // Fragment para encapsular elementos sem adicionar novos nós ao DOM

export default function SignInForm() {
  // Definição do estado para controle de visibilidade da senha
  const [showPassword, setShowPassword] = useState(false);

  // Função para lidar com a submissão do formulário de login
  async function handleSignIn(formData: FormData) {
    const toastId = toast.loading("Processando"); // Exibe notificação de carregamento
    const result = await signInAction(formData); // Realiza a ação de login

    // Tratamento de erro e sucesso do login
    if (result?.error) {
      toast.dismiss(toastId); // Remove a notificação de carregamento
      toast.error(result?.error); // Exibe notificação de erro
    } else {
      toast.dismiss(toastId); // Remove a notificação de carregamento
      toast.success("Login efetuado, abrindo sistema"); // Exibe notificação de sucesso
      redirect("/dashboard"); // Redireciona para a dashboard
    }
  }

  // Função para alternar a visibilidade da senha
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Fragment>
      {/* Container principal da página de login */}
      <div className="flex justify-center items-center h-[100vh] dark:bg-darkBlue bg-gradient-to-br from-roxouro1 via-darkBlue to-black">

        {/* Sub-container para centralizar o conteúdo */}
        <div className=" w-full justify-center items-start h-screnn flex ">
          <div className=" w-full relative min-h-screen flex ">

            {/* Seção esquerda da tela com a imagem de fundo e descrição */}
            <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 ">
              <div className="sm:w-1/2 xl:w-2/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-roxouro/40 text-white bg-no-repeat bg-cover relative bg-[url('https://images.unsplash.com/photo-1579451861283-a2239070aaa9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80')]">

                {/* Gradiente de fundo sobreposto à imagem */}
                <div className="absolute bg-gradient-to-b from-primary/40 to-darkBlue opacity-75 inset-0 z-0"></div>

                {/* Elemento decorativo no lado direito */}
                {/* <div className="absolute  min-h-screen right-0 w-16 "
                  style={{
                    borderTopWidth: "70rem",
                    borderLeftWidth: "26rem",
                    borderStyle: "gradient",
                    borderColor: "#02021a transparent #02021a",
                  }}
                ></div> */}

                {/* Link com logo do WhatLeads */}
                <Link href="#"
                  target="_blank"
                  title="WhatLeads"
                  className=" left-0 ml-12 flex absolute top-5 text-center text-gray-100 focus:outline-none"
                >
                  <img
                    src="/assets/3dwhats.png"
                    alt="aji"
                    className="object-cover mx-auto  rounded-full w-10 h-10"
                  />
                  <p className="text-xl ml-3">
                    What<strong>Leads</strong>
                  </p>
                </Link>

                {/* Título e descrição da plataforma */}
                <div className="relative z-10 text-center py-12">
                  <div className="max-w-md mx-auto">
                    {/* Título com gradiente, sombra e animação de entrada */}
                    <h2 className="sm:text-2xl xl:text-3xl font-bold leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-br from-primary to-rose-950 transform transition-transform duration-500 hover:scale-105 animate__animated animate__fadeIn animate-fade-up animate-once animate-duration-[800ms] animate-delay-[1500ms] animate-ease-out">
                      Impulsione vendas com leads qualificados!
                    </h2>
                    {/* Descrição com animação suave e cor ajustada */}
                    <p className="sm:text-sm xl:text-md text-gray-300 font-normal mb-6 transition-opacity duration-300 ease-in-out hover:opacity-80 animate__animated animate__fadeIn animate__delay-1s">
                      Na WhatLeads, transformamos suas campanhas de marketing em máquinas de vendas eficientes.
                    </p>
                  </div>

                  {/* Lista de recursos da plataforma com estilo e efeitos */}
                  <div className="max-w-md mx-auto prose mt-4">
                    <ul className="list-disc list-inside space-y-4">
                      <li className="hover:text-primary transition duration-300 transform hover:-translate-y-1">Envio em Massa: Envie milhares de mensagens simultaneamente...</li>
                      <li className="hover:text-primary transition duration-300 transform hover:-translate-y-1">Gerenciamento de Leads: Organize e acompanhe seus leads...</li>
                      <li className="hover:text-primary transition duration-300 transform hover:-translate-y-1">Análise de Dados: Utilize insights detalhados para otimizar suas campanhas...</li>
                      <li className="hover:text-primary transition duration-300 transform hover:-translate-y-1">Automação de Mensagens: Automatize suas comunicações para manter seu público sempre engajado.</li>
                    </ul>
                  </div>
                </div>


                {/* Animação decorativa de círculos */}
                <ul className="circles">
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>

              {/* Seção direita com o formulário de login */}
              <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full xl:w-2/5 p-8 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none">
                <div className="max-w-md w-full space-y-8">

                  {/* Imagem e descrição do formulário */}
                  <div className="flex flex-col text-center justify-center items-center">
                    <img
                      src="assets/12045674.png"
                      className="h-40 relative"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Por favor entre em sua conta
                    </p>
                  </div>

                  {/* Formulário de login */}
                  <form className="mt-8 space-y-6" action={handleSignIn}>
                    <input type="hidden" name="remember" value="true" />

                    {/* Campo de email */}
                    <div className="relative">
                      <label className="ml-3 text-sm font-bold text-gray-100 tracking-wide">
                        Email
                      </label>
                      <InputForm
                        type="email"
                        placeholder="mail@gmail.com"
                        name="email"
                        classname="w-full text-base px-4 py-2 border dark:gray-800 bg-darkBlue/30 text-gray-300 border-rose-700 focus:outline-none rounded-2xl focus:border-azuluro"
                      />
                    </div>

                    {/* Campo de senha com botão de exibir/ocultar */}
                    <div className="mt-8 relative content-center">
                      <label className="text-sm font-bold text-gray-100 tracking-wide">
                        Password
                      </label>
                      <div className="flex flex-row">
                        <div className="absolute flex justify-center items-center right-4 h-[40px]">
                          <span
                            className="mr-1"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? (
                              <FaEyeSlash size={22} />
                            ) : (
                              <FaEye size={22} />
                            )}
                          </span>
                        </div>
                        <InputForm
                          type={showPassword ? "text" : "password"}
                          placeholder="Digite sua senha"
                          name="password"
                          classname="w-full content-center text-base px-4 py-2 border bg-darkBlue/30 rounded-2xl dark:gray-800 text-gray-300 border-rose-700 focus:outline-none focus:border-azuluro"
                        />
                      </div>
                    </div>

                    {/* Checkbox "Lembre de mim" e link "Esqueceu a senha?" */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember_me"
                          name="remember_me"
                          type="checkbox"
                          className="h-4 w-4 bg-rose-500 focus:ring-rose-400 border-gray-800 rounded"
                        />
                        <label
                          htmlFor="remember_me"
                          className="ml-2 block text-sm text-gray-100"
                        >
                          Lembre de mim
                        </label>
                      </div>
                      <div className="text-sm">
                        <Link
                          href="#"
                          className="text-azuluro hover:text-azuluro"
                        >
                          Esqueceu sua senha?
                        </Link>
                      </div>
                    </div>

                    {/* Botão de login */}
                    <SignInButton />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
