"use client";

import React, { useState } from "react";
import CustomModalTemplateOne from "@/components/Modals/ModalTemplateOne";
import { Empresa } from "@/types/empresa";
import { FaWhatsapp } from "react-icons/fa";

interface TemplateOneInitialProps {
  templateData: Empresa;
}

export default function TemplateOneInitial({
  templateData,
}: TemplateOneInitialProps) {

  const templates = templateData?.templatelistvars || [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [updatedTemplateData, setUpdatedTemplateData] = useState(templateData);

  const openModal = (template: any) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Função para atualizar os dados do template no componente pai
  const updateTemplateData = (updatedData: Empresa) => {
    setUpdatedTemplateData(updatedData);
    closeModal(); // Feche o modal após a atualização
  };

  return (
    <div className="col-span-12 rounded-sm border border-none bg-white dark:bg-darkBlue p-7 shadow dark:border-strokedark xl:col-span-5">
      <div>
        <div className="flex flex-1 items-center justify-between">
          <div className="py-4">
            <h5 className="font-medium text-neutral-600 dark:text-gray-200">
              {updatedTemplateData.name}
            </h5>
            <div className="gap-3">
              <span className="text-sm text-neutral-600 dark:text-gray-200 gap-3">
                modelo One{" "}
              </span>
              {updatedTemplateData.enable_to_send_provider !== false && (
                <div
                  className={`inline-flex h-6 w-auto items-center justify-center py-1 px-3 p-1 rounded-md text-sm font-medium text-white dark:text-gray-400
                    ${updatedTemplateData.enable_to_send_provider
                      ? "bg-whatgreen"
                      : "bg-danger"
                    }`}
                >
                  <span className="text-sm font-medium text-white">
                    Campanhas{" "}
                    {updatedTemplateData.enable_to_send_provider
                      ? "Ativo"
                      : "não"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {updatedTemplateData.enabled !== false && (
            <div
              className={`inline-flex h-6 w-6 items-center justify-center py-1 px-3 p-1 rounded-md text-sm font-medium text-white
                    ${updatedTemplateData.enabled ? "bg-primary" : "bg-danger"
                }`}
            >
              <span className="text-sm font-medium text-neutral-600 dark:text-gray-200"> ok</span>
            </div>
          )}
        </div>
      </div>

      <div className="col-span-12 xl:col-span-3 gap-y-3 p-0 flex flex-col rounded-sm border-none border-neutral-700 bg-white dark:bg-darkBlue shadow ">
        {templates.map((template: any, index) => (
          <div
            className="w-full flex flex-col rounded-sm border border-neutral-400 dark:border-neutral-700 bg-white dark:bg-darkBlue shadow "
            key={index}
          >
            <div className="block px-4 pt-4 overflow-hidden h-72">
              <img
                loading="lazy"
                width="340"
                height="188"
                decoding="async"
                src={template.image}
                alt={`Header Image ${index}`}
                className="object-cover w-full"
              />
            </div>
            <p className="block px-4 pt-4 text-neutral-600 dark:text-gray-200">
              {template.content}
            </p>
            <div className="flex flex-1 items-center justify-center gap-5 py-5 px-10">
              <button
                onClick={() => openModal(template)}
                type="button"
                className="flex w-full text-white bg-rose-700 dark:bg-rose-700 hover:bg-rose-700/90 dark:hover:bg-rose-900/90
                focus:ring-4 focus:ring-green/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center  items-center justify-center dark:focus:ring-whatgreen/50 me-2 mb-2"
              >
                <FaWhatsapp className="w-10 h-3 me-2 -ms-1" />
                Editar modelo
              </button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && selectedTemplate && (
        <CustomModalTemplateOne
          companyId={updatedTemplateData.id}
          companyData={updatedTemplateData}
          selectedTemplate={selectedTemplate}
          onRequestClose={closeModal}
          updateTemplateData={updateTemplateData}
        />
      )}
    </div>
  );
}



