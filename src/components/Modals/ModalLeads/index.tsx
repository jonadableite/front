"use client";

import React, { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import { AiFillFolderOpen } from "react-icons/ai";
import api from "@/services/api";
import toast from "react-hot-toast";
import { FaEyeSlash, FaPlus, FaRocket, FaUser, FaUsers, FaWhatsapp } from "react-icons/fa";
import { BsCheckAll } from "react-icons/bs";
import Image from "next/image";
import { Lead } from "@/types/leads/leads";
import { formatarTelefone } from "@/util/formatPhone";
import moment from "moment-timezone";
import ChangeCompanyButtonWhats from "@/components/buttons/change-message-whats-modal";
import PaginationButtons from "@/components/buttons/button-paginate-message";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiMessageRoundedCheck, BiSolidMessage } from "react-icons/bi";
import { getUserLogged } from "@/app/repository/users/getUserLogged";
import { getClientAuthenticatedAction } from "@/actions/users/get-client-authenticated.action";

import { UserType } from "@/types";
import { FaEye } from "react-icons/fa6";


// interface CustomModalProps {
//   id: string;
//   phone: string;
//   name: string;
//   conteudo: Array<any>;
//   customMessage: string;
//   onRequestClose: () => void;
//   inputValue: string;
//   setInputValue: Dispatch<SetStateAction<string>>;
//   selectedImage: File | null;
//   setSelectedImage: Dispatch<SetStateAction<File | null>>;
//   leads: Lead[];
// }
interface CustomModalProps {
  //onRequestClose?: () => void;
  onRequestClose: (() => void) | undefined;
  leads: Lead[];
}
const CustomModalLeadsmessage: React.FC<CustomModalProps> = ({
  onRequestClose,
  leads,
}) => {

  const userData= getClientAuthenticatedAction();
 
  const [showBlur, setShowBlur] = useState(true);

  const toggleBlur = () => {
    setShowBlur(!showBlur);
  };

  // const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   setSelectedImage(file || null);
  // };
  const router = useRouter();
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Ordenar os leads pelo campo last_message_sent
  const sortedLeads = leads.sort((a: Lead, b: Lead) => {
    const dateA = moment(a.last_message_sent);
    const dateB = moment(b.last_message_sent);
    return dateB.diff(dateA);
  });
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = sortedLeads.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const sendMessageToWhatsapp = async () => {
    try {
    } catch (error) {
      toast.error("Falha ao atualizar a lista");
      console.error("Erro ao enviar mensagem para o WhatsApp:", error);
    }
  };

  const formatElapsedTime = (lastMessageSent: moment.MomentInput) => {
    // Converta lastMessageSent para um objeto Moment
    const lastMessageSentMoment = moment(lastMessageSent);

    // Calcule a diferença de tempo entre lastMessageSent e o momento atual em minutos
    const minutesElapsed = moment().diff(lastMessageSentMoment, "minutes");

    // Calcule os dias, horas e minutos a partir dos minutos decorridos
    const days = Math.floor(minutesElapsed / (60 * 24));
    const remainingMinutes = minutesElapsed % (60 * 24);
    const hours = Math.floor(remainingMinutes / 60);
    const minutes = remainingMinutes % 60;

    // Construa a string formatada baseada nos dias, horas e minutos
    let formattedElapsedTime = "";
    if (days > 0) {
      formattedElapsedTime += `${days} dia${days > 1 ? "s" : ""}`;
      if (hours > 0) {
        formattedElapsedTime += ` e ${hours} hora${hours > 1 ? "s" : ""}`;
      }
    } else {
      formattedElapsedTime = `${hours} hora${
        hours > 1 ? "s" : ""
      } e ${minutes} .min${minutes > 1 ? "" : ""}`;
    }

    return formattedElapsedTime;
  };

  // const navigateToBotPage = (leadData: Lead) => {
  //   console.log('clicou');
  //   const intentUrl = `/dashboard/empresa/bot/lead/${leadData.id}`;

  //   router.push(intentUrl);
  // };
  const navigateToBotPage = (leadData: Lead) => {
    console.log("clicou");
    const intentUrl = `/dashboard/empresa/bot/lead/${leadData.id}`;
    const newWindow = window.open(intentUrl, "_blank");
    if (newWindow) {
      newWindow.focus(); // Foca na nova aba, se ela for aberta com sucesso
    }
  };

  //console.log("tem lead la no modal fer", leads);
  return (
    <>
      <div className="col-span-12  rounded-sm overflow-hidden overflow-y-auto p-1 h-[60vh]  xl:col-span-12">
        {/* <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Mensagens disparadas WhatsApp disponíveis {leads.length}
      </h4> */}
        {itemsToShow.length > 0 &&
          itemsToShow.map((leadUser: Lead) => {
            const telefoneFormatado = formatarTelefone(leadUser.phone);
            // const ultimaMensagem =
            // leadUser.last_message_sent
            //   ? leadUser.last_message_sent[leadUser.last_message_sent.length - 1]
            //   : null;
            const ultimaMensagem =
              leadUser.last_message_sent instanceof Array
                ? leadUser.last_message_sent[
                    leadUser.last_message_sent.length - 1
                  ]
                : null;
            // Verificar se há conteúdo antes de acessar a última mensagem
            // const ultimaMensagem =
            //   whats.conteudo && whats.conteudo.length > 0
            //     ? whats.conteudo[whats.conteudo.length - 1]
            //     : null;
            return (
              <div
                key={leadUser.id}
                className=" bg-gray-100 dark:bg-[#202024] flex items-center justify-between gap-5 py-4 px-7 m-4"
              >
                <div className="flex flex-1 gap-4 items-center justify-start">
                 
                  {userData?.profile == "admin" && (
                     <div className="flex items-center justify-center h-10 w-10">
                        <button onClick={toggleBlur}>
                          {showBlur ? <FaEyeSlash className="text-rose-700 hover:text-neutral-500"/> : <FaEye />}
                        </button>
                        </div>
                      )}
                 
                  <div>
                    <div className="gap-2">

                      {/* {userData?.profile === "master" ?(
                      <span className=" text-sm text-black dark:text-white font-bold pl-2">
                     Master e admin pode ver {leadUser.name}
                      </span>
                      ):(
                        <span className="blur-sm text-sm text-black dark:text-white font-bold pl-2">
                        {leadUser.name}
                      </span>
                      )} */}
                      
                      {userData?.profile === "master" || userData?.profile ==="manager" ? (
                        <>
                        <span className="text-sm text-black dark:text-white font-bold pl-2">
                         {leadUser.name}
                        </span>
                         <span className="text-sm text-black dark:text-white pl-2">
                         WhatsApp{" "}
                         <strong className={` text-green-700 font-bold`}>
                           {telefoneFormatado}
                         </strong>
                       </span>
                       </>
                      ) : (
                        <>
                        <span className={`${showBlur ? 'blur-sm' : ''} text-sm text-black dark:text-white font-bold pl-2`}>
                          {leadUser.name}
                        </span>
                        <span className="text-sm text-black dark:text-white pl-2">
                        WhatsApp{" "}
                        <strong className={`${showBlur ? 'blur-sm' : ''} text-green-700 font-bold`}>
                          {telefoneFormatado}
                        </strong>
                      </span>
                      </>
                      )}
                      
                     
                      
                      {/* <span className="text-xs"> . 12 min</span> */}
                      {/* <span className="text-sm text-black dark:text-white pl-2 font-bold">
                        / ultimo envio as:{" "}
                        {moment(leadUser.last_message_sent)
                          .tz("America/Sao_Paulo")
                          .locale("pt-br")
                          .format("ll LT")}
                      </span> */}
                      
                    </div>
                   
                      <span className="text-sm text-black dark:text-white flex items-center gap-2 pl-2">
                        {/* <FaWhatsapp
                          className={` ${
                            leadUser &&
                            Array.isArray(leadUser.dialog) &&
                            leadUser.dialog.length >= 1
                              ? "text-green-700"
                              : `text-red-700`
                          }`}
                        />
                        /{" "}
                        {`  ${
                          leadUser &&
                          Array.isArray(leadUser.dialog) &&
                          leadUser.dialog.length >= 1
                            ? `${leadUser.dialog.length} interações`
                            : leadUser && leadUser.dialog
                            ? "0 interação"
                            : "0 interações"
                        }`}
                        <span className="text-xs">
                          ultima mensagem{" "}
                          {formatElapsedTime(leadUser.last_message_sent)}
                        </span> 
                         <FaWhatsapp
                          className={` ${
                          
                            leadUser.messageCount.length >= 1
                              ? "text-green-700"
                              : `text-red-700`
                          }`}
                        />
                        /{" "}
                        {`  ${
                          
                          leadUser.messageCount.length >= 1
                            ? `${leadUser.messageCount.length} interações`
                            : leadUser && leadUser.messageCount
                            ? "0 interação"
                            : "0 interações"
                        }`} 
                        {/* <span className="text-xs">
                          ultima mensagem{" "}
                          {formatElapsedTime(leadUser.last_message_sent)}
                        </span>  */}

                         
                      </span>
                      <span className="text-sm text-black dark:text-white flex items-center gap-2 pl-2">
                      <FaWhatsapp
                        className={leadUser.messageCount >= 1 ? "text-green-700" : "text-red-700"}
                      />
                      / {leadUser.messageCount >= 1 ? `${leadUser.messageCount} interações` : "0 interação"}
                      <span className="text-xs pl-2">
                          iniciou em {" "}
                          {moment(leadUser.start_message)
                            .tz("America/Sao_Paulo")
                            .format("DD/MM/YYYY, HH:mm:ss")}{" "}
                          {/* {leadUser.start_message} */}
                        </span>
                    </span>
                   

                    {leadUser.send == true && leadUser.sendAt !== null && (
                      <p>
                        <span className="text-sm text-black dark:text-white flex items-center gap-2 pl-2">
                          Integração realizada com{" "}
                          <strong className="text-green-700">sucesso</strong>
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-200 pl-2">
                          Envio para o CRM:
                          {moment(leadUser.sendAt)
                            .tz("America/Sao_Paulo")
                            .format("DD/MM/YYYY, HH:mm:ss")}{" "}
                        </span>
                      </p>
                    )}
                  </div>

                  {/* <div className=" py-5 px-4 dark:danger">
          <div className=" space-x-3 relative flex h-8 w-8 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-white dark:border-strokedark dark:bg-gray-500 dark:text-white">
          

                    {ultimaMensagem && (
                      <ChangeCompanyButtonWhats companyData={leadUser} />
                    )}
          </div>
        </div> */}
                 
                </div>
                <div className=" py-5 px-4 dark:danger">
                    <div className=" space-x-3 relative flex h-8 w-8 items-center justify-center rounded-full  bg-gray-400 hover:text-white  dark:bg-rose-700 dark:text-white hover:bg-rose-800 dark:hover:bg-rose-800">
                      <button
                        onClick={() => navigateToBotPage(leadUser)}
                        className="text-gray-200 hover:underline bg-rose-700 space-x-3 relative flex h-8 w-8 rounded-full  items-center justify-center"
                      >
                        <FaUsers />
                      </button>
                    </div>
                  </div>
                
              </div>
            );
          })}
          
      </div>
      <PaginationButtons
        totalPages={Math.ceil(leads.length / itemsPerPage)}
        totalItems={leads.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default CustomModalLeadsmessage;
