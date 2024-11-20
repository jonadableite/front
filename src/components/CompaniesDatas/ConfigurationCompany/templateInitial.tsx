// components/CompaniesDatas/TemplateinIcial.tsx
'use client'

import type { Empresa, Template } from "@/types/empresa";
import Link from "next/link";
import Image from "next/image";
import ChangeTemplateButtonWhats from "../../buttons/button-modal-template";
import { FaWhatsapp, FaTimes, FaChartBar, FaPlug } from "react-icons/fa";
import { Key } from "react";



export default function TemplateinIcial({
  templateData,
}: {
  templateData: Empresa;
  companyId: { idCompanie: string }; // Altere aqui
}) {

  const template = templateData.meta_configuration?.template;

  return (
    <div className="col-span-12 rounded-sm border border-none bg-white dark:bg-darkBlue p-7 shadow dark:border-strokedark xl:col-span-3">
      <div>
        <div className="flex flex-1 items-center justify-between">
          <div className="py-4">
            <h5 className="font-medium text-black dark:text-white">
              {templateData.name}
            </h5>
            <div className="gap-3">
              <span className="text-sm text-neutral-600 dark:text-gray-200 gap-3">
                modelo{" "}
              </span>
              {templateData.enable_to_send_provider !== false && (
                <div
                  className={`inline-flex h-6 w-auto items-center justify-center py-1 px-3 p-1 rounded-md text-sm font-medium text-white dark:text-gray-400
                    ${templateData.enable_to_send_provider ? "bg-whatgreen" : "bg-danger"
                    }`}
                >
                  <span className="text-sm font-medium text-white">
                    Campanhas {templateData.enable_to_send_provider ? "Ativo" : "não"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {templateData.enabled !== false && (
            <div
              className={`inline-flex h-6 w-6 items-center justify-center py-1 px-3 p-1 rounded-md text-sm font-medium text-white
                    ${templateData.enabled ? "bg-primary" : "bg-danger"}`}
            >
              <span className="text-sm font-medium text-white"> ok</span>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-sm border border-neutral-700 bg-white dark:bg-darkBlue shadow dark:border-strokedark">
        {template && (
          <>
            {template.template_vars.header.map((headerItem: { type: string; content: string }, index: Key | null | undefined) => {
              if (headerItem.type === 'image') {
                return (
                  <span key={index} className="block px-4 pt-4">
                    <img
                      loading="lazy"
                      width="340"
                      height="188"
                      decoding="async"
                      src={headerItem.content}
                      alt={`Header Image ${index}`}
                    />
                  </span>
                );
              }
              return null; // Handle other header types if needed
            })}
            {template.start_script.map((scriptItem: any, index: any) => {
              if (scriptItem.type === 'text') {
                return (
                  <p key={index} className="block px-4 pt-4 text-neutral-600 dark:text-gray-200">
                    {scriptItem.content}
                  </p>
                );
              } else if (scriptItem.type === 'document') {
                return (
                  <Link key={index} href={scriptItem.url} target="_blank" rel="noopener noreferrer">
                    <span className="block px-4 pt-4"> {scriptItem.title}</span>

                  </Link>
                );
              }
              return null; // Handle other script types if needed
            })}
          </>
        )}
      </div>
      {templateData && (
        <div className="flex flex-1 items-center justify-between gap-5 py-3 px-0">
          <ChangeTemplateButtonWhats
            companyData={templateData.template}
            companyId={templateData.id}
          />
        </div>
      )}
    </div>
  );
}
