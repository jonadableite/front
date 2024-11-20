"use client"
import { useState } from "react";
import { formatarTelefone } from '@/util/formatPhone';
import { FaTelegramPlane, FaYoutube, FaWhatsapp, FaPowerOff, } from "react-icons/fa";
import { BiSolidMessage } from "react-icons/bi";
import { useRouter } from 'next/navigation'
import { Empresa } from "@/types/empresa";
import { UserType } from "@/types";
import Link from "next/link";



export default function Profile({ companyData, userData }: { companyData: Empresa, userData: UserType }) {

  const router = useRouter();

  const handleIntentClick = () => {
    console.log('clicou');
    const intentUrl = `/dashboard/empresa/bot/${companyData.id}/tipo/intent`;


    router.push(intentUrl);
  };

  const handleLeadsClick = () => {
    const leadsUrl = `/dashboard/empresa/bot/${companyData.id}/tipo/lead`;
    router.push(leadsUrl);
  };
  const handleComandClick = () => {
    const leadsUrl = `/dashboard/empresa/detail/${companyData.id}`;
    router.push(leadsUrl);
  };
  return (
    <>
      <div className="col-span-12 rounded-sm dark:bg-darkBlue bg-slate-50 border-none dark:border-neutral-800/30 px-4 mt-2 xl:col-span-12">
        <div className="overflow-hidden rounded-sm dark:border-neutral-800/30 bg-slate-50  dark:border-strokedark dark:bg-darkBlue">
          <div className="px-4 pb-2 text-start lg:pb-2 xl:pb-11.5">
            <div className="mt-4">
              <span className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                {companyData.name}
              </span>
            </div>
          </div>

          <div className="flex justify-start gap-4 px-4 py-2 ">
            <button
              onClick={handleComandClick}
              className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-azuluro rounded-md hover:bg-warnningUro focus:outline-none focus:bg-warnningUro">
              <BiSolidMessage className="mr-2" />
              Configuração
            </button>
            <button onClick={handleIntentClick} className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-azuluro rounded-md hover:bg-warnningUro focus:outline-none focus:bg-warnningUro">
              <FaTelegramPlane className="mr-2" />
              Ver Intenção
            </button>
            <button onClick={handleLeadsClick} className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-azuluro rounded-md hover:bg-warnningUro focus:outline-none focus:bg-warnningUro">
              <FaWhatsapp className="mr-2" />
              Ver Leads
            </button>

          </div>


        </div>
      </div>
    </>
  );
}


