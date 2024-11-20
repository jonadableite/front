"use client";

import React, { useState } from "react";

import CustomModalTemplateOne from "@/components/Modals/ModalTemplateOne";
import { Empresa } from "@/types/empresa";
import { FaComment } from "react-icons/fa6";

interface TemplateProps {
  name   ?: string;
  image  ?: string;
  content?: string;
}

export default function ChangeTemplateOneButtonWhats({
  companyData,
  companyId,
}: {
  companyData: Empresa;
  companyId:string;
}) {
  // console.log('dados modal',companyData);
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
      
    </>
  );
}
