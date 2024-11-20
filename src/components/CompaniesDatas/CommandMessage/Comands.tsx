"use client";

import { MouseEventHandler, useEffect, useState } from "react";
import { Comando } from "@/types/comando/comando";
import api from "@/services/api";
import Image from "next/image";
import { toast } from "react-toastify";
import { saveMessageEdit } from "@/actions/companies/post-intent-uniti.action";
import { deleteMessageEdit } from "@/actions/companies/intents/delete-intent-uniti.action";
import { saveCommandMessage } from "@/actions/companies/comando/post-command.action";
import { InsertMessageSave } from "@/actions/companies/intents/post-new-intent-uniti.action";
import { UserType } from "@/types";
import { MdDelete, MdEdit, MdAccessTime, MdOutlinePause } from "react-icons/md";
import { BiSolidMessage } from "react-icons/bi";
import { FiMoreVertical, FiPlus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { getClientAuthenticatedAction } from "@/actions/users/get-client-authenticated.action";
import { getClientCommandAction } from "@/actions/companies/comando/get-all-client-comando.action";
import { IUser } from "@/interfaces";
import { revalidatePath } from "next/cache";

interface InterMessages {
  content: string;
  intentmessage: any;
}
interface SelectedIntent {
  messages: InterMessages[]; // Assuming InterMessages is a type defined elsewhere
  // other properties...
}

export default function ComandosMessageCompanie({
  commandData,
}: {
  commandData: Comando[];
}) {

  const [userDatas, setUserData] = useState<IUser | null>(null);

  const [intentList, setIntentList] = useState<Array<Comando>>(commandData);
  const [intentListMessage, setIntentListMessage] =
    useState<Array<Comando>>(commandData);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [editMode, setEditMode] = useState(
    Array(intentListMessage.length).fill(false)
  );
  const [editedMessages, setEditedMessages] = useState<Array<Comando>>([]);

  useEffect(() => {

    const fetchUserData = async () => {
      try {

        const userData = getClientAuthenticatedAction();

        setUserData(userData);
      } catch (error) {

        console.error("Error fetching user data:", error);
      }
    };


    fetchUserData();
  }, []);



  const handleInputChange = (e: any, index: any, field: any) => {
    const { value } = e.target;
    const updatedMessages: any = [...editedMessages];


    if (index >= 0 && index < updatedMessages.length) {
      updatedMessages[index][field] = value;
      setEditedMessages(updatedMessages);
    } else {
      console.error("Índice fora dos limites do array.");
    }
  };


  const handleEditClick = (index: any) => {
    const updatedEditMode = [...editMode];
    updatedEditMode[index] = true;
    setEditMode(updatedEditMode);
    handleInsertIntent();
  };

  const handleConfirmClick = (index: any) => {

    const updatedEditMode = [...editMode];
    updatedEditMode[index] = false;
    setEditMode(updatedEditMode);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [selectedIntentName, setSelectedIntentName] = useState<string | null>(
    null
  );

  const [selectedIntent, setSelectedIntent] = useState<SelectedIntent | null>(
    null
  );

  const [selectedIntentColor, setSelectedIntentColor] = useState(null);
  const [selectedTab, setSelectedTab] = useState("utterances");
  const [isLoading, setIsLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editMessageIndex, setEditMessageIndex] = useState(-1);
  const [editMessageContent, setEditMessageContent] = useState("");
  const [editIntentName, setEditIntentName] = useState("");

  const [newIntentContent, setNewIntentContent] = useState("");
  const [newIntentType, setNewIntentType] = useState("");
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
    setNewIntentType("");
    setIsModalOpen(true);
  };

  const handleIntentClick = (messages: any, intent: any) => {
    console.log(messages, "minha state", intent);
    setIsLoading(true);
    setSelectedIntentName(intent);
    setTimeout(() => {
      setSelectedIntent({ messages });
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
    console.log("Excluir mensagem de índice:", index);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setDeleteModalOpen(false);
  };

  const handleSaveEdit = () => {

    if (selectedIntent && editMessageIndex !== -1) {

      const intentName = selectedIntentName;


      const messages = selectedIntent.messages;


      messages[editMessageIndex].content = editMessageContent;


    } else {
      toast.error("Erro ao editar a mensagem. Intenção ou índice inválidos.");
      console.error("Erro ao editar a mensagem: Intenção ou índice inválidos.");
    }
  };

  const handleDeleteEdit = () => {
    if (selectedIntent && editMessageIndex !== -1) {

      const intentName = selectedIntentName;

      const index = editMessageIndex;

    } else {
      toast.error("Erro ao editar a mensagem. Intenção ou índice inválidos.");
      console.error("Erro ao editar a mensagem: Intenção ou índice inválidos.");
    }
  };

  const handleInsertClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    // Chame handleInsert com os argumentos necessários
    handleInsert(newIntentContent, newIntentType);
  };

  const handleInsert = (newIntentContent: string, newIntentType: string) => {
    console.log("Botão 'Adicionar comando' clicado!");
    setIsModalOpen(true);
    if (newIntentContent && newIntentType) {
      const parsedContent =
        newIntentType === "hold"
          ? parseInt(newIntentContent, 10)
          : newIntentContent;

      console.info(newIntentContent, parsedContent, "etsa na pagina");

      saveCommandMessage(newIntentContent, newIntentType)
        .then(() => {
          toast.success("Comando adicionado com sucesso!");
          getClientCommandAction()
            .then((newData) => {
              setIntentListMessage(newData);
            })
            .catch((error) => {
              console.error("Erro ao buscar os novos dados:", error);
            });
          handleCloseEditModal();
          setIsModalOpen(false);
        })
        .catch((error) => {
          toast.error(
            "Erro ao adicionar o comando. Por favor, tente novamente."
          );
          console.error("Erro ao adicionar o comando:", error);
        });
    } else {
      toast.error("Erro ao editar a mensagem. Intenção ou índice inválidos.");
      console.error("Erro ao editar a mensagem: Intenção ou índice inválidos.");
    }
  };


  function renderComponentOrPlaceholder() {
    if (isModalOpen) {
      return <ComandosInsertMessageCompanie />;
    } else {
      return null;
    }
  }
  function ComandosInsertMessageCompanie() {
    return (
      <div className="col-span-12 flex flex-col w-full overflow-y-auto max-h-auto bg-white dark:bg-darkBlue p-7.5 shadow-md dark:border-stroke dark:shadow-lg rounded-2xl p-4">
        <div className="w-full	 min-h-96 dark:bg-darkBlue bg-white p-8 rounded-lg">
          <div className="flex justify-between">
            <h3 className="text-xl font-bold mb-4 dark:text-white text-gray-500">
              Adicionar nova Intenção
            </h3>{" "}
            <button
              onClick={handleCloseModal}
              className="hover:dark:bg-[#78777766] text-gray-300 px-4 py-2 rounded-full mr-2"
            >
              x
            </button>
          </div>

          <div className="mb-2 py-2">
            <div className="flex justify-start">
              <span className="py-2 dark:text-white text-gray-500">Tipo</span>
            </div>
          </div>


          <div className="relative  h-auto w-full min-w-[200px]">
            <textarea
              rows={1}
              value={newIntentContent}
              onChange={(e) => setNewIntentContent(e.target.value)}

              className=" text-gray-800 dark:text-white peer h-full min-h-[40px] w-full !resize-none  rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-rose-700 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=""
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-rose-700 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-rose-700 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-rose-700 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Messagem para comando *
            </label>
          </div>
          <div className="relative  h-auto w-full min-w-[200px]">
            <textarea
              rows={1}
              value={newIntentType}
              onChange={(e) => setNewIntentType(e.target.value)}

              className="text-gray-800 dark:text-white peer h-full min-h-[40px] w-full !resize-none  rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-rose-700 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=""
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-rose-700 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-rose-700 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-rose-700 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Messagem para comando *
            </label>
          </div>
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
    );
  }
  return (
    <div className="col-span-12 h-auto  shadow-default   dark:bg-transparent xl:col-span-12">
      <div
        className="flex flex-col items-start justify-between relative  w-full  p-4"
        style={{ zIndex: "99999!important" }}
      >
        <div className=" py-4  border-b border-neutral-300 w-full">
          <h2 className="text-2xl font-bold mb-4 text-neutral-500 dark:text-neutral-600">
            Comandos
          </h2>

          <button
            onClick={handleInsertClick}//onClick={handleInsert}
            disabled={!userDatas || (userDatas?.profile !== "master" && userDatas?.profile !== "manager")}
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-rose-700 rounded-md hover:bg-rose-900 focus:outline-none focus:bg-rose-600"
          >
            <FaPlus className="mr-2" />
            Adicionar comando
          </button>
        </div>
      </div>
      <div className="overflow-y-auto mt-4 grid grid-cols-12 gap-4 md:mt-2 md:gap-6  2xl:gap-7 pl-4 pr-4 ">
        {isModalOpen && (
          <div className="col-span-12 flex flex-col w-full overflow-y-auto max-h-auto bg-white dark:bg-darkBlue p-7.5 shadow-md dark:border-stroke dark:shadow-lg rounded-2xl p-4">
            <div className="w-full	 min-h-96 dark:bg-darkBlue bg-white rounded-lg">
              <div className="flex justify-between">
                <h3 className="text-xl font-bold mb-4 dark:text-white text-gray-500">
                  Comandos padrões
                </h3>{" "}
                <button
                  onClick={handleCloseModal}
                  className="hover:dark:bg-[#78777766] text-gray-300 px-4 py-2 rounded-full mr-2"
                >
                  x
                </button>
              </div>

              <div className="mb-2 py-2">
                <div className="flex justify-start">
                  <span className="py-2 dark:text-white text-gray-500">
                    Descrição da intenção
                  </span>
                </div>
              </div>



              <div className="mb-4 flex flex-col gap-6 xl:flex-row">
                <textarea
                  rows={1}
                  value={newIntentType}
                  onChange={(e) => setNewIntentType(e.target.value)}
                  className="text-gray-800 dark:text-white peer h-full min-h-[80px] w-full overflow-hidden rounded-md border border-neutral-300 bg-transparent px-3 py-3 font-sans text-base font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:borderborder-neutral-300 placeholder-shown:border-t-blue-gray-200 focus:border focus:border-rose-700  focus:outline-0 disabled:border-1 disabled:bg-blue-gray-50"
                  placeholder="Messagem descritivo * "
                />

              </div>
              <div className="mb-4 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Comando
                  </label>
                  <input
                    value={newIntentContent}
                    onChange={(e) => setNewIntentContent(e.target.value)}
                    type="text"
                    placeholder="Nome do Comando"
                    className="w-full rounded border border-neutral-300 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-rose-500 active:border-rose-700 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-rose-700"
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Continuidade
                  </label>
                  <div className="w-full gap-4 flex flex-row justify-start rounded border border-neutral-300 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                    <input
                      checked={true}
                      onChange={(e) => setIsActive(e.target.checked)}
                      id="bordered-checkbox-2"
                      type="checkbox"
                      value=""
                      name="bordered-checkbox"
                      className="w-5  text-blue-600 bg-gray-100 border-gray-300 rounded border-1 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-rose-700 active:border-rose-700 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <label
                      htmlFor="bordered-checkbox-2"
                      className=" block text-black dark:text-white"
                    >
                      ativo
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleInsertClick}

                  className="bg-rose-700 hover:bg-rose-600 text-white px-4 py-2 rounded-md w-full"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        )}

        {Array.isArray(intentListMessage) &&
          intentListMessage.map((commands, index) => (
            <>
              <div
                key={commands.id}
                className="col-span-12 flex flex-col w-full overflow-y-auto max-h-auto bg-white dark:bg-neutral-800 p-7.5 shadow-md dark:border-stroke dark:shadow-lg rounded-2xl p-4"
              >
                <div className="flex flex-row justify-between items-center relative h-auto w-full min-w-[200px] my-2">
                  <span className="text-gray-800 dark:text-white text-lg">
                    {commands.name}
                  </span>
                  {(userDatas && userDatas?.profile === "master" || userDatas?.profile === "manager") && (
                    <button
                      type="button"

                      onClick={() =>
                        setOpenDropdownId(
                          openDropdownId === commands.id
                            ? null
                            : commands.id ?? null
                        )
                      }
                      className="flex items-center justify-center p-2 w-10 h-10 text-sm font-medium text-gray-700 hover:bg-rose-700 dark:hover:bg-neutral-600 focus:outline-none rounded-full"
                      id={`options-menu-${index}`}
                      aria-expanded={
                        openDropdownId === commands.id ? "true" : "false"
                      }
                      aria-haspopup="true"
                    >
                      <FiMoreVertical className="ml-1 text-danger" />
                    </button>
                  )}
                </div>
                {openDropdownId === commands.id && (
                  <div className="z-10 min-h-[60px] origin-top-right absolute right-20  mt-2 mr-12 p-4 w-56 rounded-md  bg-gray-100 shadow dark:bg-neutral-600 ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-4"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby={`options-menu-${index}`}
                    >
                      <button
                        className="flex px-4 py-2 gap-2 items-center justify-start text-sm text-neutral-400 dark:text-white hover:bg-neutral-900/50 hover:bg-opacity-20 font-extrabold hover:dark:bg-neutral-900/50 hover:dark:bg-opacity-20 w-full text-left rounded-lg"
                        onClick={() => handleEditClick(index)}
                        role="edit"
                      >
                        <MdEdit size={12} />
                        Editar
                      </button>
                      <button
                        className="flex px-4 py-2 gap-2 items-center justify-start text-sm text-red-800  hover:bg-red-600/40 hover:bg-opacity-20 hover:dark:bg-red-600/40 hover:dark:bg-opacity-20 w-full text-left rounded-lg"

                        role="delete"
                      >
                        <MdOutlinePause size={12} />
                        Excluir
                      </button>
                    </div>
                  </div>
                )}
                <div className="relative h-auto w-full min-w-[200px] my-4">
                  <textarea
                    disabled={!editMode[index]}
                    //type="text"
                    value={commands.descritivo}
                    onChange={(e) => handleInputChange(e, index, "descritivo")}
                    className="text-gray-800 dark:text-white peer h-full min-h-[80px] w-full overflow-hidden rounded-md border border-neutral-300 bg-transparent px-3 py-3 font-sans text-base font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-1 focus:border-rose-700  focus:outline-0 disabled:border-1 disabled:bg-blue-gray-50"
                    placeholder=" "
                  />

                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Comando
                    </label>
                    <input
                      disabled={!editMode[index]}
                      value={commands.name}
                      onChange={(e) => handleInputChange(e, index, "name")}
                      type="text"
                      placeholder=" "
                      className="w-full rounded border border-neutral-300 bg-transparent py-3 px-5 text-base font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  focus:border-1  focus:outline-0"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Continuidade
                    </label>
                    <div className="w-full gap-4 flex flex-row justify-start rounded border border-neutral-300 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input focus:border-1  focus:outline-0">
                      <input
                        checked={true}
                        onChange={(e) => setIsActive(e.target.checked)}
                        id="bordered-checkbox-2"
                        type="checkbox"
                        value=""
                        name="bordered-checkbox"
                        className="w-5  text-rose-700 bg-gray-100 rounded border border-neutral-300 bg-transparent py-3 px-5 text-base font-medium outline-none transition focus:border-rose-700 active:border-rose-700 disabled:cursor-default disabled:bg-whiter dark:border-form-neutral-600 dark:bg-form-input dark:focus:border-rose-700"
                      />

                      <label
                        htmlFor="bordered-checkbox-2"
                        className=" block text-black dark:text-white"
                      >
                        ativo
                      </label>
                    </div>
                  </div>
                </div>
                <div className="relative  h-auto w-full min-w-[200px]">
                  {editMode[index] && (
                    <button
                      onClick={handleConfirmClick}
                      className=" w-full py-2 px-4 mt-4 bg-green-700 text-white rounded-md shadow-md hover:bg-green-800 focus:outline-none"
                    >
                      Confirmar alteração
                    </button>
                  )}
                </div>
              </div>

              <hr className="col-span-12 border border-neutral-300 " />
            </>
          ))}
      </div>

      {/* Modal de Edição */}
      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className=" bg-neutral-800 p-8 rounded-lg">
            <div className="flex justify-between">
              <h3 className="text-xl font-bold mb-4 dark:text-white text-gray-500">
                Editar mensagem
              </h3>{" "}
              <button
                onClick={handleCloseEditModal}
                className="hover:dark:bg-[#78777766] text-gray-300 px-4 py-2 rounded-full mr-2"
              >
                x
              </button>
            </div>

            <textarea
              value={editMessageContent}
              onChange={(e) => setEditMessageContent(e.target.value)}
              className="border border-neutral-300 focus:border-rose-600 rounded-md px-3 py-2 mb-2 w-full bg-transparent h-auto max-h-80"
              placeholder="Conteúdo da Mensagem"
              id="customMessageTextarea"
            />
            <button
              onClick={handleSaveEdit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
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
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className=" bg-neutral-800 p-8 rounded-lg">
            <div className="flex justify-between items-center  py-4 gap-8">
              <span className="text-xl font-bold  dark:text-white text-gray-500">
                Excluir Mensagem
              </span>
              <button
                onClick={handleCloseEditModal}
                className="hover:dark:bg-[#78777766] text-gray-300 px-4 py-2 rounded-full mr-2"
              >
                x
              </button>
            </div>
            <textarea
              disabled
              value={editMessageContent}
              onChange={(e) => setEditMessageContent(e.target.value)}
              className="border border-neutral-300 focus:border-rose-600 rounded-md px-3 py-2 mb-2 w-full bg-transparent h-auto max-h-80"
              placeholder="Conteúdo da Mensagem"
              id="customMessageTextarea"
            />
            <button
              onClick={handleDeleteEdit}
              className="flex flex-row justify-center items-center gap-2 dark:bg-rose-700  dark:text-white w-full px-4 py-2 rounded-md mr-2  dark:hover:dark:bg-[#515151] hover:dark:text-rose-700"
            >
              <MdDelete className="" size={18} />
              <span className=" font-bold text-[12px]">Excluir</span>
            </button>

          </div>
        </div>
      )}
    </div>
  );
}