// components/SliderRight.js
import { useState } from "react";
import CustomerColor from "@/components/CustomerColor";
import { Lead } from "@/types/leads/leads";
import { formatarTelefone } from "@/util/formatPhone";
import moment from "moment-timezone";

interface SidebarRigthProps {
  sidebarRigthOpen: boolean;
  setSidebarRigthOpen: (arg: boolean) => void;
  lead: Lead;
}

const SliderRightLead = ({
  sidebarRigthOpen,
  setSidebarRigthOpen,
  lead,
}: SidebarRigthProps) => {
  const handleToggleSlider = () => {
    setSidebarRigthOpen(!sidebarRigthOpen);
  };

  return (
    <div
      className={`relative overflow-hidden h-screen w-full bg-white dark:bg-darkBlue   transition-transform ease-in-out duration-300 ${sidebarRigthOpen
        ? "transform translate-x-0"
        : "transform translate-x-full"
        }`}
    >

      <div>
        <div className="relative flex w-full flex-col px-6">
          <div className="mt-8">
            <div className="flex items-center justify-center">
              <div className="nui-avatar nui-avatar-2xl nui-avatar-rounded-full">
                <div className="rounded-full h-24 w-24">

                  <div className="flex justify-center items-center h-20 w-20 rounded-full bg-purpleivera">
                    <span className="dark:text-white text-2xl  text-weight-bold">
                      {lead && lead.name.substr(0, 2).toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-weight-bold text-gray-400 dark:text-white mt-4">
                <span>{lead && lead.name}</span>
              </p>
              <p className="text-weight-normal text-gray-400 dark:text-gray-400">
                <span>{lead && formatarTelefone(lead.phone)}</span>
              </p>
              <div className="my-4">
                <p className="text-sm   text-gray-400 dark:text-gray-400">
                  <span>
                    Todas as observações relacionadas ao progresso do atendimento do lead na plataforma AceleraIA
                  </span>
                </p>
              </div>
              <div className="divide-muted-200 dark:divide-muted-700 flex items-center justify-center divide-x">
                {lead && lead.start_message ? (
                  <div className="flex flex-row items-center justify-center gap-2 px-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      className="icon text-muted-400 size-4"
                      width="1em"
                      height="1em"
                      viewBox="0 0 256 256"
                    >
                      {/* Ícone */}
                    </svg>
                    <span className="text-gray-400 dark:text-gray-400 font-sans text-xs">
                      {moment(lead.start_message)
                        .tz("America/Sao_Paulo")
                        .format("DD/MM/YYYY, HH:mm:ss")}
                    </span>
                  </div>
                ) : null}
                {lead && lead.updated_at ? (
                  <div className="flex items-center flex-row justify-center gap-2 px-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      className="icon text-muted-400 size-4"
                      width="1em"
                      height="1em"
                      viewBox="0 0 256 256"
                    >
                      {/* Ícone */}
                    </svg>
                    <span className="text-gray-400 dark:text-gray-400 font-sans text-xs">
                      {moment(lead.updated_at)
                        .tz("America/Sao_Paulo")
                        .format("DD/MM/YYYY, HH:mm:ss")}
                    </span>
                  </div>
                ) : null}
              </div>

              <div className="mt-4">
                <div

                  className=" rounded-lg w-full text-gray-400 dark:text-gray-400"
                >
                  <span className="lowercase text-sm">
                    {" "}
                    status atual -{" "}
                    <strong className="text-rose-700">
                      {lead && lead.status}{" "}
                    </strong>
                  </span>
                </div>
                <span

                  className=" text-orange-500 dark:text-orange-500 mt-3 font-sans text-sm underline-offset-4 hover:underline"
                >
                  andamento -{" "}
                  {lead && lead.status == "NOTSCHEDULED"
                    ? "Com interesse"
                    : lead.status == "NSCHEDULED"
                      ? "Interessado"
                      : lead.status == "NOTSCHEDULED"
                        ? ""
                        : lead.status == "STARTED"
                          ? "Em contato"
                          : lead.status == "REPLIED"
                            ? "em atendimento"
                            : lead.status == "NOTREPLIED"
                              ? "Sem retorno"
                              : lead.status == "STOPPED"
                                ? "Sem interesse"
                                : lead.status == "ERROR"
                                  ? "Com Erro"
                                  : lead.status == ""
                                    ? "Novo"
                                    : ""}
                </span>
              </div>
              {lead && lead.send === true && lead.sendAt ? (
                <>
                  <div className="my-1">
                    <span className="text-gray-400 dark:text-gray-400 mt-3 font-sans text-sm underline-offset-4 hover:underline">
                      Enviado para CRM {" "}
                      {moment(lead.sendAt)
                        .tz("America/Sao_Paulo")
                        .format("DD/MM/YYYY, HH:mm:ss")}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 dark:text-gray-400  font-sans text-sm underline-offset-4 hover:underline">
                      {lead.source_id ? (
                        <>
                          Entregue - <strong className="text-green-700">sim</strong>
                        </>
                      ) : (
                        "não"
                      )}
                    </span>

                    <span className="text-gray-400 dark:text-gray-400 font-sans text-sm underline-offset-4 hover:underline">
                      Identificação lead-Id <strong className="text-green-700">{lead.source_id}</strong>

                    </span>

                  </div>
                </>
              ) : null}


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderRightLead;
