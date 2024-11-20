"use client";
import React, { useState } from "react";
import CustomModalTemplateOne from "@/components/Modals/ModalTemplateOne"; // Importação do componente de modal
import { Empresa } from "@/types/empresa"; // Importação do tipo Empresa
import { FaPowerOff, FaWhatsapp } from "react-icons/fa"; // Importação dos ícones do React

interface TemplateOneinIcialProps {
  templateData: Empresa; // Propriedades esperadas para o componente
}

export default function TemplateOneinIcialHors({
  templateData,
}: TemplateOneinIcialProps) {
  const [updatedTemplateData, setUpdatedTemplateData] = useState(templateData); // Estado local para armazenar os dados do template atualizados

  return (
    <div className="col-span-12 rounded-sm border border-none bg-white dark:bg-darkBlue px-7 py-2 shadow dark:border-strokedark xl:col-span-12">
      <div>
        {/* Informações do template */}
        <div className="flex flex-1 items-center justify-between">
          {/* Status do template */}
          <div className="py-1 flex flex-col">
            <span className="text-sm  text-neutral-600 dark:text-neutral-400">
              STATUS
            </span>
            {/* Condicional para exibir status iniciado ou não iniciado */}
            <p
              className={`${updatedTemplateData.enabled === true
                ? "text-green-700"
                : "text-orange-600"
                } font-medium flex flex-row gap-3 items-center`}
            >
              <FaPowerOff size={15} />
              {updatedTemplateData.enabled === true
                ? "Iniciado"
                : "Não Iniciado"}
            </p>
          </div>
          {/* Tipo de interação do template */}
          <div className="py-1 flex flex-col">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              TIPO DE INTERAÇÃO
            </span>
            {/* Condicional para exibir tipo de interação com assistente IA ou intervenção humana */}
            <p
              className={`text-neutral-600 dark:text-gray-200 font-medium flex flex-row gap-3 items-center`}
            >
              {updatedTemplateData.is_conversation_ia === true
                ? "Com Assistente IA"
                : "Intervenção Humana"}
            </p>
          </div>
          {/* Horário de início do template */}
          <div className="py-1 flex flex-col">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              INÍCIO
            </span>
            <p
              className={`text-neutral-600 dark:text-gray-200 font-medium flex flex-row gap-3 items-center`}
            >
              9H
            </p>
          </div>
          {/* Horário de término do template */}
          <div className="py-1 flex flex-col">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              TERMINO
            </span>
            <p
              className={`text-neutral-600 dark:text-gray-200 font-medium flex flex-row gap-3 items-center`}
            >
              18H
            </p>
          </div>
          {/* Ícone de confirmação se o template está habilitado */}
          {updatedTemplateData.enabled !== false && (
            <div
              className={`inline-flex h-6 w-6 items-center justify-center py-1 px-3 p-1 rounded-md text-sm font-medium text-white
                ${updatedTemplateData.enabled ? "bg-primary" : "bg-danger"
                }`}
            >
              <span className="text-sm font-medium text-neutral-600 dark:text-gray-200">
                {" "}
                ok
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
