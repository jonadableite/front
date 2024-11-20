
"use client"

import type { Empresa } from "@/types/empresa";
import Link from "next/link";
import Image from "next/image";
import ChangeTemplateButtonWhats from "../../buttons/button-modal-template";
import { FaWhatsapp, FaTimes, FaChartBar, FaPlug } from "react-icons/fa";
import FormCompanyData from "@/components/CompaniesDatas/ConfigurationCompany/formCompany"
import TemplateinIcial from "./templateInitial";

import { UserType } from "@/types";
import TemplateOneinIcial from "./templateOneInitial";
import TemplateOneinIcialHors from "./templateOne-hors";


export default function ConfigurationCompany({
    companyData,
    userData,
  }: {
    companyData: Empresa;
    userData:UserType

  }) {

    return (
        <div className=" grid grid-cols-12 gap-2  md:gap-2 2xl:gap-2">
          <TemplateOneinIcialHors templateData={companyData?.company?.companyUnity}/>
          <TemplateOneinIcial templateData={companyData?.company?.companyUnity}/>

          <FormCompanyData templateData={companyData} companyId={{ idCompanie: companyData.companyId }}/>

          </div>
    )
}