"use client";

import { Lead } from "@/types/leads/leads";
import { SetStateAction, useState } from "react";
import { BsCheckAll } from "react-icons/bs";
import Image from "next/image";
import { MdModeEdit, MdDelete, MdQuestionAnswer } from "react-icons/md";
import { RiRobot2Line } from "react-icons/ri";
import { Intention } from "@/types/empresa/intention";
import { FaWhatsapp } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { MdSend, MdAccessTime } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { EditLeadId } from "@/actions/leads/patch-lead-company.action";
import { saveMessageManual } from "@/actions/leads/post-lead-message-manual.action";
import { EditDialogLeadId } from "@/actions/leads/patch-leadId-dialog.action";
import { formatarTelefone } from "@/util/formatPhone";
import { getClientAuthenticatedAction } from "@/actions/users/get-client-authenticated.action";
import { getCompanyUnitiesAction } from "@/actions/companies/get-company-unities.action";
import { UserType } from "@/types";

export default function MessageIntentsCompanie({
  leadsData,
  //leadDate,
}: {
  //leadsData:Lead[];
  leadsData: { leads: Lead[] };
  //leadDate: { leads: Lead[] };
}) {
  const userData = getClientAuthenticatedAction();
  //console.log(userData, "meu user aqui no leadsssss");
  console.log(leadsData, 'leads-MessageIdLeads');
  //console.log(leadDate,'leads por datas')
  const [selectedIntentColor, setSelectedIntentColor] = useState<Lead | null>(
    null
  );
  const [selectedIntent, setSelectedIntent] = useState<Lead | null>(null);

  // const [selectedIntent, setSelectedIntent] = useState<Array<Lead>>(leadsData);
  // const [selectedIntentColor, setSelectedIntentColor] = useState(null);
  const [selectedTab, setSelectedTab] = useState("utterances");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredStatus, setFilteredStatus] = useState("STARTED");

  const handleIntentClick = (lead: Lead) => {
    //console.log(selectedIntentColor, "Leads");
    setIsLoading(true);
    setSelectedIntentColor(lead);
    setTimeout(() => {
      setSelectedIntent(lead);
      setIsLoading(false);
    }, 1000);
  };

  const handleTabClick = (tab: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedTab(tab);
      setIsLoading(false);
    }, 1000);
  };

  const handleStatusFilter = (status: any) => {
    setFilteredStatus(status);
  };

  const LeadStatus = [
    // { id: "STARTED", label: "Iniciados" },
    { id: "REPLIED", label: "Atendimento" },
    // { id: "STOPPED", label: "Stop" },
    { id: "NOTSCHEDULED", label: "Interesse" },
    { id: "SCHEDULED", label: "Agendados" },
  ];
  const LeadStatusSelected = [
    { id: "STARTED", label: "Iniciado" },
    { id: "REPLIED", label: "Atendimento" },
    { id: "NOTSCHEDULED", label: "Interesse" },
    { id: "SCHEDULED", label: "Agendados" },
    { id: "NOTREPLIED", label: "Sem interesse" },
    { id: "STOPPED", label: "Stop" },
    { id: "ERROR", label: "Erro" },
  ];
  const fetchLeads = async () => {
    // Aqui você pode adicionar a lógica para atualizar os leads do backend
    try {
      // Simulação de uma requisição assíncrona (substitua por sua lógica real)
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        //console.log("Leads atualizados!");
      }, 1000);
    } catch (error) {
      console.error("Erro ao buscar os leads:", error);
    }
  };

  return (
    <div className="col-span-12 bg-white overflow-y-auto shadow-default  dark:bg-darkBlue xl:col-span-12 ">
      <div className="grid grid-cols-12 gap-0 md:mt-0 md:gap-0 2xl:mt-0 2xl:gap-0">
        <div
          className="col-span-12 relative overflow-y-auto  max-h-[calc(100vh_-_65px)] border-stroke dark:bg-darkBlue/50  shadow-default dark:border-strokedark  dark:bg-aibitMenu xl:col-span-2
 border-r-[1px]  border-rose-700 shadow-lg mb-20 "
        >
          <div className="  mt-4 grid grid-cols-4 md:grid-cols-2 gap-2 md:mt-2 md:gap-2 2xl:mt-2 2xl:gap-2 p-2">


            {LeadStatus.map((status) => (
              <button
                key={status.id}
                className={`${filteredStatus === status.id
                  ? "dark:bg-darkBlue bg-rose-900 text-rose-700 dark:text-rose-700"
                  : "dark:bg-rose-700 bg-rose-700"
                  } hover:bg-rose-900 text-white py-2 px-2 rounded flex items-center overflow-hidden`}
                onClick={() => {
                  handleStatusFilter(status.id);
                  fetchLeads(); // Atualiza os leads ao filtrar por status
                }}
              >
                <span className="flex justify-center items-center text-white text-[10px] bg-black w-5 h-5 p-1 mr-1 rounded-full">
                  {
                    leadsData?.leads?.filter(
                      (lead) => lead.status === status.id
                    ).length
                  }
                </span>
                <span className="text-white text-xs ">{status.label}</span>
              </button>
            ))}

            <select
              value={filteredStatus}
              onChange={(e) => {
                const selectedStatus = e.target.value;
                handleStatusFilter(selectedStatus);
                fetchLeads(); // Atualiza os leads ao filtrar por status
              }}
              className="dark:bg-rose-700 bg-rose-700 text-white py-2 px-2 rounded text-[10px]"
            >
              {LeadStatusSelected.map((status) => (
                <option
                  key={status.id}
                  value={status.id}
                  className={`p-3 m-3 ${filteredStatus === status.id
                    ? "dark:bg-darkBlue bg-rose-900 text-rose-700 dark:text-rose-700"
                    : "dark:bg-rose-700 bg-rose-700"
                    } text-white text-[10px] `}
                >
                  {status.label} -{" "}
                  {
                    leadsData?.leads?.filter(
                      (lead) => lead.status === status.id
                    ).length
                  }
                </option>
              ))}
            </select>
          </div>

          {leadsData?.leads
            .filter((lead: Lead) => lead.status === filteredStatus)
            .map((lead: Lead) => (
              <div
                key={`ld-nt-${lead.id}`}
                onClick={(e) => {
                  e.stopPropagation(); // Evita a propagação do evento
                  handleIntentClick(lead);
                }}
                className={`bg-strokedark  flex  items-start cursor-pointer border-b-[0.5px] border-neutral-500 py-2 hover:dark:bg-darkBlue transition-all ${selectedIntentColor?.id === lead.id
                  ? "dark:bg-darkBlue"
                  : "bg-transparent"
                  }`}
              >
                <div className="flex flex-row  w-full">
                  <div className="flex flex-col pl-2 py-1 justify-center items-center gap-y-3">
                    <span className="flex justify-center items-center text-white  text-base font-bold  w-[40px] h-[40px] dark:bg-rose-700 bg-rose-700 rounded-full">
                      {lead.name.substr(0, 2).toUpperCase()}{" "}
                      {/* Obtém as duas primeiras letras do nome */}
                    </span>

                  </div>

                  <div className="flex flex-col p-4">
                    <span className="dark:text-white text-neutral-700 text-[14px] font-bold ml-2">
                      {/* {lead.name} */}
                      {lead.name.substr(0, 15).toUpperCase()}{" "}
                    </span>
                    <span className="dark:text-white text-neutral-500  text-xs font-bold ml-2">
                      {formatarTelefone(lead.phone)}
                    </span>
                    <span className="text-xs ml-2 dark:text-white text-neutral-700">
                      {lead.last_message_sent !== undefined
                        ? formatTimestamp(lead.last_message_sent)
                        : ""}
                    </span>
                    <div className="flex flex-row gap-2">
                      <span className="text-[12px] ml-2 dark:text-white text-neutral-700">
                        {lead.status === "NOTSCHEDULED" ||
                          (lead.status === "SCHEDULED" && lead.send === true)
                          ? "Integração CRM com sucesso"
                          : ""}
                      </span>
                      {lead.status === "NOTSCHEDULED" ||
                        (lead.status === "SCHEDULED" && lead.send === true) ? (
                        <span
                          className={`left-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-neutral-400   ${lead.status === "NOTSCHEDULED" ||
                            (lead.status === "SCHEDULED" && lead.send === true)
                            ? "dark:bg-green-700 bg-green-700"
                            : "dark:bg-rose-700 bg-rose-700"
                            }`}
                        ></span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {selectedIntent && userData && (
          <IntentDetails
            lead={selectedIntent}
            selectedTab={selectedTab}
            onTabClick={handleTabClick}
            isLoading={isLoading}
            userData={userData}
          />
        )}
        {!selectedIntent && (
          <div
            className="col-span-12 flex flex-col justify-center items-center h-screen min-h-screen  max-h-screen   p-7.5 shadow-default dark:border-strokedark  xl:col-span-8 relative
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
  selectedTab,
  onTabClick,
  isLoading,
  userData,
}: {
  lead: Lead; // Alterei de Empresa para any
  selectedTab: string;
  onTabClick: (tab: string) => void;
  isLoading: boolean;
  userData: UserType;
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
        const companyId = lead.config_id;
        const companyDetails = await getCompanyUnitiesAction(companyId);
        //console.log(companyDetails.campaign_number_business,'minha companya')
        if (companyDetails.error) {
          console.error(
            "Erro ao buscar detalhes da empresa:",
            companyDetails.error
          );
          return;
        }

        //console.log("Mensagem enviada com sucesso!");

        await saveMessageManual(
          lead.phone,
          message,
          companyDetails?.campaign_number_business
        ); // Envie o número de telefone e config_id  e a mensagem para a função
        //console.log("Mensagem enviada com sucesso!");
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


        const updatedLead = {
          ...lead,
          dialog: lead.dialog ? [...lead.dialog, newMessage] : [newMessage],
        };


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
      //console.info(lead.id, newStatus, "está na página");

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
    <div
      className="col-span-12  h-screen min-h-screen  max-h-screen dark:bg-darkBlue bg-white p-7.5 shadow-default dark:border-strokedark  xl:col-span-10 relative
     shadow-lg  pb-4"
    >
      {isLoading && (
        <div
          // style={{ zIndex: 99999 }}
          className="absolute z-40 top-0 left-0 right-0 bottom-0 h-full flex items-top justify-center p-5 bg-[#000] bg-opacity-90"
        >
          <div className="mt-0 flex justify-center items-center">
            <Image
              src="/assets/funilv.svg"
              alt=""
              width={80}
              height={80}
              className="animate-spin-2 duration-1800"
            />
          </div>
        </div>
      )}

      {lead && Array.isArray(lead.dialog) && (
        <div
          className="flex flex-row items-center justify-between relative z-10  pl-2 gap-2 w-full bg-white dark:bg-roxouro1 py-2"
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
                <FiMoreVertical className="ml-1 text-rose-700 dark:text-gray-200" />
              </button>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <div className="fixed z-40  inset-0 flex items-center  justify-center ">
          <div className="z-50 dark:bg-roxouro1 bg-white rounded-lg p-8 min-w-[420px] max-md:w-96">
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
              <option value="" className="">
                NOVO
              </option>
              <option value="NAOQUALIFICADO" className="">
                NÃO QUALIFICADO
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
            className="fixed inset-0 bg-black opacity-50"
          ></div>
        </div>
      )}

      {selectedTab === "utterances" && (
        <div className=" mb-4 relative top-0 overflow-y-auto md:relative bottom-0  min-h-[72vh] max-h-[78vh]">


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
                      <div className="flex justify-center items-center h-8 w-8 ml-2 rounded-full bg-[#660533]">
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
                        <span className="text-white  text-sm">AI</span>
                      </div>
                      <div className="flex flex-col h-auto justify-start  max-w-2xl p-2 bg-black dark:bg-verdewhats text-white dark:text-neutral-800 rounded-tr-[15px] rounded-bl-[15px] rounded-br-[15px]">
                        {item.message.type === "template" ? (
                          <>

                            <span className="dark:text-white text-neutral-500 text-sm">
                              {item.message?.template.name
                                ? "Envio Template inicial"
                                : ""}{" "}
                              {item.message?.template.name || ""}
                            </span>
                          </>
                        ) : item.message.type === "text" ? (

                          <>

                            <span className="dark:text-black text-neutral-500 text-sm">
                              {item.message?.text?.body || ""}
                            </span>
                          </>
                        ) : item.message?.type === "video" ? (
                          <div className="h-auto w-[280px] p-2 bg-white dark:bg-darkBlue text-neutral-600 dark:text-white rounded-tl-[15px] rounded-bl-[15px] rounded-br-[15px]">
                            <video
                              controls
                              src={item.message.video?.link}
                              className="h-auto w-auto rounded-tl-[15px] rounded-bl-[15px] rounded-br-[15px]"
                            />
                          </div>
                        ) : item.message?.type === "image" ? (
                          <>
                            <img
                              src={item.message.image?.link}
                              alt="Imagem"
                              className="h-auto w-72 rounded-tl-[15px] rounded-bl-[15px] rounded-br-[15px] pb-2"
                            />

                          </>
                        ) : item.message.type === "document" ? (
                          <>
                            <iframe
                              src={item.message.url}
                              title="PDF"
                              className="h-auto w-auto rounded-tl-[15px] rounded-bl-[15px] rounded-br-[15px]"
                            />
                            <span>Arquivo PDF</span>
                            <span className="text-xs flex items-center justify-end dark:text-white text-neutral-500">
                              {formatTimestamp(item.timestamp)}
                            </span>{" "}
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
                        {/* Exibir timestamp */}
                      </div>
                    </div>
                  </>
                )}
              </>
            ))}
        </div>
      )}
      <div
        className="bg-[#0000001f] dark:bg-[rgba(255, 255, 255, 0.12)]"
        style={{
          zIndex: 0,
          position: "absolute",
          top: "0px",
          left: "0px",
          width: "100%",
          height: "100%",
          //backgroundColor: "rgba(255, 255, 255, 0.12)",
          backgroundImage: "url(/assets/wa-background.547106e6.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "400px", // Ajuste o tamanho conforme necessário
        }}
      ></div>

      {(userData.profile === "master" || userData.profile === "manager") && (
        <>
          {lead && Array.isArray(lead.dialog) && (
            <div
              className="flex flex-row items-center justify-between fixed z-10  pl-2 gap-2 w-full max-w-[1990px] bg-white dark:bg-roxouro1 py-2 bottom-0"
              style={{ zIndex: "99999!important" }}
            >
              <div className="flex flex-row justify-between w-[1100px] bg-white dark:bg-darkBlue/30 gap-6">
                <div className="relative h-11 w-full min-w-[200px]">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="peer h-full w-full overflow-hidden rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal dark:text-white text-neutral-600 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-rose-700 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                  />
                  <label className="before:content[' '] after:content[' '] text-gray-300 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-rose-700 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-rose-700 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-rose-700 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Mensagem *
                  </label>
                </div>
                <div>
                  <button
                    onClick={handleSendMessage}
                    className="w-[50px] h-[50px] rounded-full bg-[#035d4d] text-white flex flex-row justify-center items-center"
                  >
                    <MdSend size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Aqui você pode renderizar o conteúdo do modal */}
    </div>
  );
};
