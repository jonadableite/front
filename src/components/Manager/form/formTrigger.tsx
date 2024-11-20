"use client";
import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GetInstancesAction } from "@/actions/instance/get-instance.action";
import { formatarTelefone } from "@/util/formatPhone";
import Link from "next/link";
import axios from "axios";
import type { Instancia } from "@/types/instancia/instancia";
import { saveCreateLead } from "@/actions/leads/post-create-lead-message-manual.action";
import { getCompaniesAction } from "@/actions/companies/get-companies.action";
import { Empresa } from "@/types/empresa";
import { MdAddAPhoto } from "react-icons/md";
import { BsFiletypeMp4 } from "react-icons/bs";
import { FaFileExport, FaPhotoVideo, FaWhatsapp } from "react-icons/fa";
import image from "next/image";
import Image from "next/image";
import { UserType } from "@/types";
import { IUser } from "@/interfaces";
import { FaFileExcel } from "react-icons/fa6";

interface CompaniesAllProp {
  userData: IUser | null
}

export default function FormTriggerInstance({
  userData
}: CompaniesAllProp) {
  const [companies, setCompanies] = useState<Empresa[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string>("");
  const [instances, setInstances] = useState<Instancia[]>([]);
  const [selectedInstance, setSelectedInstance] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState("image");
  const [videoUrl, setVideoUrl] = useState("");
  const [delay, setDelay] = useState(1);
  const [totalNumbers, setTotalNumbers] = useState(0);
  const [numbersProcessed, setNumbersProcessed] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [base64Image, setBase64Image] = useState<string>("");
  const [base64Audio, setBase64Audio] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [selectedConfigId, setSelectedConfigId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [listbottom, setListbottom] = useState<number>(0);

  useEffect(() => {
    fetchInstances();
  }, []);
  //"https://evo.whatlead.com.br/instance/fetchInstances",

  const fetchInstances = async () => {
    setLoading(true);
    try {
      const response = await GetInstancesAction();
      if (response) {
        setInstances(response);
        //console.log("Instâncias encontradas:", response);
      } else {
        console.error("A resposta da API está vazia ou indefinida.");
      }
      const companiesList = await getCompaniesAction();
      if (companiesList) {
        setCompanies(companiesList);

      } else {
        console.error("A resposta da API está vazia ou indefinida.");
      }
    } catch (error) {
      console.error("Erro ao buscar instâncias:", error);
    } finally {
      setLoading(false); // Finaliza o estado de carregamento
    }
  };
  //console.log(companies, "tem dados");
  const getStatusBadgeColor = (status: string | undefined) => {
    switch (status || "") {
      case "open":
        return "bg-[#219653] text-white";
      case "connecting":
        return "bg-[#FFA70B] text-white";
      case "close":
        return "bg-[#D34053] text-white";
      default:
        return "bg-[#ffcd1e] text-white";
    }
  };

  const getStatusText = (status: string | undefined) => {
    switch (status || "") {
      case "open":
        return "Conectada";
      case "connecting":
        return "Aguardando Conectar";
      case "close":
        return "Desconectada";
      default:
        return "";
    }
  };

  const handleFileTxtChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      console.log(file, "dados");
    }
  };
  console.log(file, "dados", delay, 'delay');

  // Função para manipular upload de áudio
  const handleFileAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Verifica se o resultado não é undefined antes de definir o estado
        if (reader.result) {
          setBase64Audio(reader.result.toString().split(',')[1]);
        }
        console.log(base64Audio, "dados");
      };
      reader.readAsDataURL(file);
    }
  };


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const lines = content.split('\n').filter((line) => line.trim() !== '');
        setTotalNumbers(lines.length);
      };

      reader.readAsText(selectedFile);
    }
  };

  const handleFileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        console.log("Base64 String:", base64String); // Adicione esta linha
        const base64Media = base64String.replace(
          /^data:(image\/[a-zA-Z]+|video\/[a-zA-Z0-9]+);base64,/,
          ""
        );
        console.log("Base64 Media:", base64Media); // Adicione esta linha
        setBase64Image(base64Media);
      };
      reader.readAsDataURL(file);
      //setFile(file);
    }
  };

  //selected buttom liberation
  const handleIsPrimaryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setListbottom(Number(e.target.value)); // Converte para número
  };

  const determineGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return 'Bom dia';
    } else if (hour < 18) {
      return 'Boa tarde';
    } else {
      return 'Boa noite';
    }
  }

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (
      !selectedInstance ||
      !selectedConfigId ||
      !message ||
      !file
      //||
      //(!base64Image && !videoUrl)
      //(!imageUrl && !videoUrl)

    ) {
      toast.error(
        "Por favor, preencha todos os campos e selecione um arquivo."
      );
      alert("Por favor, preencha todos os campos e selecione um arquivo.");
      return;
    }

    const urlApi = "https://evo.whatlead.com.br"; // URL da API
    const apiKey = "429683C4C977415CAAFCCE10F7D57E11"; // Chave da API
    const buttonList = `https://evo.whatlead.com.br/message/sendList/${selectedInstance}`;
    try {
      const formData = new FormData();
      formData.append("file", file);

      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target?.result as string;
        const lines = content.split("\n").filter((line) => line.trim() !== "");

        setTotalNumbers(lines.length);
        setNumbersProcessed(0);
        setIsModalOpen(true);

        for (let line of lines) {
          const parts = line.split(","); // Supondo que as colunas são separadas por vírgula
          let name = ""; // Inicializa o nome como vazio por padrão
          let phoneNumber = "";

          if (parts.length > 1) {
            // Extrai o primeiro nome, considerando que o nome completo seja a primeira parte antes da vírgula
            name = parts[1].trim().split(" ")[0]; // Pega apenas o primeiro nome
            phoneNumber = parts[0].trim(); // primeira parte é o telefone
          } else {
            phoneNumber = parts[0].trim(); // Caso não haja nome, o telefone é a única parte
          }

          if (phoneNumber) {
            const greeting = determineGreeting();
            const mediaLink = mediaType === "image" ? imageUrl : videoUrl;

            const data = {
              number: `55${phoneNumber}`,
              mediatype: mediaType,
              media: base64Image,

            };

            const headers = {
              "Content-Type": "application/json",
              apikey: apiKey,
            };


            try {
              if (base64Image) {
                console.log('Enviando imagem para:', phoneNumber);
                await axios.post(
                  `${urlApi}/message/sendMedia/${selectedInstance}`,
                  data,
                  { headers }
                );
              }

              if (base64Audio) {


                try {
                  console.log('Enviando audio para:', phoneNumber);
                  await axios.post(
                    `${urlApi}/message/sendWhatsAppAudio/${selectedInstance}`,
                    {
                      number: `55${phoneNumber}`,
                      audio: base64Audio

                    },
                    { headers },

                  );
                } catch (error) {
                  console.error('Erro ao enviar texto:');
                }
              }


              console.log(`Mensagem enviada para ${phoneNumber}`);
              if (message) {


                try {
                  console.log('Enviando texto para:', phoneNumber);
                  await axios.post(
                    `${urlApi}/message/sendText/${selectedInstance}`,
                    {
                      number: `55${phoneNumber}`,
                      text: `Olá ${greeting} ${name ? name : ""} ${message}`,
                      options: {
                        delay: 0,
                        linkPreview: false,
                      },
                    },
                    { headers },

                  );
                } catch (error) {
                  console.error('Erro ao enviar texto:');
                }
              }

              const newMessage = {
                who: "vera",
                message: {
                  messaging_product: "whatsapp",
                  to: `${phoneNumber}`,
                  type: mediaType,
                  ...(mediaType === "image"
                    ? { image: { link: imageUrl } }
                    : { video: { link: imageUrl } }),
                },
                result: {
                  messaging_product: "whatsapp",
                  contacts: [
                    {
                      input: `55${phoneNumber}`,
                      wa_id: `55${phoneNumber}`,
                    },
                  ],
                  messages: [
                    {
                      id: "wamid.HBgNNTUxMTk4Nzg2OTA5OBUCABEYEjdCM0IzNzVGQTdENjQ2NUY0NQA=",
                    },
                  ],
                },
                timestamp: Date.now(),
                statusFrom: "STARTED",
                statusTo: "REPLIED",
                isSent: true,
                isDelivered: true,
                isRead: false,
                intent: "inicio",
              };
              const newMessageText = {
                who: "vera",
                message: {
                  messaging_product: "whatsapp",
                  to: `${phoneNumber}`,
                  type: "text",
                  text: { body: message },
                },
                result: {
                  messaging_product: "whatsapp",
                  contacts: [
                    {
                      input: `55${phoneNumber}`,
                      wa_id: `55${phoneNumber}`,
                    },
                  ],
                  messages: [
                    {
                      id: "wamid.HBgNNTUxMTk4Nzg2OTA5OBUCABEYEjdCM0IzNzVGQTdENjQ2NUY0NQA=",
                    },
                  ],
                },
                timestamp: Date.now(),
                statusFrom: "STARTED",
                statusTo: "REPLIED",
                isSent: true,
                isDelivered: true,
                isRead: false,
                intent: "inicio",
              };
              // Salvar no banco de dados após o envio com sucesso
              const leadData: any = {
                name: name || "", // Define um valor padrão se o nome não estiver presente
                phone: phoneNumber,
                email: `${phoneNumber}@example.com`, // Altere conforme necessário
                config_id: selectedConfigId,
                dialog: [newMessage, newMessageText],
              };

              if (userData?.profile === "master", "manager", "admin") {
                await saveCreateLead(
                  leadData.name,
                  leadData.phone,
                  leadData.email,
                  leadData.config_id,
                  leadData.dialog
                );
              } else {
                console.log('Usuario não autorizado para salvamento de lead')
              }


              console.log("Mensagem enviada com sucesso!");
              setMessage("");
              setImageUrl("");
              setVideoUrl("");
              setFile(null);
              setBase64Image("");
              setNumbersProcessed((prev) => prev + 1);

              await new Promise((resolve) => setTimeout(resolve, delay * 1000)); // Aguarda 1 segundo entre mensagens
            } catch (error) {
              console.error(
                `Erro ao enviar mensagem para ${phoneNumber}:`,
                error
              );
            }
          }
        }
        setIsModalOpen(false);
        toast.success("Mensagens enviadas com sucesso!");
      };

      reader.readAsText(file); // Lê o conteúdo do arquivo como texto
    } catch (error) {
      console.error("Erro ao enviar mensagens:", error);
      toast.error("Erro ao enviar mensagens.");
    }
  };


  console.log(listbottom, 'bootom ative', selectedInstance, 'Instancias', companies);
  return (
    <div className="col-span-12 h-auto shadow-lg rounded-lg bg-gradient-to-r from-blue-900 via-indigo-950 to-purple-800 xl:col-span-12">
      <div className="overflow-y-auto mt-4 grid grid-cols-12 gap-4 md:mt-1 md:gap-6 2xl:gap-4 pl-2 pr-2">
        <div className="col-span-12 flex flex-col w-full overflow-y-auto max-h-auto p-6 shadow-md rounded-lg border border-transparent bg-opacity-70 backdrop-blur-lg dark:bg-darkBlue/80">
          <div className="w-full min-h-96">
            <div className="flex justify-between">
              <h3 className="text-xl font-bold mb-1 text-white dark:text-indigo-300">
                Comandos de envios
              </h3>
            </div>

            <div className="mb-4 flex flex-row gap-6 xl:flex-row bg-white dark:bg-darkBlue/30 rounded-lg shadow-md dark:shadow-lg p-6 min-w-[420px] max-md:w-96">
              <div className="w-full xl:w-full">
                <label className="block text-black dark:text-white">Selecione um WhatsApp</label>
                {loading ? (
                  <div className="flex justify-center items-center">
                    <div className="animate-spin inline-block w-8 h-8 border-4 border-rose-500 rounded-full"></div>
                  </div>
                ) : (
                  <select
                    value={selectedInstance}
                    onChange={(e) => setSelectedInstance(e.target.value)}
                    className="block w-full p-3 py-4 mb-2 text-sm text-gray-900 border border-primary rounded-lg bg-gray-50 focus:ring-rose-700 focus:border-rose-700 dark:bg-darkBlue dark:border-primary dark:text-white"
                  >
                    <option value="">Selecione a Instancia</option>
                    {companies.map((company) => (
                      <Fragment key={company.id}>
                        {company.acelera_parceiro_configs.map((config: any, idx: any) => (
                          <option key={idx} value={config.name} className="pl-4 dark:text-white text-neutral-700">
                            * {config?.campaign_number_business}
                          </option>
                        ))}
                      </Fragment>
                    ))}
                  </select>
                )}
              </div>

              <div className="w-full xl:w-full">
                <label className="block text-black dark:text-white">Selecione uma campanha</label>
                {loading ? (
                  <div className="flex justify-center items-center">
                    <div className="animate-spin inline-block w-8 h-8 border-4 border-rose-500 rounded-full"></div>
                  </div>
                ) : (
                  <select
                    value={selectedConfigId}
                    onChange={(e) => setSelectedConfigId(e.target.value)}
                    className="block w-full p-3 py-4 mb-2 text-sm text-gray-900 border border-primary rounded-lg bg-gray-50 focus:ring-rose-700 focus:border-rose-700 dark:bg-darkBlue dark:border-primary dark:text-white"
                  >
                    <option value="">Selecione a campanha...</option>
                    {companies.map((company, index) => (
                      <Fragment key={index}>
                        <option value="" disabled className="font-bold text-rose-700">
                          *{company.name}
                        </option>
                        {company.acelera_parceiro_configs.map((config: any, idx: any) => (
                          <option key={idx} value={config.id} className="pl-4 dark:text-white text-neutral-700">
                            {config.name}
                          </option>
                        ))}
                      </Fragment>
                    ))}
                  </select>
                )}
              </div>
            </div>

            <div className="flex flex-row gap-6 xl:flex-row bg-white dark:bg-darkBlue/30 rounded-lg shadow-md p-6 min-w-[420px] max-md:w-96">
              {/* Caixa de Mensagem */}
              <div className="flex flex-col w-full xl:w-1/2 gap-6 bg-white dark:bg-darkBlue rounded-lg shadow-md p-4">
                <div className="w-full xl:w-full">
                  <label className="block text-black dark:text-white">Mensagem</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={12}
                    className="text-gray-800 min-h-96 dark:text-white peer w-full rounded-md bg-transparent px-3 placeholder-gray-400 transition-all focus:ring-rose-700 focus:border-rose-700 dark:bg-indigo-200/30"
                    placeholder="Digite sua mensagem aqui..."
                  />
                </div>

                {/* Seção de Uploads */}
                {/* Adicionar campo de upload de áudio aqui */}
                <div className="w-full mt-6">
                  <label
                    htmlFor="audioInput"
                    className="block text-black dark:text-white font-semibold mb-2"
                  >
                    Upload de Áudio:
                  </label>
                  <div className="w-full flex flex-col">
                    <label
                      htmlFor="audioInput"
                      className="cursor-pointer py-4 px-6 flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-indigo-700/40 via-blue-500/80 to-purple-500/35 shadow-lg text-white hover:bg-opacity-90 transform transition duration-300 hover:scale-105"
                    >
                      <input
                        type="file"
                        id="audioInput"
                        accept="audio/*"
                        onChange={handleFileAudioChange}
                        className="hidden"
                      />
                      <BsFiletypeMp4 size={25} />
                      <span className="text-md">Upload Áudio</span>
                    </label>

                    {/* Pré-visualização do áudio carregado */}
                    <div className="mt-4">
                      {base64Audio ? (
                        <audio
                          controls
                          src={`data:audio/mp3;base64,${base64Audio}`}
                          className="w-full rounded-lg shadow-md"
                        />
                      ) : (
                        <p className="text-gray-500 dark:text-gray-300">
                          Nenhum áudio carregado ainda.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full xl:w-1/2 gap-6 bg-white dark:bg-darkBlue rounded-lg shadow-lg p-6">
                {/* Tipo de Mídia */}
                <label className="block text-lg font-semibold text-black dark:text-white mb-2">
                  Tipo de Mídia:
                </label>

                {/* Seletor de Mídia */}
                <select
                  className="block w-full p-4 mb-4 text-sm text-gray-900 border border-primary rounded-lg bg-gray-50 focus:ring-rose-700 focus:border-rose-700 dark:bg-darkBlue dark:border-primary dark:text-white transition duration-200 ease-in-out"
                  id="mediaType"
                  value={mediaType}
                  onChange={(e) => setMediaType(e.target.value)}
                >
                  <option value="image">Imagem</option>
                  <option value="video">Vídeo</option>
                </select>

                {/* Upload de Imagem */}
                {mediaType === "image" && (
                  <div className="w-full flex flex-col">
                    <label
                      htmlFor="imageInput"
                      className="cursor-pointer py-4 px-6 flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-indigo-700/40 via-blue-500/80 to-purple-500/35 shadow-lg text-white hover:bg-opacity-90 transform transition duration-300 hover:scale-105"
                    >
                      <input
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        onChange={handleFileImageChange}
                        className="hidden"
                      />
                      <BsFiletypeMp4 size={25} />
                      <span className="text-md">Upload Imagem</span>
                    </label>

                    {/* Preview da Imagem */}
                    <div className="mt-4">
                      {base64Image ? (
                        <img
                          src={`data:image/png;base64,${base64Image}`}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg shadow-md"
                        />
                      ) : (
                        <img
                          src="https://via.placeholder.com/150"
                          alt="Placeholder Preview"
                          className="w-full h-48 object-cover rounded-lg shadow-md"
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Upload de Vídeo */}
                {mediaType === "video" && (
                  <div className="w-full flex flex-col">
                    <label
                      htmlFor="videoInput"
                      className="cursor-pointer py-4 px-6 flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-indigo-600 to-rose-500 text-white hover:bg-opacity-90 transform transition duration-300 hover:scale-105"
                    >
                      <input
                        type="file"
                        id="videoInput"
                        accept="video/*"
                        onChange={handleFileImageChange}
                        className="hidden"
                      />
                      <BsFiletypeMp4 size={25} />
                      <span className="text-md">Upload Vídeo</span>
                    </label>

                    {/* Preview do Vídeo */}
                    <div className="mt-4">
                      {base64Image ? (
                        <div className="mb-4 dark:text-white text-neutral-700">
                          <span className="text-md">Pré-visualização Vídeo:</span>
                          <video
                            controls
                            src={`data:video/mp4;base64,${base64Image}`}
                            className="w-full h-48 rounded-lg shadow-md mt-2"
                          />
                        </div>
                      ) : (
                        <div className="mb-4 dark:text-white text-neutral-700">
                          <span className="text-md">Pré-visualização Vídeo:</span>
                          <img
                            src="https://via.placeholder.com/150"
                            alt="Placeholder Preview"
                            className="w-full h-48 object-cover rounded-lg shadow-md mt-2"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Campos de Delay, Lista de Números, Tratar Base */}
                <div className="mt-6">
                  <div className="flex flex-col gap-6 xl:flex-row">
                    {/* Campo Delay */}
                    <div className="w-full xl:w-full">
                      <label className="mb-2.5 block text-gray-900 dark:text-white">
                        Delay
                      </label>
                      <div className="w-full gap-4 flex flex-row justify-start">
                        <input
                          value={delay}
                          onChange={(e) => setDelay(Number(e.target.value))}
                          type="number"
                          name="delay"
                          placeholder="Número"
                          className="w-full rounded text-gray-900 dark:text-white border border-primary/40 dark:border-primary/40 bg-transparent py-3 px-5 font-medium outline-none transition focus:ring-azuluro/from-indigo-950/80 focus:border-azuluro/from-indigo-950/80 dark:bg-darkBlue dark:placeholder-gray-400 dark:focus:ring-azuluro/from-indigo-950/80 dark:focus:border-azuluro/from-indigo-950/80"
                        />
                      </div>
                    </div>

                    {/* Lista de Números */}
                    <div className="w-full xl:w-full">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Lista de números
                      </label>
                      <label
                        className="w-full drop-shadow-md hover:drop-shadow-xl py-4 flex flex-row cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-700/40 via-blue-500/80 to-purple-500/35 shadow-lg text-white hover:bg-opacity-90 transform transition duration-300 hover:scale-105"
                      >
                        <input
                          onChange={(e) => handleFileChange(e)}
                          type="file"
                          name="file"
                          accept="phone/*"
                          className="sr-only"
                        />
                        <FaWhatsapp size={25} />
                      </label>
                      {totalNumbers > 0 && (
                        <p className="mt-2 text-black dark:text-white">
                          Total de números: {totalNumbers}
                        </p>
                      )}
                    </div>

                    {/* Tratar Base */}
                    <div className="w-full xl:w-full">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Tratar Base (Exemplo)
                      </label>
                      <Link href="/doc/tratar_base.xlsx" target="_blank"
                        className="w-full drop-shadow-md hover:drop-shadow-xl py-4 flex flex-row cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-700/40 via-blue-500/80 to-purple-500/35 shadow-lg text-white hover:bg-opacity-90 transform transition duration-300 hover:scale-105"
                      >
                        <FaFileExport size={25} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4 dark:text-white text-neutral-700">
              <span>Total de números: {totalNumbers}</span>
              <span> | Números processados: {numbersProcessed}</span>
            </div>

            <div className="drop-shadow-lg hover:drop-shadow-2 flex justify-end">
              <button
                onClick={handleFormSubmit}
                className="bg-gradient-to-r from-indigo-700/40 via-blue-500/80 to-purple-500/35 shadow-lg hover:from-sky-500 hover:via-secondary hover:to-purple-500 text-white px-4 py-2 rounded-lg w-full"
              >
                Adicionar
              </button>
            </div>

            {/* Modal para exibir o progresso */}
            {isModalOpen && (
              <div
                style={{ zIndex: '9999999' }}
                className="  fixed h-auto  top-0 left-0 flex justify-center items-center bottom-0 right-0 bg-[#8b8b8bce] dark:bg-[rgba(255, 255, 255, 0.875)]">
                <div
                  style={{ zIndex: '9999999' }}
                  className="rounded-md z-50 relative w-96 h-56 flex flex-col dark:bg-gradient-to-bl from-roxouro1 to-darkBlue justify-center items-center"
                  onClick={(e) => e.stopPropagation()}
                >

                  <div className=" flex  flex-row justify-center items-center gap-6">

                    <Image
                      src="/assets/funilv.svg"
                      alt=""
                      width={40}
                      height={40}
                      className="animate-spin-2 duration-1800 "
                    />
                    <div className="flex flex-row justify-center items-center gap-2">
                      <h2 className="py-5 text-white">Enviando</h2>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-700"></span>
                      </span>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg- bg-red-800"></span>
                      </span>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-900"></span>
                      </span>
                    </div>
                  </div>

                  <span className="text-darkBlue dark:text-white gap-4">
                    {" "}
                    <strong className="text-white  text-3xl">
                      {numbersProcessed}
                    </strong>{" "}
                    <strong className="text-neutral-400 dark:text-white px-4 text-3xl">
                      /
                    </strong>{" "}
                    <strong className="text-vermelhoSangue text-3xl">
                      {totalNumbers}
                    </strong>
                  </span>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}