"use client";

import { Lead } from "@/types/leads/leads";
import { Fragment, useState } from "react";
import Image from "next/image";
import { FaPaperclip, FaWhatsapp } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { MdAccessTime, MdSend } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import SliderRightLead from "@/components/CompaniesDatas/Leads-list-company/SliderbarRigth";
import { EditLeadId } from "@/actions/leads/patch-lead-company.action";
import { saveMessageManual } from "@/actions/leads/post-lead-message-manual.action";
import { EditDialogLeadId } from "@/actions/leads/patch-leadId-dialog.action";
import { formatarTelefone } from "@/util/formatPhone";
import { getClientAuthenticatedAction } from "@/actions/users/get-client-authenticated.action";
import { getCompanyUnitiesAction } from "@/actions/companies/get-company-unities.action";
import { UserType } from "@/types";

export default function LeadIdMessageCompanie({
  leadsData,
}: {
  leadsData: Lead;
}) {
  const userData = getClientAuthenticatedAction();
  const [sidebarRigthOpen, setSidebarRigthOpen] = useState(true);
  const [selectedIntent, setSelectedIntent] = useState<Lead | null>(leadsData);
  const [selectedIntentColor, setSelectedIntentColor] = useState(null);
  //const [selectedTab, setSelectedTab] = useState("utterances");
  const [isLoading, setIsLoading] = useState(false);
  // console.log(selectedIntent, "lead teste");

  const fetchLeads = async () => {
    // Aqui você pode adicionar a lógica para atualizar os leads do backend
    try {
      // Simulação de uma requisição assíncrona (substitua por sua lógica real)
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        console.log("Leads atualizados!");
      }, 1000);
    } catch (error) {
      console.error("Erro ao buscar os leads:", error);
    }
  };

  return (
    //col-span-12 bg-white overflow-y-auto shadow-default  dark:bg-neutral-950 xl:col-span-12
    <div className="flex flex-row h-[calc(100vh_-_64px)] overflow-hidden">
      <div className="grid grid-cols-12 gap-0 md:mt-0 md:gap-0 2xl:mt-0 2xl:gap-0 border-b-indigo-900  h-[calc(100vh_-_68px)]">
        {selectedIntent && userData && (
          <>
            <IntentDetails
              lead={selectedIntent}
              userData={userData}

              isLoading={isLoading}
            />

          </>
        )}

        {!selectedIntent && (
          <div
            className="col-span-12 flex flex-col justify-center items-center h-screen min-h-screen  max-h-screen shadow-default dark:border-strokedark  xl:col-span-10 relative
      shadow-lg  pb-4"
          >
            <div className="flex flex-col justify-center items-center ">
              <span className="dark:text-gray-400 text-gray-600 py-5">
                <FaWhatsapp className="text-4xl  dark:text-gray-400 text-gray-600" />
              </span>
              <span className="dark:text-gray-400 text-gray-600">
                Suas mensagens aparecerão aqui..
              </span>
            </div>
          </div>
        )}

        <div className="col-span-12 relative overflow-hidden max-h-full  shadow-default xl:col-span-2 shadow-lg ">
          {selectedIntent && (
            <SliderRightLead
              lead={selectedIntent}
              sidebarRigthOpen={sidebarRigthOpen}
              setSidebarRigthOpen={setSidebarRigthOpen}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const formatTimestamp = (timestamp: string | number | Date) => {
  const date = new Date(timestamp);
  const options: any = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return date.toLocaleString("pt-BR", options); // Ajuste o 'pt-BR' conforme a localização desejada
};

const IntentDetails = ({
  lead,
  // selectedTab,
  // onTabClick,
  userData,
  isLoading,
}: {
  lead: Lead; // Alterei de Empresa para any
  userData: UserType;
  // selectedTab: string;
  //onTabClick: (tab: string) => void;
  isLoading: boolean;
}) => {
  //console.log(lead, "meu lead a ser distribuido");
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [sendCurationData, setSendCurationData] = useState(false);
  const [newCurationStatus, setNewCurationStatus] = useState("");
  const [message, setMessage] = useState("");

  //envio de mensagem manual para o lead
  const handleSendMessage = async () => {
    try {
      // Verifica se há um número de telefone disponível
      if (lead && lead.phone) {

        // Busca detalhes da empresa usando o companyId
        const companyId = lead.config_id;
        const companyDetails = await getCompanyUnitiesAction(companyId);
        console.log(companyDetails.campaign_number_business, 'minha companya')
        if (companyDetails.error) {
          console.error("Erro ao buscar detalhes da empresa:", companyDetails.error);
          return;
        }

        console.log("Mensagem enviada com sucesso!");

        await saveMessageManual(lead.phone, message, companyDetails?.campaign_number_business); // Envie o número de telefone e config_id  e a mensagem para a função
        console.log("Mensagem enviada com sucesso!");
        setMessage("");
        const newMessage = {
          who: "vera",
          message: {
            messaging_product: "whatsapp",
            to: lead.phone,
            type: "text",
            text: {
              body: message,
            },
          },
          timestamp: { $numberLong: Date.now().toString() },
          statusFrom: "STARTED",
          statusTo: "REPLIED",
          isSent: true,
          isDelivered: true,
          isRead: false,
          intent: "inicio",
        };

        // Atualiza o estado do lead adicionando a nova mensagem ao array dialog
        const updatedLead = {
          ...lead,
          dialog: lead.dialog ? [...lead.dialog, newMessage] : [newMessage],
        };

        // Atualiza o estado do lead
        // (Substitua esta linha pela função real que atualiza o estado do lead no seu contexto)
        console.log("Lead atualizado:", updatedLead);
        // Atualiza o lead no servidor
        await EditDialogLeadId(lead.id, updatedLead);
      } else {
        console.error("Número de telefone do lead não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChangeStatus = async () => {
    if (lead.id && newStatus) {
      console.info(lead.id, newStatus, "está na página");

      const curationData = sendCurationData
        ? {
          curation: {
            data_conclusion: new Date(),
            interest_ai: newCurationStatus,
            interest_real: newCurationStatus, // Aqui você passa o valor selecionado do select de curadoria
            status: "CONCLUIDO",
            data_requirement: new Date().toISOString(),
          },
        }
        : {};

      handleCloseModal();
      EditLeadId(lead.id, newStatus, curationData)
        .then(() => {
          handleCloseModal();
        })
        .catch((error) => {
          console.error("Erro ao editar a mensagem:", error);
        });
    } else {
      console.error("Erro ao editar a mensagem: Intenção ou índice inválidos.");
    }
  };

  return (
    <div className="col-span-12 flex flex-col justify-start items-center h-screen shadow-default dark:border-strokedark  xl:col-span-10 relative   shadow-lg  pb-4">
      {isLoading && (
        <div className="absolute z-40 top-0 left-0 right-0 bottom-0 h-full flex items-top justify-center p-5 bg-[#000] bg-opacity-90">
          <div className="mt-40">
            <Image
              src="/assets/funilv.svg"
              alt=""
              width={120}
              height={120}
              className="animate-spin-2 duration-1800"
            />
          </div>
        </div>
      )}

      {lead && Array.isArray(lead.dialog) && (
        <div
          key={lead.id}
          className="flex flex-row items-center justify-between relative z-10  pl-2 gap-2 w-full bg-white dark:bg-darkBlue py-2"
          style={{ zIndex: "99999!important" }}
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-row  w-[60px] h-[60px] justify-center items-center p-2">
              <span className="flex justify-center items-center text-white  text-base font-bold  w-[40px] h-[40px] bg-rose-700 rounded-full">
                {lead.name.substr(0, 2).toUpperCase()}{" "}
                {/* Obtém as duas primeiras letras do nome */}
              </span>
            </div>
            <div className="flex flex-col ">
              <span className=" dark:text-white text-neutral-700 text-base font-bold  p-1  rounded-full">
                {lead.name}
              </span>
              <span className="dark:text-white text-neutral-500 text-sm font-bold  p-1  rounded-full">
                {formatarTelefone(lead.phone)}
              </span>
            </div>
          </div>
          {userData && userData?.profile === "master" && (
            <div className="flex flex-col  px-4">
              <button
                onClick={handleOpenModal}
                className="text-white  hover:bg-darkBlue rounded-md p-2"
              >
                <FiMoreVertical className="ml-1 text-danger" />
              </button>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <div className="fixed z-40  inset-0 flex items-center  justify-center ">
          <div className="z-50 dark:bg-darkBlue bg-white rounded-lg p-8 min-w-[420px] max-md:w-96">
            <div className="flex flex-row justify-between items-center py-4">
              <h2 className="text-xl font-bold text-white dark:text-gray-300">
                Alterar Status do Lead
              </h2>
              <button
                onClick={handleCloseModal}
                className="bg-darkBlue dark:hover:bg-darkBlue/30 text-gray-200 p-4  rounded-full "
              >
                X
              </button>
            </div>

            <p>Nome: {lead.name}</p>
            <p>Telefone: {lead.phone}</p>
            <p>Status atual: {lead.status}</p>
            {/* Aqui você pode adicionar um input para selecionar o novo status */}
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              //className="bg-transparent border border-gray-700 rounded-md px-3 py-2 mb-2 w-full"
              //id="small"
              className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-rose-700 focus:border-rose-700 dark:bg-darkBlue dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-rose-700 dark:focus:border-rose-700"
            >
              <option value={lead.status} className="">
                {lead.status}
              </option>
              <option value="STARTED" className="">
                STARTED
              </option>
              <option value="REPLIED" className="p-4">
                REPLIED
              </option>
              <option value="NOTSCHEDULED" className="">
                NOTSCHEDULED
              </option>
              <option value="SCHEDULED" className="">
                SCHEDULED
              </option>
              <option value="NOTREPLIED" className="p-4">
                NOTREPLIED
              </option>
              <option value="STOPPED" className="">
                STOPPED
              </option>
              <option value="ERROR" className="">
                ERROR
              </option>

              {/* Adicione outras opções de tipo, se necessário */}
            </select>
            {/* Checkbox para permitir o envio dos dados de curation */}
            <label className="block mt-4">
              <input
                type="checkbox"
                checked={sendCurationData}
                onChange={(e) => setSendCurationData(e.target.checked)}
              />
              <span className="ml-2">Enviar dados de curation</span>
            </label>
            <select
              value={newCurationStatus}
              onChange={(e) => setNewCurationStatus(e.target.value)}
              className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-rose-700 focus:border-rose-700 dark:bg-darkBlue dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-rose-700 dark:focus:border-rose-700"
            >
              <option value="" className="p-4">
                Selecione uma opção
              </option>
              <option value="SEM_INTERESSE" className="p-4">
                Sem interesse
              </option>
              <option value="INTERESSADO" className="">
                Interessado
              </option>
            </select>
            {/* Botões para confirmar ou cancelar a alteração */}
            <button
              onClick={handleChangeStatus}
              className="bg-rose-700 text-white px-4 py-2 rounded-md mt-4 mr-2"
            >
              Confirmar
            </button>
          </div>
          <div
            onClick={handleCloseModal}
            className="fixed inset-0 bg-darkBlue opacity-50"
          ></div>
        </div>
      )}

      {/* {selectedTab === "utterances" && ( */}
      <div className=" mb-16 p-5 relative top-0 overflow-y-auto md:relative bottom-0  min-h-[72vh] w-full h-auto">
        {/* {lead && Array.isArray(lead.dialog) && lead.dialog.map((item: any, index: number) => (
              <div key={index} className="flex flex-row-reverse items-center p-4 w-full">
                <div className="h-auto w-auto p-6 bg-darkBlue dark:bg-green-800 tex-white dark:text-white rounded-tl-[15px] rounded-bl-[15px] rounded-br-[15px]">
                  <span>{item.messages.text.body}</span> 
                </div>
              </div>
            ))} */}

        {lead &&
          Array.isArray(lead.dialog) &&
          lead.dialog.map((item: any, index: number) => (
            <>
              {item.who === "lead" &&
                item.messages &&
                item.messages.map((message: any, index: number) => (
                  <div
                    key={`ld-wp-${index}`}
                    className="flex flex-row-reverse items-start p-2 w-full "
                    style={{ zIndex: "1", position: "relative" }}
                  >
                    <div className="flex justify-center items-center h-8 w-8 ml-2 rounded-full bg-purpleivera">
                      <span className="dark:text-white text-text-white text-[12px]">
                        {lead && lead.name.substr(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div
                      key={`lead-${index}`}
                      className="flex flex-col h-auto w-auto p-2  bg-[#035d4d] text-white dark:text-white rounded-tl-[15px] rounded-bl-[15px] rounded-br-[15px]"
                    >
                      {message.type === "text" ? (
                        <>
                          <span className="py-3 dark:text-white text-text-white text-sm">
                            {lead.name}
                          </span>
                          <span className="dark:text-white text-text-white text-sm">
                            {message.text?.body}
                          </span>
                        </>
                      ) : message.type === "button" ? (
                        <>
                          <span className="py-3 dark:text-white text-text-white text-sm">
                            {lead.name}
                          </span>
                          <span className="dark:text-white text-text-white text-sm">
                            Selecionou {message.button?.text}
                          </span>
                        </>
                      ) : message?.type === "image" ? (
                        <>
                          <img
                            src="https://t2.tudocdn.net/659336?w=1920"
                            alt="Imagem"
                            className="h-auto w-72 rounded-tl-[15px] rounded-bl-[15px] rounded-br-[15px] pb-2"
                          />
                          {/* <span className="text-xs flex items-center justify-end dark:text-white text-neutral-500">
                      {formatTimestamp(item.timestamp)}
                    </span> */}
                        </>
                      ) : message.type === "document" ? (
                        <>
                          <iframe
                            src={message.url}
                            title="PDF"
                            className="h-auto w-auto rounded-tl-[15px] rounded-bl-[15px] rounded-br-[15px]"
                          />
                          <span>Arquivo PDF</span>
                          <span className="text-xs flex items-center justify-end dark:text-white text-neutral-500">
                            {formatTimestamp(item.timestamp)}
                          </span>{" "}
                        </>
                      ) : message.type === "hold" ? (
                        <>
                          <MdAccessTime />{" "}
                          <span>
                            {message.time === message.time
                              ? "Daley de 1 segundo"
                              : "Aguarde 1 segundo para envio"}
                          </span>
                          <span className="text-xs flex items-center justify-end dark:text-white text-neutral-500 pb-2">
                            {formatTimestamp(message.timestamp)}
                          </span>{" "}
                        </>
                      ) : null}
                      {/* Exibindo o nome do lead  */}
                      {/* <span className="py-1 text-[14px]"> {lead.name}:</span>
                      <span className="text-base">
                        {message.text?.body || ""}
                      </span>
                      <span className="text-xs flex items-center justify-end dark:text-white text-neutral-500">
                        {formatTimestamp(message.timestamp)}
                      </span>{" "}
                      {/* Exibir timestamp */}
                      <span className="text-xs flex items-center justify-end dark:text-white text-white pb-2">
                        {formatTimestamp(message.timestamp)}
                      </span>{" "}
                    </div>
                  </div>
                ))}

              {item.who === "vera" && (
                //w-5/12
                <>
                  <div
                    key={`ld-wp-${index}`}
                    className="flex flex-row items-start  p-2 w-full"
                    style={{ zIndex: "1", position: "relative" }}
                  >
                    <div className="flex justify-center items-center h-8 w-8 mr-2 rounded-full bg-rose-700">
                      <span className="dark:text-white text-white text-sm">
                        AI
                      </span>
                    </div>
                    <div className="flex flex-col h-auto justify-start  max-w-2xl p-2 bg-white dark:bg-darkBlue text-white dark:text-white rounded-tr-[15px] rounded-bl-[15px] rounded-br-[15px]">
                      {item.message.type === "template" ? (
                        <>
                          {/* <span className="py-3 dark:text-white text-neutral-500 text-sm">
                            IA:
                          </span> */}
                          <span className="dark:text-white text-neutral-500 text-sm">
                            {item.message?.template.name
                              ? "Envio Template inicial"
                              : ""}{" "}
                            {item.message?.template.name || ""}
                          </span>
                        </>
                      ) : item.message.type === "text" ? (
                        // <div className="h-auto w-full max-w-md p-6 bg-darkBlue dark:bg-darkBlue/1 text-white dark:text-white rounded-tl-[15px] rounded-bl-[15px] rounded-br-[15px]">
                        //   <span>{item.message.content}</span>
                        // </div>
                        <>
                          {/* <span className="py-3 dark:text-white text-neutral-500 text-sm">
                            IA:
                          </span> */}
                          <span className="dark:text-white text-neutral-500 text-sm">
                            {item.message?.text?.body || ""}
                          </span>
                        </>
                      ) : item.message?.type === "image" ? (
                        <>
                          <img
                            src={item.message.image?.link}
                            alt="Imagem"
                            className="h-auto w-72 rounded-tl-[15px] rounded-bl-[15px] rounded-br-[15px] pb-2"
                          />
                          {/* <span className="text-xs flex items-center justify-end dark:text-white text-neutral-500">
                      {formatTimestamp(item.timestamp)}
                    </span> */}
                        </>
                      ) : item.message.type === "document" ? (
                        <>
                          <iframe
                            src={item.message.url}
                            title="PDF"
                            className="h-auto w-auto rounded-tl-[15px] rounded-bl-[15px] rounded-br-[15px]"
                          />
                          <span>Arquivo PDF</span>
                          {/* <span className="text-xs flex items-center justify-end dark:text-white text-neutral-500">
                            {formatTimestamp(item.timestamp)}
                          </span>{" "} */}
                        </>
                      ) : item.message.type === "location" ? (
                        <>
                          <img
                            style={{ backgroundPosition: 'center', backgroundSize: 'contain' }}
                            src="/assets/map.jpeg" // Substitua pelo caminho da sua imagem padrão de localização
                            alt="Localização"
                            className="h-auto w-auto rounded-tl-[15px] rounded-bl-[15px] rounded-br-[15px]"
                          />
                          <span className="dark:text-white text-neutral-500 text-sm py-3">Localização</span>
                          <span className="dark:text-white text-neutral-500 text-sm">{item.message.location.name}</span>
                          <span className="dark:text-white text-neutral-500 text-sm max-w-64">{item.message.location.address}</span>

                        </>
                      ) : item.message.type === "hold" ? (
                        <>
                          <MdAccessTime />{" "}
                          <span>
                            {item.message.time === item.message.time
                              ? "Daley de 1 segundo"
                              : "Aguarde 1 segundo para envio"}
                          </span>
                          <span className="text-xs flex items-center justify-end dark:text-white text-neutral-500 pb-2">
                            {formatTimestamp(item.timestamp)}
                          </span>{" "}
                        </>
                      ) : null}

                      <span className="text-xs flex items-center justify-end dark:text-white text-neutral-500 pb-2">
                        {formatTimestamp(item.timestamp)}
                      </span>{" "}

                    </div>
                  </div>
                </>
              )}
            </>
          ))}
      </div>
      {/* )} */}
      <div
        className="bg-darkBlue dark:bg-roxouro1 h-[calc(100vh_-_68px)]"
        style={{
          zIndex: 0,
          position: "absolute",
          top: "0px",
          left: "0px",
          width: "100%",
          backgroundPosition: 'center',
          //backgroundColor: "rgba(255, 255, 255, 0.12)",
          backgroundImage: "url(/assets/wa-background.547106e6.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "300px", // Ajuste o tamanho conforme necessário
        }}
      ></div>

      {userData && (userData.profile === "master" || userData.profile === "manager") && (
        <>
          {lead && Array.isArray(lead.dialog) && (
            <div className="flex flex-row items-center justify-between relative bottom-14 z-40 px-6 py-1 w-full">
              <div className="flex flex-row justify-between items-center w-full h-16 bg-white dark:bg-darkBlue gap-6 rounded-xl px-6 py-2">
                <button className="hover:bg-gray-100 dark:hover:bg-gray-900 text-base text-gray-400 dark:text-gray-200 hover:text-rose-700 dark:hover:text-gray-200 hidden size-10 items-center justify-center rounded-xl transition-colors duration-200 focus:outline-none sm:flex">
                  <FaPaperclip />
                </button>
                <div className="flex justify-center items-center relative h-11 w-full min-w-[200px]">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="peer h-10 w-full overflow-hidden rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-rose-700 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                  />
                  <label className="before:content[' '] after:content[' '] text-gray-300 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-rose-700 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-rose-700 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-rose-700 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Mensagem *
                  </label>
                </div>
                <div>
                  <button
                    onClick={handleSendMessage}
                    className="w-10 h-10 rounded-full bg-[#035d4d] text-white flex flex-row justify-center items-center"
                  >
                    <MdSend size={15} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}


    </div>
  );
};
