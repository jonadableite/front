"use client";
import { Empresa } from "@/types/empresa";
import { useState } from "react";
import api from "@/services/api";
import Image from "next/image";
import { toast } from "react-toastify";
import { saveMessageEdit } from "@/actions/companies/post-intent-uniti.action";
import { deleteMessageEdit } from "@/actions/companies/intents/delete-intent-uniti.action";
import { MdDelete, MdEdit, MdAccessTime } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { InsertMessageSave } from "@/actions/companies/intents/post-new-intent-uniti.action";
import { UserType } from "@/types";
import { getClientAuthenticatedAction } from "@/actions/users/get-client-authenticated.action";
type intentmessage = /*unresolved*/ any;
type IntentWithMessages = {
  messages: any[]; 
  
};
export default function MessageIntentsCompanie({
  intentsData,
}: {
  intentsData: any;
}) {


  const userData = getClientAuthenticatedAction();
  const [userDados, setUserDados] = useState<UserType | null>(userData);
  const [intentList, setIntentList] = useState<Array<Empresa>>(intentsData);
  const [intentListMessage, setIntentListMessage] = useState<Array<Empresa>>(
    intentsData?.meta_configuration?.messages_by_intent
  );


  const [selectedIntentName, setSelectedIntentName] = useState(null);
  const [selectedIntent, setSelectedIntent] =
    useState<Array<intentmessage> | null>(null);


  const [selectedIntentColor, setSelectedIntentColor] = useState(null);
  const [selectedTab, setSelectedTab] = useState("utterances");
  const [isLoading, setIsLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editMessageIndex, setEditMessageIndex] = useState(-1);
  const [editMessageContent, setEditMessageContent] = useState("");
  const [editIntentName, setEditIntentName] = useState("");

  const [newIntentContent, setNewIntentContent] = useState("");
  const [newIntentType, setNewIntentType] = useState("text");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInsertIntent = () => {

    handleInsert(newIntentContent, newIntentType);
   
    setNewIntentContent("");
    setNewIntentType("text");
    setIsModalOpen(true);
  };

  const handleIntentClick = (messages: any, intent: any) => {
  
    setIsLoading(true);
    setSelectedIntentName(intent);
    setTimeout(() => {
      setSelectedIntent(messages); // Directly pass messages array
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

  const handleEdit = (index: number, content: string, intentName: string) => {
    setEditMessageIndex(index);
    setEditMessageContent(content);
    setEditIntentName(intentName);
    setEditModalOpen(true);
  };

  const handleDelete = (index: number, content: string, intentName: string) => {
  
    setEditMessageIndex(index);
    setEditMessageContent(content);
    setEditIntentName(intentName);
    setDeleteModalOpen(true);
   
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setDeleteModalOpen(false);
  };

  const handleSaveEdit = () => {
    if (selectedIntent && editMessageIndex !== -1 && selectedIntentName) {
      // Obtém o nome da intenção
      const intentName = selectedIntentName;

      // Obtém as mensagens da intenção selecionada
      const messages: any[] = selectedIntent;

      // Atualiza a mensagem correspondente ao índice editado
      messages[editMessageIndex].content = editMessageContent;

      // Chama a função de salvar a edição passando o ID da empresa, o nome da intenção e as mensagens atualizadas
      saveMessageEdit(intentsData?.id, intentName, messages)
        .then(() => {
          toast.success("Mensagem editada com sucesso!");
          handleCloseEditModal();
        })
        .catch((error) => {
          toast.error("Erro ao editar a mensagem. Por favor, tente novamente.");
          console.error("Erro ao editar a mensagem:", error);
        });
    } else {
      toast.error("Erro ao editar a mensagem. Intenção ou índice inválidos.");
      console.error("Erro ao editar a mensagem: Intenção ou índice inválidos.");
    }
  };

  const handleInsert = (newIntentContent: string, newIntentType: string) => {
    setIsModalOpen(true);
    if (newIntentContent && newIntentType) {
      // Obtém o nome da intenção
      const intentName = selectedIntentName ?? "";
      // Obtém as mensagens da intenção selecionada
      const companyId = intentsData?.id;
      const parsedContent =
        newIntentType === "hold"
          ? parseInt(newIntentContent, 10)
          : newIntentContent;

      InsertMessageSave(companyId, intentName, newIntentContent, newIntentType)
        .then(() => {
          toast.success("Mensagem inserida com sucesso!");
          handleCloseEditModal();
          setIsModalOpen(false);
        })
        .catch((error) => {
          toast.error(
            "Erro ao inserir a mensagem. Por favor, tente novamente."
          );
          console.error("Erro ao inserir a mensagem:", error);
        });
    } else {
      toast.error("Erro ao inserir a mensagem. Conteúdo ou tipo inválidos.");
      console.error("Erro ao inserir a mensagem: Conteúdo ou tipo inválidos.");
    }
  };

  const handleDeleteEdit = () => {
    if (selectedIntent && editMessageIndex !== -1 && selectedIntentName) {
      // Obtém o nome da intenção
      let intentName: string = selectedIntentName;
      // Obtém as mensagens da intenção selecionada
      const index = editMessageIndex;
    
      deleteMessageEdit(intentsData?.id, intentName, index)
        .then(() => {
          toast.success("Mensagem excluída com sucesso!");
          handleCloseEditModal();
        })
        .catch((error) => {
          toast.error("Erro ao editar a mensagem. Por favor, tente novamente.");
          console.error("Erro ao editar a mensagem:", error);
        });
    } else {
      toast.error("Erro ao editar a mensagem. Intenção ou índice inválidos.");
      console.error("Erro ao editar a mensagem: Intenção ou índice inválidos.");
    }
  };

  const renderContentInput = () => {
    switch (newIntentType) {
      case "text":
        return (
          <textarea
            value={newIntentContent}
            onChange={(e) => setNewIntentContent(e.target.value)}
            placeholder="Conteúdo da Nova Intenção (Texto)"
            className="bg-transparent border border-gray-700 rounded-md px-3 py-2 mb-2 w-full focus:border-rose-700 focus:outline-none"
          />
        );
      case "image":
        return (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
             
            }}
            className="border border-gray-700 rounded-md px-3 py-2 mb-2 w-full focus:border-rose-700 focus:outline-none"
          />
        );
      case "document":
        return (
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => {
             
            }}
            className="border border-gray-700 rounded-md px-3 py-2 mb-2 w-full focus:border-rose-700 focus:outline-none"
          />
        );
     
      default:
        return null;
    }
  };

  return (
    <div className="col-span-12 -auto bg-gray-100  dark:bg-neutral-900 shadow-default  dark:bg-aibitMenu xl:col-span-12">
   
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7 pl-4 pr-4 ">
        <div className="col-span-12 overflow-y-auto max-h-[80vh] border border-nome bg-white dark:bg-neutral-800  xl:col-span-3 dark:border-neutral-900 shadow-lg  rounded-2xl p-4">
          {Object.entries(intentListMessage)
            .filter(([intent, messages]) => messages.length > 0)
            .map(([intent, messages]) => (
              <div
                key={intent}
                onClick={() => handleIntentClick(messages, intent)}
                className="mb-2 bg-strokedark m-5 flex gap-3 items-center cursor-pointer"
              >
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    handleIntentClick(messages, intent);
                  }}
                  className={`left-0 bottom-0 h-5 w-5 rounded-full border-2 ${
                    selectedIntentName === intent
                      ? "bg-rose-700"
                      : "bg-transparent"
                  }`}
                ></span>
                <span
                  className={`text-sm font-bold ml-2 font-serif uppercase ${
                    selectedIntentName === intent
                      ? "text-rose-700"
                      : "text-neutral-600  dark:text-gray-50"
                  }`}
                >
                  {intent.replace(/_/g, " ")}{" "}
                </span>
              </div>
            ))}
        </div>
       
        {selectedIntent && (
          <IntentDetails
            intent={selectedIntent}
            intentName={selectedIntentName} // Passa o nome da intenção para o componente
            selectedTab={selectedTab}
            onTabClick={handleTabClick}
            isLoading={isLoading}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleInsert={handleInsertIntent}
            userDados={userDados}
          />
        )}
      </div>

      {/* Modal de Edição */}
      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50  bg-gray-900 bg-opacity-50">
          <div className=" bg-gray-100  dark:bg-neutral-800 p-8 rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold  dark:text-white text-gray-500">
                Editar mensagem
              </h3>{" "}
              <button
                onClick={handleCloseEditModal}
                className=" hover:bg-gray-500 hover:dark:bg-[#78777766] text-gray-300 w-12 h-12  rounded-full"
              >
                x
              </button>
            </div>

            <textarea
              value={editMessageContent}
              onChange={(e) => setEditMessageContent(e.target.value)}
              className="my-3 dark:text-white text-gray-500 border border-neutral-600 focus:border-rose-600 rounded-md px-3 py-2 mb-2 w-full bg-transparent h-auto max-h-80"
              placeholder="Conteúdo da Mensagem"
              id="customMessageTextarea"
            />
            <button
              onClick={handleSaveEdit}
              className="bg-rose-700 dark:rose-700 text-white px-4 py-2 rounded-md mr-2"
            >
              Salvar
            </button>
            <button
              onClick={handleCloseEditModal}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal de deletar */}
      {deleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50  bg-gray-900 bg-opacity-50">
          <div className=" bg-gray-100  dark:bg-neutral-800 p-8 rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold  dark:text-white text-gray-500">
                Excluir Mensagem
              </h3>
              <button
                onClick={handleCloseEditModal}
                className=" hover:bg-gray-500 hover:dark:bg-[#78777766] text-gray-300 w-12 h-12  rounded-full"
              >
                x
              </button>
            </div>
            <textarea
              disabled
              value={editMessageContent}
              onChange={(e) => setEditMessageContent(e.target.value)}
              className="my-3 dark:text-white text-gray-500 border border-neutral-600 focus:border-rose-600 rounded-md px-3 py-2 mb-2 w-full bg-transparent h-auto max-h-80"
              placeholder="Conteúdo da Mensagem"
              id="customMessageTextarea"
            />
            <button
              onClick={handleDeleteEdit}
              className="flex flex-row justify-center items-center gap-2 bg-rose-700 dark:bg-rose-700  dark:text-white w-full px-4 py-2 rounded-md mr-2  dark:hover:dark:bg-[#515151] hover:dark:text-rose-700"
            >
              <MdDelete className="" size={18} />
              <span className=" font-bold text-[12px]">Deletar</span>
            </button>
          
          </div>
        </div>
      )}

      {/* Modal de inserir*/}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="w-2/5	 min-h-96 dark:bg-neutral-800 bg-white p-8 rounded-lg">
            <div className="flex justify-between">
              <h3 className="text-xl font-bold mb-4 dark:text-white text-gray-500">
              Adicionar Comando
              </h3>{" "}
              <button
                onClick={handleCloseModal}
                className="hover:dark:bg-neutral-600 hover:bg-rose-700 text-gray-300 px-4 py-2 rounded-full mr-2"
              >
                x
              </button>
            </div>

            <div className="mb-2 py-2">
              <div className="flex justify-start">
                <span className="py-2 dark:text-white text-neutral-600">Tipo</span>
              </div>
              <div className="flex">
                <label className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    value="text"
                    checked={newIntentType === "text"}
                    onChange={() => setNewIntentType("text")}
                    className="form-radio h-4 w-4 text-rose-600 border-gray-300 focus:ring-rose-500 "
                  />
                  <span className="ml-2 dark:text-white text-neutral-600">Texto</span>
                </label>
                <label className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    value="image"
                    checked={newIntentType === "image"}
                    onChange={() => setNewIntentType("image")}
                    className="form-radio h-4 w-4 text-rose-600 border-gray-300 focus:ring-rose-500"
                  />
                  <span className="ml-2 dark:text-white text-neutral-600">Imagem</span>
                </label>
                <label className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    value="document"
                    checked={newIntentType === "document"}
                    onChange={() => setNewIntentType("document")}
                    className="form-radio h-4 w-4 text-rose-600 border-gray-300 focus:ring-rose-500"
                  />
                  <span className="ml-2 dark:text-white text-neutral-600">Documento</span>
                </label>
                <label className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    value="hold"
                    checked={newIntentType === "hold"}
                    onChange={() => setNewIntentType("hold")}
                    className="form-radio h-4 w-4 text-rose-600 border-gray-300 focus:ring-rose-500 "
                  />
                  <span className="ml-2 dark:text-white text-neutral-600">
                    Delay {"(Segundos)"} | Máx: 1500 seg
                  </span>
                </label>
              </div>
            </div>

            <textarea
              value={newIntentContent}
              onChange={(e) => setNewIntentContent(e.target.value)}
              placeholder={
                newIntentType === "image"
                  ? "URL da Imagem"
                  : newIntentType === "text"
                  ? "Conteúdo da mensagem"
                  : newIntentType === "document"
                  ? "URL do documento"
                  : newIntentType === "hold"
                  ? "Delay da mensagem milésimos | Máx: 1500 seg"
                  : "Conteúdo da Nova Intenção"
              }
              className="bg-transparent border border-gray-700 rounded-md px-3 py-2 mb-2 w-full focus:border-rose-700 focus:outline-none"
            />

            <div className="flex justify-end">
              <button
                onClick={handleInsertIntent}
                className="bg-rose-700 hover:bg-rose-600 text-white px-4 py-2 rounded-md w-full"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const IntentDetails = ({
  intent,
  selectedTab,
  intentName,
  onTabClick,
  isLoading,
  handleEdit,
  handleDelete,
  handleInsert,
  userDados,
}: {
  userDados: any;
  intent: any;
  selectedTab: string;
  intentName: string | null; // Define o tipo do parâmetro intentName
  onTabClick: (tab: string) => void;
  isLoading: boolean;
  handleEdit: (index: number, content: string, intentName: string) => void;
  handleDelete: (index: number, content: string, intentName: string) => void;
  handleInsert: () => void;

}) => {
 
  return (
   
    <div
      style={{
        zIndex: 0,
        width: "100%",
        backgroundPosition: "center",
        backgroundImage: "url(/assets/wa-background.547106e6.png)",
        backgroundRepeat: "repeat",
        backgroundSize: "300px", // Ajuste o tamanho conforme necessário
      }}
      className="col-span-12 h-auto  min-h-[450px] max-h-[80vh] dark:bg-neutral-800/3 bg-white pl-2 pr-2 shadow-default dark:border-strokedark  xl:col-span-9 relative dark:bg-neutral-800/30 border border-neutral-300 dark:border-neutral-900 shadow-lg rounded-2xl "
    >
      
      {isLoading && (
      
        <div
          style={{ zIndex: 1 }}
          className="absolute top-0 left-0 right-0 bottom-0 h-full flex items-top justify-center p-5 bg-[#000] bg-opacity-90"
        >
          {/* <p>Carregando...</p> */}

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

    
      {selectedTab === "utterances" && (
        <>
          <div className="mb-4 overflow-y-auto min-h-[66vh]">
            <div className="min-h-[55vh] max-h-[70vh] overflow-y-auto">
              {intent &&
                intent.map((message: any, index: any) => (
                  <div
                    className="flex flex-row-reverse items-center p-4 w-full"
                    key={index}
                  >
                    {/* Renderizar o conteúdo de acordo com o tipo de mensagem */}
                    {message.type === "text" ? (
                      <div className="h-auto w-full max-w-md p-6 bg-white dark:bg-[#202020] dark:bg-neutral-800/1 text-neutral-600 dark:text-white rounded-tl-[15px] rounded-bl-[15px] rounded-br-[15px]">
                        <span>{message.content}</span>
                      </div>
                    ) : message.type === "image" ? (
                      <div className="h-auto w-auto p-2 bg-white dark:bg-neutral-800 text-neutral-600 dark:text-white rounded-tl-[15px] rounded-bl-[15px] rounded-br-[15px]">
                        <img
                          src={message.url}
                          alt="Imagem"
                          className="h-auto w-72 rounded-tl-[15px] rounded-bl-[15px] rounded-br-[15px]"
                        />
                      </div>
                    ) : message.type === "document" ? (
                      <div className="h-auto w-auto p-2 bg-white dark:bg-neutral-800 text-neutral-600 dark:text-white rounded-tl-[15px] rounded-bl-[15px] rounded-br-[15px]">
                        <iframe
                          src={message.url}
                          title="PDF"
                          className="h-auto w-auto rounded-tl-[15px] rounded-bl-[15px] rounded-br-[15px]"
                        />
                        <span>Arquivo PDF</span>
                      </div>
                       ) : message.type === "video" ? (
                        <div className="h-auto w-[250px] p-2 bg-white dark:bg-neutral-800 text-neutral-600 dark:text-white rounded-tl-[15px] rounded-bl-[15px] rounded-br-[15px]">
                          <video
                          
                            controls
                            src={message.url}
                            className="h-auto w-auto rounded-tl-[15px] rounded-bl-[15px] rounded-br-[15px]"
                          />
                          <span>Arquivo Video</span>
                        </div>
                    ) : message.type === "hold" ? (
                      <div className=" flex flex-row items-center h-auto w-auto gap-2 p-2 bg-white dark:bg-neutral-800 text-neutral-600 dark:text-white rounded-tl-[15px] rounded-bl-[15px] rounded-br-[15px]">
                        <MdAccessTime />{" "}
                        <span>
                          {message.time === message.time
                            ? "Daley de 1 segundo"
                            : "Aguarde 1 segundo para envio"}
                        </span>
                      </div>
                    ) : null}

                    <div className="mr-4 flex flex-grow gap-4 justify-end">
                      {/* {userDados && userDados.profile === "master" && ( */}
                      <>
                        <button
                          disabled={
                            !userDados ||
                            (userDados.profile !== "master" &&
                              userDados.profile !== "manager")
                          }
                          className="w-[50px] h-[50px] flex justify-center items-center bg-[#20202066] text-white dark:text-white rounded-full hover:dark:bg-[#3b3b3b66]"
                          onClick={() =>
                            handleEdit(index, message.content, intentName || "")
                          }
                        >
                          <span className="text-white text-[10px]">
                            <MdEdit
                              className="text-neutral-600"
                              size={18}
                            />
                          </span>
                        </button>
                        <button
                          disabled={
                            !userDados ||
                            (userDados.profile !== "master" &&
                              userDados.profile !== "manager")
                          }
                          className="w-[50px] h-[50px] flex justify-center items-center bg-[#20202066] rounded-full hover:dark:bg-[#3b3b3b66] hover:dark:text-neutral-600"
                          onClick={() =>
                            handleDelete(
                              index,
                              message.content,
                              intentName || ""
                            )
                          }
                        >
                          <span className="text-white text-[10px]">
                            <MdDelete
                              className="text-rose-700 "
                              size={18}
                            />
                          </span>
                        </button>
                      </>
                      {/* )} */}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="w-full mr-4 flex flex-grow gap-4 justify-center bg-transparent bottom-0 absolute py-4">
            <button
              //={!userDados || userDados.profile !== "master"}
              disabled={
                userDados.profile !== "master" &&
                userDados.profile !== "manager"
              }
              className="flex flex-row justify-center items-center gap-2 p-2 px-4 bg-gray-50 dark:bg-[#20202066] text-white dark:text-white rounded-full hover:dark:bg-[#3b3b3b66]"
              onClick={handleInsert}
            >
              <FaPlus className="text-neutral-600 dark:text-white" size={10} />
              <span className=" text-neutral-600 dark:text-white dark:text-neutr text-[12px]">
                {" "}
                Adicionar Comando
              </span>
            </button>
          
          </div>
        </>
      )}
    </div>
  );
};

