"use client";

import { useState } from 'react';
import { MessageTrigger } from "@/types/empresa/messageTrigger";
import ChangeCompanyButtonWhats from "../buttons/change-message-whats-modal";
import PaginationButtons from "../buttons/button-paginate-message";
import { formatarTelefone } from '@/util/formatPhone';
import { FaWhatsapp } from "react-icons/fa";
import moment from "moment-timezone";


export default function MessageTriggerCompanie({
  messagetriggerData,
}: {
  messagetriggerData: Array<MessageTrigger>;
}) {

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = messagetriggerData.slice(startIndex, endIndex);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-aibitMenu xl:col-span-12">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Mensagens disparadas WhatsApp disponíveis {messagetriggerData.length}
      </h4>

      <div>
      {itemsToShow.length > 0 &&
          itemsToShow.map((whats: MessageTrigger) => {
            const telefoneFormatado = formatarTelefone(whats.phone);

            // Verificar se há conteúdo antes de acessar a última mensagem
            const ultimaMensagem =
              whats.conteudo && whats.conteudo.length > 0
                ? whats.conteudo[whats.conteudo.length - 1]
                : null;

            return (
              <div
                className="bg-bgmessage flex items-center gap-5 py-3 px-7.5 m-4"
                key={whats.id}
              >
               
               
                <div className="flex flex-1 items-center justify-between">
                  <div>
                   
                    <div className="gap-2">
                    <span className="text-sm text-black dark:text-white pl-2">
                        {ultimaMensagem
                          ? `/ última mensagem: ${ultimaMensagem.data}`
                          : ""}

                          
                      </span>
                    <span className="text-sm text-black dark:text-white font-bold pl-2">
                    {whats.name}
                      </span>
                      <span className="text-sm text-black dark:text-white pl-2">
                        WhatsApp <strong className="text-success font-bold">{telefoneFormatado}</strong>
                      </span>
                      {/* <span className="text-xs"> . 12 min</span> */}
                      <span className="text-sm text-black dark:text-white pl-2">
                        / ultimo envio as: {moment(ultimaMensagem?.data)
                          .tz("America/Sao_Paulo")
                          .format("ll")}
                      </span>
                    </div>
                    <p>
                      <span className="text-sm text-black dark:text-white flex items-center gap-2">
                        <FaWhatsapp
                          className={` ${
                            whats.interaction >= 1
                              ? "text-success"
                              : `text-danger`
                          }`}
                        />
                        /{" "}
                        {` ${
                          whats.interaction >= 1
                            ? `${whats.interaction} interações`
                            : `${whats.interaction} interação`
                        }`}
                      </span>
                      <span className="text-xs"> . 12 min</span>
                    </p>
                  </div>
                  {whats.active !== false && (
                    <div
                      className={`inline-flex h-6 w-6 items-center justify-center py-1 px-3 p-1 rounded-md  text-sm font-medium text-white
                    ${whats.enviado == true ? "bg-primary " : "bg-danger "}`}
                    >
                      <span className="text-sm font-medium text-white">
                        {" "}
                        ok
                      </span>
                    </div>
                  )}
                  
                  <div className=" py-5 px-4 dark:danger">
                    <div className=" space-x-3.5 relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white">
                    {ultimaMensagem && (
                      <ChangeCompanyButtonWhats companyData={whats} />
                    )}
                         
                        
                   
                    </div>
                  </div>
                </div>
              </div>

              
            );
          })}
      </div>

      <PaginationButtons
        totalPages={Math.ceil(messagetriggerData.length / itemsPerPage)}
        totalItems={messagetriggerData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}


