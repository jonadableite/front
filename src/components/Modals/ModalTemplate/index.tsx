"use client";

import React, { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import { AiFillFolderOpen } from "react-icons/ai";
import api from "@/services/api";
import toast from "react-hot-toast";
import Image from "next/image";

interface CustomModalProps {
  id: string;
  phone: string;
  name: string;
  text: string;
  image: string;
  active: boolean;
  type: string;
  interaction: string;
  companyId: string;

  onRequestClose: () => void;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  selectedImage: File | null;
  setSelectedImage: Dispatch<SetStateAction<File | null>>;
}

const CustomModalTemplate: React.FC<CustomModalProps> = ({
  id,
  phone,
  name,
  text,
  active,
  type,
  image,
  interaction,
  onRequestClose,
  inputValue,
  setInputValue,
  selectedImage,
  setSelectedImage,
  companyId,
}) => {
  const [isActive, setIsActive] = useState(active);
  const [selectedType, setSelectedType] = useState(type);
  const [selectedText, setSelectedText] = useState(text);
  const [inputName, setInputName] = useState(name);
  const [inputInteraction, setInputInteraction] = useState(interaction);
  const [inputPhone, setInputPhone] = useState(phone);

  console.log(image, "padrao");
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedImage(file || null);
  };

  const sendMessageTemplate = async () => {
    try {
      const toastId = toast.loading("Enviando mensagem...");

      const formData = new FormData();
      const templateData = {
        id,
        phone,
        name,
        image,
        type: selectedType,
        text: selectedText,
        active: isActive,
        interaction,
      };

      const addTemplateField = (key: string, value: string) => {
        formData.append(`template[${key}]`, value);
      };

      addTemplateField("phone", inputPhone);
      addTemplateField("name", inputName);
      addTemplateField("type", selectedType);
      addTemplateField("text", selectedText);
      addTemplateField("active", String(isActive));
      addTemplateField("interaction", inputInteraction.toString());
      formData.append("paste", "template");
      // formData.append('template[name]', name);
      // formData.append('template[type]', selectedType);
      // formData.append('template[text]', selectedText);
      // formData.append('template[active]', String(isActive));
      // formData.append('template[interaction]', interaction.toString());

      // Adicione a imagem existente se ela estiver presente
      if (templateData.image) {
        formData.append("image", image);
      }
      // Adicione a imagem se existir
      if (selectedImage) {
        formData.append("image", selectedImage, selectedImage.name);
      }

      console.log("form", formData);

      const response = await api.put(
        `/Barberteste/Template/${id}?paste=template`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("saiu do form", response);

      toast.success("Alteração com sucesso");
      console.log("Resposta da rota do WhatsApp:", response.data);

      onRequestClose();
    } catch (error) {
      toast.error("Falha ao atualizar a lista");
      console.error("Erro ao enviar mensagem para o WhatsApp:", error);
    }
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 flex  items-center justify-center p-5 bg-[#00000076]"
      style={{ zIndex: 99999 }}
    >
      {/* inicio modal */}
      {/* <div
        className="h-[80%] overflow-y-auto"
        style={{ backgroundColor: "rgb(0 0 0 / 99%)" }}
      >
        <div className="h-20 bg-black-2">
          <button
            className="bg-meta-3sv text-white p-2 cursor-pointer hover:bg-blue-700 mb-2 rounded-full"
            onClick={onRequestClose}
          >
            Fechar
          </button>
        </div>
        <div
          className="w-[550px] h-auto bg-white p-5"
          style={{
            backgroundSize: 300,
            backgroundColor: "rgba(255,255,255,0.12)",
          }}
        >
          <div className="text-gray-600 mb-5 text-white">
            <div className="text-gray-600 mb-5 h-auto p-4 text-sm text-white bg-bgmessage">
              <p>
                ID: {id} {companyId}
              </p>
              <p className="text-white">
                Nome:<span className="text-meta-3sv font-bold"> {name}</span>
              </p>
              <p className="text-white">
                Contato:<span className="text-success font-bold"> {phone}</span>
              </p>
              <p className="text-white">
                Mensagem Personalizada:
                <span className="text-meta-3sv">
                  {" "}
                  {text.substring(0, 150)}..
                </span>
              </p>
              <div className="flex justify-start items-start font-bold">
                Total Mensagem enviadas:
                <span className="pl-2 text-meta-3sv font-bold">
                  {" "}
                  {interaction}
                </span>
              </div>
              <div className="flex justify-start items-start font-bold">
                Total Mensagem enviadas:
                <span className="pl-2 text-meta-3sv font-bold">
                  {" "}
                  {active == true ? "true" : "desativado"}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
             
               <div className="left-1 z-10 w-20">
              <label
                htmlFor="imageInput"
                className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary py-1 px-2 text-sm font-medium text-white hover:bg-opacity-80 xsm:px-4"
              >
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mb-5 sr-only"
                  required
                />
                <span>
                <svg
                  className="fill-current"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.99992 5.83329C6.03342 5.83329 5.24992 6.61679 5.24992 7.58329C5.24992 8.54979 6.03342 9.33329 6.99992 9.33329C7.96642 9.33329 8.74992 8.54979 8.74992 7.58329C8.74992 6.61679 7.96642 5.83329 6.99992 5.83329ZM4.08325 7.58329C4.08325 5.97246 5.38909 4.66663 6.99992 4.66663C8.61075 4.66663 9.91659 5.97246 9.91659 7.58329C9.91659 9.19412 8.61075 10.5 6.99992 10.5C5.38909 10.5 4.08325 9.19412 4.08325 7.58329Z"
                    fill="white"
                  />
                </svg>
              </span>
                <span>Edit</span>
              </label>
            </div>
              <div className=" mb-5 text-white">
                <Image
                  loading="lazy"
                  width="60"
                  height="60"
                  decoding="async"
                  data-nimg="1"
                  key={image}
                  src={`http://localhost:3333/files/template/${image}`}
                  alt={image}
                />
              </div>
            </div>

           
            <div className=" mb-5 text-white">
              <label htmlFor="typeInput">name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {}}
                className="w-full h-auto py-2 mb-5 bg-white text-black-2"
              />
            </div>
            <div className=" mb-5 text-white">
              <label htmlFor="typeInput">Tipo:</label>
              <input
                type="text"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full h-auto py-2 mb-5 bg-white text-black-2"
              />
            </div>

            <div className=" mb-5 text-white">
              {" "}
              <label htmlFor="phoneInput">Telefone:</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => {}}
                className="w-full h-auto py-2 mb-5 bg-white text-black-2"
              />
            </div>

            <div className=" mb-5 text-white">
              {" "}
              <label htmlFor="interactionInput">Interacao:</label>
              <input
                type="number"
                value={interaction}
                onChange={(e) => {}}
                className="w-full h-auto py-2 mb-5 bg-white text-black-2"
              />
            </div>

            <div className=" mb-5 text-white">
              {" "}
              <label htmlFor="activeInput">Ativo:</label>
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="mb-5"
              />
            </div>

            <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
              <input
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                id="bordered-checkbox-2"
                type="checkbox"
                value=""
                name="bordered-checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="bordered-checkbox-2"
                className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {isActive == true ? "ativo" : "bloqueado"}
              </label>
            </div>

            <div className=" mb-5 text-white">
              <label htmlFor="textInput">Texto:</label>
              <textarea
                id="description"
                rows={4}
                className="block p-2.5 w-full text-sm text-danger bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black-2 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={selectedText}
                onChange={(e) => setSelectedText(e.target.value)}
              />
            </div>
          </div>

          <button
            className="bg-meta-3sv text-white p-2 cursor-pointer hover:bg-blue-700 mb-2 rounded-full"
            onClick={onRequestClose}
          >
            Fechar
          </button>

          <button
            className="bg-success text-white p-2 cursor-pointer hover:bg-green-700 rounded-full"
            onClick={sendMessageTemplate}
          >
            <AiFillFolderOpen /> Alterar template
          </button>
        </div>
      </div> */}

      {/* grid form  modal */}
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1  w-full xl:w-1/2 h-[90%] overflow-auto">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-aibitMenu">
            <div className=" flex justify-between items-center  border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Formulario template
              </h3>

              <button
                className="bg-meta-3sv text-white p-2 cursor-pointer hover:bg-blue-700 mb-2 rounded-sm"
                onClick={onRequestClose}
              >
                Fechar
              </button>
            </div>


            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Alterar modelo
                  </label>
                  <label
                    htmlFor="imageInput"
                    className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary py-1 px-2 text-sm font-medium text-white hover:bg-opacity-80 xsm:px-4"
                  >
                    <input
                      type="file"
                      id="imageInput"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="mb-5 sr-only"
                      required
                    />
                    <span>
                      <svg
                        className="fill-current"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6.99992 5.83329C6.03342 5.83329 5.24992 6.61679 5.24992 7.58329C5.24992 8.54979 6.03342 9.33329 6.99992 9.33329C7.96642 9.33329 8.74992 8.54979 8.74992 7.58329C8.74992 6.61679 7.96642 5.83329 6.99992 5.83329ZM4.08325 7.58329C4.08325 5.97246 5.38909 4.66663 6.99992 4.66663C8.61075 4.66663 9.91659 5.97246 9.91659 7.58329C9.91659 9.19412 8.61075 10.5 6.99992 10.5C5.38909 10.5 4.08325 9.19412 4.08325 7.58329Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                    <span>Edit</span>
                  </label>
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    preview
                  </label>
                  {/* {image &&(
                      <Image
                      loading="lazy"
                      width={140}
                      height={140}
                      decoding="async"
                      data-nimg={1}
                      key={image}
                      src={`http://localhost:3333/files/template/${image}`}
                      alt={image}
                    />
                    )} */}

                </div>
              </div>
              {/* image */}
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nome template
                  </label>
                  <input
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    type="text"
                    placeholder="Enter your first name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />

                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Last name
                  </label>
                  <div className="w-full gap-4 flex flex-row justify-start rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                    <input
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      id="bordered-checkbox-2"
                      type="checkbox"
                      value=""
                      name="bordered-checkbox"
                      className="w-5  text-blue-600 bg-gray-100 border-gray-300 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <label
                      htmlFor="bordered-checkbox-2"
                      className=" block text-black dark:text-white"
                    >
                      {isActive == true ? "ativo" : "bloqueado"}
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Chip Telefone <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={inputPhone}
                    onChange={(e) => setInputPhone(e.target.value)}
                    placeholder="chip de disparos"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="w-full xl:w-1/4">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Interações
                  </label>
                  <input
                    value={inputInteraction}
                    onChange={(e) => setInputInteraction(e.target.value)}
                    type="text"
                    placeholder="Interação"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Subject
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                    >
                      <option value="">{selectedType}</option>
                      <option value="inicial">Inicial</option>
                      <option value="segundachamada">Segunda Chamada</option>
                    </select>
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>






              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Message
                </label>

                <textarea
                  id="description"
                  rows={6}
                  placeholder="Type your message"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  value={selectedText}
                  onChange={(e) => setSelectedText(e.target.value)}
                />
              </div>

              <button
                onClick={sendMessageTemplate}
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                Send Message
              </button>
            </div>

          </div>
        </div>
      </div>
      {/* grid form  modal final*/}

      {/* final modal */}
    </div>
  );
};

export default CustomModalTemplate;
