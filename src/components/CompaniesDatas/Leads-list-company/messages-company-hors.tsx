"use client";
import React, { useState } from "react";
import CustomModalTemplateOne from "@/components/Modals/ModalTemplateOne";
import { Empresa } from "@/types/empresa";
import { FaPowerOff, FaWhatsapp } from "react-icons/fa";

interface MessageCountProps {
  messageData: any;
  companyData: Empresa;
}

export default function MessagesComapny({
  messageData,
  companyData,
}: MessageCountProps) {



  return (
    <div className="flex w-full flex-col dark:bg-darkBlue bg-slate-50 p-2">
      <div className="col-span-12 rounded-2xl border border-none bg-white dark:bg-darkBlue/60 px-4 py-4  shadow dark:border-strokedark xl:col-span-12">
        <div>

          <div className="flex flex-1 items-center justify-between">
            <div className="py-1 flex flex-col">
              <span className="text-sm  text-neutral-600 dark:text-neutral-400">
                STATUS
              </span>
              <p className={`${companyData.enabled === true ? "text-green-700" : "text-orange-600"} font-medium flex flex-row gap-3 items-center`}>
                <FaPowerOff size={15} />{companyData.enabled === true ? "Iniciado" : "Não Iniciado"}</p>
            </div>

            <div className="py-1 flex flex-col">
              <span className="text-sm  text-neutral-600 dark:text-neutral-400">
                HISTÓRICO DE MENSAGENS
              </span>
              <p
                className={`text-orange-600 font-medium flex flex-row gap-3 items-center`}
              >

                {messageData.totalMessages}
              </p>
            </div>

            <div className="py-1 flex flex-col">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                MENSAGEM ENVIADAS
              </span>
              <p
                className={`text-neutral-600 dark:text-gray-200 font-medium flex flex-row gap-3 items-center`}
              >
                {messageData.veraMessages}
              </p>
            </div>
            <div className="py-1 flex flex-col">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                MENSAGENS RECEBIDAS
              </span>
              <p
                className={`text-neutral-600 dark:text-gray-200 font-medium flex flex-row gap-3 items-center`}
              >
                {messageData.leadMessages}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
