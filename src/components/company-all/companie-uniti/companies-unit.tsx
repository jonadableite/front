"use client";

import { Fragment, useState, useEffect } from "react";
import { Empresa } from "@/types/empresa";
import ListEmpreendomentos from "./company-unit-list-item-all.component";
import { UserType } from "@/types";

interface CompaniesAllProp {
  companyData: Empresa;
  userData: UserType;
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndoYXRsZWFkLmNvbS5ickBnbWFpbC5jb20iLCJzdWIiOiI2NmRlNjY4ODQ3ZTFkNjY0ZjYxZDU4NGQiLCJpYXQiOjE3MjU4NTYxNjUsImV4cCI6MTcyNTg1OTc2NX0.gTRvZOjGhJWgHWZudYhTBl-ddeIfsJO89P7cFPPuRdQ";

export default function ListCompaniesUnit({
  companyData,
  userData,
}: CompaniesAllProp) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [partnerCreated, setPartnerCreated] = useState(false);

  const handleCreatePartner = () => {
    // Verificação de token antes de prosseguir
    if (!userData.token) {
      setError("Token de autenticação ausente.");
      return;
    }

    setIsLoading(true);
    setError(null); // Limpar erros anteriores

    fetch("/api/partners", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
      body: JSON.stringify({
        name: "Novo Parceiro",
        product_default: "WhatLeads",
        enable_curation: true,
        enable_to_send_us_to_lead: false,
        enabled: true,
        is_conversation_ia: false,
        campaign_number_business: "numero-da-instancia-do-whatsapp",
        whatsapp_provider: "Baileys",
        enable_to_send_provider: false,
        enable_to_second_call_provider: false,
        templatelistvars: [],
        message_per_runs: [],
        whitelabel_config: "config-do-whitelabel",
        aceleraCompanyId: companyData.id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao criar o parceiro");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Parceiro criado com sucesso:", data);
        setPartnerCreated(true); // Indica sucesso na criação
      })
      .catch((error) => {
        console.error("Erro:", error);
        setError(error.message); // Exibir erro para o usuário
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Fragment>
      <div
        className="dark:bg-darkBlue bg-slate-50 text-white p-8 min-h-[100vh]"
        suppressHydrationWarning
      >
        <div className="flex flex-col justify-center m-2 p-4 bg-white dark:bg-roxouro1/30 border border-neutral-200 dark:border-roxouro1/30 shadow-md hover:shadow-lg rounded-2xl h-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex flex-col">
                <div className="font-medium leading-none text-rose-700">
                  Corporadores empreendimentos
                </div>
                <p className="text-sm text-neutral-400 dark:text-gray-100 leading-none mt-1">
                  Visualização de empreendimentos disponíveis na plataforma.
                </p>
              </div>
            </div>
            <button
              onClick={handleCreatePartner}
              disabled={isLoading || partnerCreated} // Desabilitar se estiver carregando ou já criado
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Criando..." : partnerCreated ? "Parceiro Criado!" : "Criar Novo Parceiro"}
            </button>
          </div>
        </div>

        {/* Exibe o erro se houver */}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
            Erro: {error}
          </div>
        )}

        {/* Renderização Condicional das Empresas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {companyData.acelera_parceiro_configs &&
            companyData.acelera_parceiro_configs.length > 0 ? (
            companyData.acelera_parceiro_configs.map((item: Empresa) => (
              <ListEmpreendomentos
                key={`COMPANY-${item.id}`}
                data={item}
                userData={userData}
              />
            ))
          ) : (
            <div className="bg-rose-700 border-gray-800 flex flex-col justify-center m-2 p-4 dark:bg-darkBlue/30 border border-neutral-800/30 shadow-md hover:shadow-lg rounded-2xl h-20">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <div className="font-medium leading-none text-gray-100 dark:text-gray-400">
                      Infelizmente não encontramos empresa vinculada para sua
                      pesquisa.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}
