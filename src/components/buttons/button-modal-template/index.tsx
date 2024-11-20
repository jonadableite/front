"use client";

import React, { useState } from "react";

import CustomModalTemplate from "@/components/Modals/ModalTemplate";
import { Empresa } from "@/types/empresa";
import { FaComment } from "react-icons/fa6";

interface TemplateProps {
  id: string;
  phone: string;
  name: string;
  text: string;
  image: string;
  active: boolean;
  type: string;
  interaction: string;
  // companyId:string;
  // idCompanie:string;
}

export default function ChangeTemplateButtonWhats({
  companyData,
  companyId,
}: {
  companyData: TemplateProps;
  companyId:string;
}) {
 
  const [idCompanie, setIdCompanie] = useState(companyId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<TemplateProps | null>(
    null
  );
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

 
   console.log('ID DA COMPANIA',companyData)
  const openModal = () => {
    console.log("ID DA COMPANIA", idCompanie);
    console.log("isModalOpen:", isModalOpen);
    setSelectedCompany(companyData),
      console.log("clicou  botão Custon", companyData);
  
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="py-5  dark:danger">
     
        <button
          onClick={openModal}
          type="button"
          className="text-white bg-rose-700 dark:bg-rose-700 hover:bg-rose-700/90 dark:hover:bg-rose-900/90
          focus:ring-4 focus:ring-green/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-whatgreen/50 me-2 mb-2"
        >
          <FaComment className="w-10 h-3 me-2 -ms-1" />
          Alterar modelo WhatsApp
        </button>
      </div>
      {isModalOpen && selectedCompany && (
        <CustomModalTemplate
        id={companyId}
        companyId={companyId}
          // companyId={selectedCompany.companyId}
          image={selectedCompany.image}
          phone={selectedCompany.phone}
          name={selectedCompany.name}
          text={selectedCompany.text}
          type={selectedCompany.type}
          interaction={selectedCompany.interaction}
          active={selectedCompany.active}
          onRequestClose={() => setIsModalOpen(false)}
          inputValue={inputValue}
          setInputValue={setInputValue}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      )}
    </>
  );
}
