// "use client";
// // Declaração para indicar que o código é executado no lado do cliente (client-side rendering).

// import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from "react";
// // Importação de hooks essenciais para lidar com o estado e eventos de formulário.

// import { toast } from "react-toastify";
// // Importa o 'toast' para exibir notificações ao usuário.

// import { GetInstancesAction } from "@/actions/instance/get-instance.action";
// // Ação para buscar as instâncias disponíveis da API.

// import { formatarTelefone } from "@/util/formatPhone";
// // Função utilitária para formatar números de telefone.

// import Link from "next/link";
// // Importa o componente Link do Next.js para navegação entre páginas.

// import axios from "axios";
// // Axios para realizar chamadas HTTP.

// import type { Instancia } from "@/types/instancia/instancia";
// // Tipo que define a estrutura de uma instância.

// import { saveCreateLead } from "@/actions/leads/post-create-lead-message-manual.action";
// // Ação para salvar um novo lead manualmente via API.

// import { getCompaniesAction } from "@/actions/companies/get-companies.action";
// // Ação para buscar as empresas cadastradas na API.

// import { Empresa } from "@/types/empresa";
// // Tipo que define a estrutura de uma empresa.

// import { MdAddAPhoto } from "react-icons/md";
// // Ícone para adicionar fotos, importado da biblioteca react-icons.

// import { BsFiletypeMp4 } from "react-icons/bs";
// // Ícone que representa arquivos de vídeo (.mp4).

// import { FaFileExport, FaPhotoVideo, FaWhatsapp } from "react-icons/fa";
// // Ícones adicionais relacionados a exportação de arquivos, fotos, vídeos e WhatsApp.

// import image from "next/image";
// import Image from "next/image";
// // Componente otimizado do Next.js para carregar e renderizar imagens.

// import { UserType } from "@/types";
// // Tipo de dados que define o usuário.

// import { IUser } from "@/interfaces";
// // Interface que descreve a estrutura do usuário.

// import { FaFileExcel } from "react-icons/fa6";
// // Ícone para representar arquivos do Excel.

// interface CompaniesAllProp {
//   userData: IUser | null;
// }
// // Definição da interface que descreve as propriedades recebidas pelo componente, incluindo os dados do usuário.

// export default function FormTriggerInstance({ userData }: CompaniesAllProp) {
//   // Componente principal que recebe a propriedade userData.

//   const [companies, setCompanies] = useState<Empresa[]>([]);
//   // Estado para armazenar as empresas obtidas da API.

//   const [selectedCompanies, setSelectedCompanies] = useState<string>("");
//   // Estado para armazenar a empresa selecionada.

//   const [instances, setInstances] = useState<Instancia[]>([]);
//   // Estado para armazenar as instâncias obtidas da API.

//   const [selectedInstance, setSelectedInstance] = useState<string>("");
//   // Estado para armazenar a instância selecionada pelo usuário.

//   const [message, setMessage] = useState<string>("");
//   // Estado para armazenar a mensagem que será enviada.

//   const [imageUrl, setImageUrl] = useState<string>("");
//   // Estado para armazenar a URL da imagem que será enviada.

//   const [file, setFile] = useState<File | null>(null);
//   // Estado para armazenar o arquivo que será enviado, se houver.

//   const [mediaType, setMediaType] = useState("image");
//   // Estado que define o tipo de mídia sendo enviado (imagem, vídeo, etc.).

//   const [videoUrl, setVideoUrl] = useState("");
//   // Estado para armazenar a URL do vídeo a ser enviado.

//   const [delay, setDelay] = useState(1);
//   // Estado para definir o delay (atraso) entre envios.

//   const [totalNumbers, setTotalNumbers] = useState(0);
//   // Estado para armazenar o total de números que serão processados.

//   const [numbersProcessed, setNumbersProcessed] = useState(0);
//   // Estado para acompanhar a quantidade de números já processados.

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   // Estado para controlar a abertura/fechamento de um modal.

//   const [base64Image, setBase64Image] = useState<string>("");
//   // Estado para armazenar a imagem convertida em base64.

//   const [base64Audio, setBase64Audio] = useState<string | null>(null);
//   // Estado para armazenar o áudio convertido em base64, se houver.

//   const [selectedCompany, setSelectedCompany] = useState<string>("");
//   // Estado para armazenar a empresa selecionada.

//   const [selectedConfigId, setSelectedConfigId] = useState<string>("");
//   // Estado para armazenar o ID da configuração selecionada.

//   const [loading, setLoading] = useState<boolean>(true);
//   // Estado que indica se a aplicação está em modo de carregamento (loading).

//   const [listbottom, setListbottom] = useState<number>(0);
//   // Estado para controlar a posição inferior da lista, usado para carregar mais dados ao rolar.

//   useEffect(() => {
//     // Hook useEffect que chama a função para buscar as instâncias e empresas quando o componente é montado.
//     fetchInstances();
//   }, []);

//   const fetchInstances = async () => {
//     // Função assíncrona que busca as instâncias e empresas da API.

//     setLoading(true);
//     // Ativa o estado de carregamento.

//     try {
//       const response = await GetInstancesAction();
//       // Faz a requisição para buscar instâncias.

//       if (response) {
//         setInstances(response);
//         // Se a resposta for válida, atualiza o estado de instâncias.

//         //console.log("Instâncias encontradas:", response);
//         // Log opcional para verificar as instâncias recebidas.
//       } else {
//         console.error("A resposta da API está vazia ou indefinida.");
//         // Exibe um erro caso a resposta da API esteja vazia.
//       }

//       const companiesList = await getCompaniesAction();
//       // Faz a requisição para buscar as empresas.

//       if (companiesList) {
//         setCompanies(companiesList);
//         // Se a resposta for válida, atualiza o estado de empresas.
//       } else {
//         console.error("A resposta da API está vazia ou indefinida.");
//         // Exibe um erro caso a resposta da API esteja vazia.
//       }
//     } catch (error) {
//       console.error("Erro ao buscar instâncias:", error);
//       // Trata erros de requisição e exibe no console.
//     } finally {
//       setLoading(false);
//       // Finaliza o estado de carregamento após a conclusão das requisições.
//     }
//   };

//   //console.log(companies, "tem dados");
//   // Log opcional para verificar os dados de empresas.
// }
// // Função para definir a cor do badge (emblema) com base no status da instância
// // "open" - Verde (conectada), "connecting" - Laranja (aguardando conectar), "close" - Vermelho (desconectada)
// // Se o status for diferente dos esperados, retorna uma cor padrão (amarelo)
// const getStatusBadgeColor = (status: string | undefined) => {
//   switch (status || "") {
//     case "open":
//       return "bg-[#219653] text-white"; // Verde para conectado
//     case "connecting":
//       return "bg-[#FFA70B] text-white"; // Laranja para aguardando conexão
//     case "close":
//       return "bg-[#D34053] text-white"; // Vermelho para desconectado
//     default:
//       return "bg-[#ffcd1e] text-white"; // Amarelo como fallback
//   }
// };

// // Função para definir o texto exibido no badge com base no status da instância
// // "open" - Conectada, "connecting" - Aguardando Conectar, "close" - Desconectada
// const getStatusText = (status: string | undefined) => {
//   switch (status || "") {
//     case "open":
//       return "Conectada"; // Texto para instância conectada
//     case "connecting":
//       return "Aguardando Conectar"; // Texto para instância tentando conectar
//     case "close":
//       return "Desconectada"; // Texto para instância desconectada
//     default:
//       return ""; // Retorna vazio se o status for desconhecido
//   }
// };

// // Função para manipular o upload de arquivos de texto (.txt)
// const handleFileTxtChange = (event: ChangeEvent<HTMLInputElement>) => {
//   if (event.target.files && event.target.files.length > 0) {
//     setFile(event.target.files[0]); // Define o arquivo selecionado no estado
//     console.log(file, "dados"); // Exibe o arquivo no console para verificação
//   }
// };
// console.log(file, "dados", delay, 'delay'); // Loga o arquivo e o delay para depuração

// // Função para manipular o upload de arquivos de áudio e convertê-los para Base64
// const handleFileAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const file = e.target.files ? e.target.files[0] : null;
//   if (file) {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       // Verifica se há um resultado válido e converte o áudio para Base64
//       if (reader.result) {
//         setBase64Audio(reader.result.toString().split(',')[1]); // Remove a parte inicial da string Base64
//       }
//     };
//     reader.readAsDataURL(file); // Lê o arquivo de áudio e converte para Data URL
//   }
// };

// // Função para manipular o upload de arquivos de texto, contar linhas e definir o número total de números processados
// const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//   if (event.target.files && event.target.files.length > 0) {
//     const selectedFile = event.target.files[0]; // Obtém o arquivo selecionado
//     setFile(selectedFile); // Define o arquivo no estado

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const content = e.target?.result as string;
//       // Divide o conteúdo do arquivo em linhas e remove linhas em branco
//       const lines = content.split('\n').filter((line) => line.trim() !== '');
//       setTotalNumbers(lines.length); // Define o total de números processados com base nas linhas
//     };

//     reader.readAsText(selectedFile); // Lê o arquivo como texto
//   }
// };

// // Função para manipular o upload de arquivos de imagem e convertê-los para Base64
// const handleFileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
//   const file = event.target.files?.[0]; // Obtém o arquivo de imagem
//   if (file) {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const base64String = reader.result as string;
//       console.log("Base64 String:", base64String); // Exibe a string Base64 completa no console
//       // Remove a parte do cabeçalho da string Base64 (ex: "data:image/png;base64,")
//       const base64Media = base64String.replace(
//         /^data:(image\/[a-zA-Z]+|video\/[a-zA-Z0-9]+);base64,/,
//         ""
//       );
//       console.log("Base64 Media:", base64Media); // Exibe a string Base64 sem cabeçalho
//       setBase64Image(base64Media); // Define a imagem em Base64 no estado
//     };
//     reader.readAsDataURL(file); // Lê o arquivo de imagem e converte para Data URL
//   }
// };

// // Função para manipular a mudança no seletor de botões primários
// // Define o valor selecionado como um número no estado `listbottom`
// const handleIsPrimaryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//   setListbottom(Number(e.target.value)); // Converte o valor do seletor para número e define no estado
// };

// // Função que determina a saudação com base na hora atual
// // "Bom dia" para antes do meio-dia, "Boa tarde" até as 18h, e "Boa noite" após esse horário
// const determineGreeting = () => {
//   const hour = new Date().getHours(); // Obtém a hora atual
//   if (hour < 12) {
//     return 'Bom dia'; // Retorna "Bom dia" se for antes do meio-dia
//   } else if (hour < 18) {
//     return 'Boa tarde'; // Retorna "Boa tarde" se for entre meio-dia e 18h
//   } else {
//     return 'Boa noite'; // Retorna "Boa noite" se for após as 18h
//   }
// };

// // Função para manipular o envio do formulário
// const handleFormSubmit = async (event: FormEvent) => {
//   event.preventDefault(); // Previne o comportamento padrão de recarregar a página

//   // Verifica se os campos obrigatórios estão preenchidos
//   if (
//     !selectedInstance || // Verifica se a instância está selecionada
//     !selectedConfigId || // Verifica se o ID da configuração está selecionado
//     !message || // Verifica se há uma mensagem
//     !file // Verifica se um arquivo foi carregado
//     // As seguintes linhas foram comentadas, mas podem ser usadas para validar a presença de imagens ou vídeos
//     // (!base64Image && !videoUrl) // Verifica se há uma imagem ou vídeo em Base64
//     // (!imageUrl && !videoUrl) // Verifica se há uma URL de imagem ou vídeo
//   ) {
//     // Exibe uma mensagem de erro com o Toast (notificação) e um alerta
//     toast.error("Por favor, preencha todos os campos e selecione um arquivo.");
//     alert("Por favor, preencha todos os campos e selecione um arquivo.");
//     return; // Impede o envio do formulário se algum campo estiver faltando
//   }

//   console.log(message, 'sua mensagem'); // Exibe a mensagem no console para depuração

//   const urlApi = "https://evo.whatlead.com.br"; // URL da API para envio dos dados
//   const apiKey = "429683C4C977415CAAFCCE10F7D57E11"; // Chave de API (possivelmente sensível)
//   const buttonList = `https://evo.whatlead.com.br/message/sendList/${selectedInstance}`; // URL para envio da lista de mensagens

//   try {
//     const formData = new FormData();
//     formData.append("file", file); // Anexa o arquivo selecionado ao FormData para envio

//     // Leitor de arquivo para processar o conteúdo do arquivo carregado
//     const reader = new FileReader();
//     reader.onload = async (e) => {
//       const content = e.target?.result as string;
//       // Divide o conteúdo do arquivo em linhas, filtrando linhas vazias
//       const lines = content.split("\n").filter((line) => line.trim() !== "");

//       setTotalNumbers(lines.length); // Define o total de números (linhas) processados
//       setNumbersProcessed(0); // Reseta o número de processados para iniciar o processamento
//       setIsModalOpen(true); // Abre o modal de processamento (possivelmente de status ou progresso)


//       for (let line of lines) {
//         // Para cada linha no arquivo, separa as colunas por vírgula
//         const parts = line.split(","); // Supondo que as colunas no arquivo estão separadas por vírgula
//         let name = ""; // Inicializa a variável 'name' como vazio
//         let phoneNumber = ""; // Inicializa a variável 'phoneNumber' como vazio

//         if (parts.length > 1) {
//           // Se a linha tem mais de uma parte, extraímos o nome e o número de telefone
//           name = parts[1].trim().split(" ")[0]; // Extrai o primeiro nome da segunda parte da linha
//           phoneNumber = parts[0].trim(); // A primeira parte é o número de telefone
//         } else {
//           // Se só houver uma parte, ela é considerada como o número de telefone
//           phoneNumber = parts[0].trim();
//         }

//         if (phoneNumber) {
//           // Se há um número de telefone válido
//           const greeting = determineGreeting(); // Determina a saudação (bom dia, boa tarde, etc.)
//           const mediaLink = mediaType === "image" ? imageUrl : videoUrl; // Determina o tipo de mídia (imagem ou vídeo)

//           const data = {
//             number: `55${phoneNumber}`, // Formata o número de telefone para o formato brasileiro
//             mediatype: mediaType, // Tipo de mídia (imagem ou vídeo)
//             media: base64Image, // Mídia em formato Base64
//           };

//           const headers = {
//             "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
//             apikey: apiKey, // Inclui a chave da API no cabeçalho
//           };

//           try {
//             // Tenta enviar a mensagem de mídia para o número especificado
//             await axios.post(
//               `${urlApi}/message/sendMedia/${selectedInstance}`, // URL para envio de mídia
//               data,
//               { headers } // Cabeçalhos com a chave da API
//             );
//             console.log(`Mensagem enviada para ${phoneNumber}`); // Log para confirmar o envio

//             if (message) {
//               // Se há uma mensagem de texto além da mídia
//               try {
//                 console.log('Enviando texto para:', phoneNumber); // Log do envio de texto
//                 await axios.post(
//                   `${urlApi}/message/sendText/${selectedInstance}`, // URL para envio de texto
//                   {
//                     number: `55${phoneNumber}`, // Formata o número de telefone
//                     text: `Olá ${greeting} ${name ? name : ""} ${message}`, // Monta a mensagem de texto com saudação e nome
//                     options: {
//                       delay: 0,
//                       linkPreview: false, // Define as opções de envio
//                     },
//                   },
//                   { headers } // Inclui os cabeçalhos da API
//                 );
//               } catch (error) {
//                 console.error('Erro ao enviar texto:', error); // Log de erro se falhar
//               }
//             }

//             // Criação de objetos de mensagem (mídia e texto) para salvar no banco de dados
//             const newMessage = {
//               who: "vera",
//               message: {
//                 messaging_product: "whatsapp",
//                 to: `${phoneNumber}`,
//                 type: mediaType,
//                 ...(mediaType === "image" ? { image: { link: imageUrl } } : { video: { link: imageUrl } }),
//               },
//               result: {
//                 messaging_product: "whatsapp",
//                 contacts: [
//                   {
//                     input: `55${phoneNumber}`,
//                     wa_id: `55${phoneNumber}`,
//                   },
//                 ],
//                 messages: [
//                   {
//                     id: "wamid.HBgNNTUxMTk4Nzg2OTA5OBUCABEYEjdCM0IzNzVGQTdENjQ2NUY0NQA=", // ID da mensagem (pode ser gerado automaticamente)
//                   },
//                 ],
//               },
//               timestamp: Date.now(), // Marca o horário de envio
//               statusFrom: "STARTED", // Status de envio
//               statusTo: "REPLIED", // Status de resposta
//               isSent: true,
//               isDelivered: true,
//               isRead: false,
//               intent: "inicio", // Intenção da mensagem
//             };

//             const newMessageText = {
//               who: "vera",
//               message: {
//                 messaging_product: "whatsapp",
//                 to: `${phoneNumber}`,
//                 type: "text",
//                 text: { body: message }, // Conteúdo da mensagem de texto
//               },
//               result: {
//                 messaging_product: "whatsapp",
//                 contacts: [
//                   {
//                     input: `55${phoneNumber}`,
//                     wa_id: `55${phoneNumber}`,
//                   },
//                 ],
//                 messages: [
//                   {
//                     id: "wamid.HBgNNTUxMTk4Nzg2OTA5OBUCABEYEjdCM0IzNzVGQTdENjQ2NUY0NQA=", // ID da mensagem
//                   },
//                 ],
//               },
//               timestamp: Date.now(), // Horário de envio
//               statusFrom: "STARTED",
//               statusTo: "REPLIED",
//               isSent: true,
//               isDelivered: true,
//               isRead: false,
//               intent: "inicio",
//             };

//             // Salva no banco de dados se o envio for bem-sucedido
//             const leadData: any = {
//               name: name || "", // Nome do lead (ou vazio se não houver nome)
//               phone: phoneNumber, // Número de telefone
//               email: `${phoneNumber}@example.com`, // E-mail fictício baseado no número de telefone
//               config_id: selectedConfigId, // ID da configuração
//               dialog: [newMessage, newMessageText], // Registra o diálogo (mídia e texto)
//             };

//             // Verifica se o usuário tem permissão para salvar o lead
//             if (userData?.profile === "master" || userData?.profile === "manager" || userData?.profile === "admin") {
//               await saveCreateLead(
//                 leadData.name,
//                 leadData.phone,
//                 leadData.email,
//                 leadData.config_id,
//                 leadData.dialog
//               );
//             } else {
//               console.log('Usuário não autorizado para salvamento de lead'); // Log se o usuário não tiver permissão
//             }

//             console.log("Mensagem enviada com sucesso!"); // Log de sucesso
//             setMessage(""); // Limpa o campo de mensagem
//             setImageUrl(""); // Limpa o URL da imagem
//             setVideoUrl(""); // Limpa o URL do vídeo
//             setFile(null); // Reseta o arquivo selecionado
//             setBase64Image(""); // Limpa a imagem em Base64
//             setNumbersProcessed((prev) => prev + 1); // Incrementa o contador de números processados

//             await new Promise((resolve) => setTimeout(resolve, delay * 1000)); // Espera 1 segundo entre o envio de cada mensagem
//           } catch (error) {
//             console.error(`Erro ao enviar mensagem para ${phoneNumber}:`, error); // Log de erro se o envio falhar
//           }
//         }
//       }
//       setIsModalOpen(false); // Fecha o modal de envio
//       toast.success("Mensagens enviadas com sucesso!"); // Notificação de sucesso
//     };

//     // Lê o arquivo como texto
//     reader.readAsText(file);
//   } catch (error) {
//     console.error("Erro ao enviar mensagens:", error); // Log de erro se algo falhar no processo geral
//     toast.error("Erro ao enviar mensagens."); // Notificação de erro
//   }
// };


// console.log(listbottom, 'bootom ative', selectedInstance, 'Instancias', companies);
// // Exibe no console as variáveis relevantes: listbottom, selectedInstance e companies para fins de depuração.

// return (
//   <div className="col-span-12 h-auto shadow-lg rounded-lg bg-gradient-to-r from-blue-900 via-indigo-950 to-purple-800 xl:col-span-12">
//     {/* Componente principal que engloba todo o layout. Aqui, é aplicada uma borda arredondada, sombra, e gradiente de cor. */}

//     <div className="overflow-y-auto mt-4 grid grid-cols-12 gap-4 md:mt-1 md:gap-6 2xl:gap-4 pl-2 pr-2">
//       {/* Grid que organiza os componentes internamente com espaçamentos responsivos e rolagem vertical automática. */}

//       <div className="col-span-12 flex flex-col w-full overflow-y-auto max-h-auto p-6 shadow-md rounded-lg border border-transparent bg-opacity-70 backdrop-blur-lg dark:bg-darkBlue/80">
//         {/* Seção com rolagem vertical e design responsivo, usando bordas arredondadas e sombras. Além disso, há um efeito de desfoque de fundo. */}

//         <div className="w-full min-h-96">
//           <div className="flex justify-between">
//             <h3 className="text-xl font-bold mb-1 text-white dark:text-indigo-300">
//               Comandos de envios
//             </h3>
//             {/* Título da seção, estilizado com uma fonte grande e cor adaptada para modo claro e escuro. */}
//           </div>

//           <div className="mb-4 flex flex-row gap-6 xl:flex-row bg-white dark:bg-darkBlue/30 rounded-lg shadow-md dark:shadow-lg p-6 min-w-[420px] max-md:w-96">
//             {/* Caixa de seleção para o WhatsApp e a campanha, com cores e sombras adaptadas para diferentes temas (claro/escuro). */}

//             <div className="w-full xl:w-full">
//               <label className="block text-black dark:text-white">Selecione um WhatsApp</label>
//               {/* Label para o campo de seleção do WhatsApp */}

//               {loading ? (
//                 <div className="flex justify-center items-center">
//                   <div className="animate-spin inline-block w-8 h-8 border-4 border-rose-500 rounded-full"></div>
//                 </div>
//               ) : (
//                 <select
//                   value={selectedInstance}
//                   onChange={(e) => setSelectedInstance(e.target.value)}
//                   className="block w-full p-3 py-4 mb-2 text-sm text-gray-900 border border-primary rounded-lg bg-gray-50 focus:ring-rose-700 focus:border-rose-700 dark:bg-darkBlue dark:border-primary dark:text-white"
//                 >
//                   {/* Campo de seleção de instâncias do WhatsApp. O estado de carregamento é representado por um spinner, e o estado selecionado é controlado com setSelectedInstance. */}
//                   <option value="">Selecione a Instancia</option>
//                   {companies.map((company) => (
//                     <Fragment key={company.id}>
//                       {/* Itera sobre as empresas disponíveis e exibe suas instâncias de WhatsApp em um dropdown. */}

//                       {company.acelera_parceiro_configs.map((config: any, idx: any) => (
//                         <option key={idx} value={config.name} className="pl-4 dark:text-white text-neutral-700">
//                           * {config?.campaign_number_business}
//                         </option>
//                       ))}
//                     </Fragment>
//                   ))}
//                 </select>
//               )}
//             </div>

//             <div className="w-full xl:w-full">
//               <label className="block text-black dark:text-white">Selecione uma campanha</label>
//               {/* Label para o campo de seleção de campanhas */}

//               {loading ? (
//                 <div className="flex justify-center items-center">
//                   <div className="animate-spin inline-block w-8 h-8 border-4 border-rose-500 rounded-full"></div>
//                 </div>
//               ) : (
//                 <select
//                   value={selectedConfigId}
//                   onChange={(e) => setSelectedConfigId(e.target.value)}
//                   className="block w-full p-3 py-4 mb-2 text-sm text-gray-900 border border-primary rounded-lg bg-gray-50 focus:ring-rose-700 focus:border-rose-700 dark:bg-darkBlue dark:border-primary dark:text-white"
//                 >
//                   {/* Campo de seleção de campanhas, o estado selecionado é gerenciado por setSelectedConfigId. */}
//                   <option value="">Selecione a campanha...</option>
//                   {companies.map((company, index) => (
//                     <Fragment key={index}>
//                       {/* Itera sobre as empresas e exibe suas campanhas disponíveis em um dropdown. */}

//                       <option value="" disabled className="font-bold text-rose-700">
//                         *{company.name}
//                       </option>
//                       {company.acelera_parceiro_configs.map((config: any, idx: any) => (
//                         <option key={idx} value={config.id} className="pl-4 dark:text-white text-neutral-700">
//                           {config.name}
//                         </option>
//                       ))}
//                     </Fragment>
//                   ))}
//                 </select>
//               )}
//             </div>
//           </div>

//           <div className="flex flex-row gap-6 xl:flex-row bg-white dark:bg-darkBlue/30 rounded-lg shadow-md p-6 min-w-[420px] max-md:w-96">
//             {/* Container que agrupa a caixa de mensagem e seus controles, estilizado para diferentes tamanhos de tela e temas. */}

//             {/* Caixa de Mensagem */}
//             <div className="flex flex-col w-full xl:w-1/2 gap-6 bg-white dark:bg-darkBlue rounded-lg shadow-md p-4">
//               <div className="w-full xl:w-full">
//                 <label className="block text-black dark:text-white">Mensagem</label>
//                 {/* Label para o campo de texto onde a mensagem será digitada */}

//                 <textarea
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   rows={12}
//                   className="text-gray-800 min-h-96 dark:text-white peer w-full rounded-md bg-transparent px-3 placeholder-gray-400 transition-all focus:ring-rose-700 focus:border-rose-700 dark:bg-indigo-200/30"
//                   placeholder="Digite sua mensagem aqui..."
//                 />
//                 {/* Caixa de texto onde o usuário insere a mensagem a ser enviada, com responsividade e estilização para diferentes modos de cor. */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );


// {/* Seção de Uploads */ }
// {/* Adicionar campo de upload de áudio aqui */ }
// <div className="w-full mt-6">
//   <label
//     htmlFor="audioInput"
//     className="block text-black dark:text-white font-semibold mb-2"
//   >
//     Upload de Áudio:
//   </label>
//   <div className="w-full flex flex-col">
//     <label
//       htmlFor="audioInput"
//       className="cursor-pointer py-4 px-6 flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-indigo-700/40 via-blue-500/80 to-purple-500/35 shadow-lg text-white hover:bg-opacity-90 transform transition duration-300 hover:scale-105"
//     >
//       <input
//         type="file"
//         id="audioInput"
//         accept="audio/*"
//         onChange={handleFileAudioChange}
//         className="hidden"
//       />
//       <BsFiletypeMp4 size={25} />
//       <span className="text-md">Upload Áudio</span>
//     </label>

//     {/* Pré-visualização do áudio carregado */}
//     <div className="mt-4">
//       {base64Audio ? (
//         <audio
//           controls
//           src={`data:audio/mp3;base64,${base64Audio}`}
//           className="w-full rounded-lg shadow-md"
//         />
//       ) : (
//         <p className="text-gray-500 dark:text-gray-300">
//           Nenhum áudio carregado ainda.
//         </p>
//       )}
//     </div>
//   </div>
// </div>
//             </div >

//   <div className="flex flex-col w-full xl:w-1/2 gap-6 bg-white dark:bg-darkBlue rounded-lg shadow-lg p-6">
//     {/* Tipo de Mídia */}
//     <label className="block text-lg font-semibold text-black dark:text-white mb-2">
//       Tipo de Mídia:
//     </label>

//     {/* Seletor de Mídia */}
//     <select
//       className="block w-full p-4 mb-4 text-sm text-gray-900 border border-primary rounded-lg bg-gray-50 focus:ring-rose-700 focus:border-rose-700 dark:bg-darkBlue dark:border-primary dark:text-white transition duration-200 ease-in-out"
//       id="mediaType"
//       value={mediaType}
//       onChange={(e) => setMediaType(e.target.value)}
//     >
//       <option value="image">Imagem</option>
//       <option value="video">Vídeo</option>
//     </select>

//     {/* Upload de Imagem */}
//     {mediaType === "image" && (
//       <div className="w-full flex flex-col">
//         <label
//           htmlFor="imageInput"
//           className="cursor-pointer py-4 px-6 flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-indigo-700/40 via-blue-500/80 to-purple-500/35 shadow-lg text-white hover:bg-opacity-90 transform transition duration-300 hover:scale-105"
//         >
//           <input
//             type="file"
//             id="imageInput"
//             accept="image/*"
//             onChange={handleFileImageChange}
//             className="hidden"
//           />
//           <BsFiletypeMp4 size={25} />
//           <span className="text-md">Upload Imagem</span>
//         </label>

//         {/* Preview da Imagem */}
//         <div className="mt-4">
//           {base64Image ? (
//             <img
//               src={`data:image/png;base64,${base64Image}`}
//               alt="Preview"
//               className="w-full h-48 object-cover rounded-lg shadow-md"
//             />
//           ) : (
//             <img
//               src="https://via.placeholder.com/150"
//               alt="Placeholder Preview"
//               className="w-full h-48 object-cover rounded-lg shadow-md"
//             />
//           )}
//         </div>
//       </div>
//     )}

//     {/* Upload de Vídeo */}
//     {mediaType === "video" && (
//       <div className="w-full flex flex-col">
//         <label
//           htmlFor="videoInput"
//           className="cursor-pointer py-4 px-6 flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-indigo-600 to-rose-500 text-white hover:bg-opacity-90 transform transition duration-300 hover:scale-105"
//         >
//           <input
//             type="file"
//             id="videoInput"
//             accept="video/*"
//             onChange={handleFileImageChange}
//             className="hidden"
//           />
//           <BsFiletypeMp4 size={25} />
//           <span className="text-md">Upload Vídeo</span>
//         </label>

//         {/* Preview do Vídeo */}
//         <div className="mt-4">
//           {base64Image ? (
//             <div className="mb-4 dark:text-white text-neutral-700">
//               <span className="text-md">Pré-visualização Vídeo:</span>
//               <video
//                 controls
//                 src={`data:video/mp4;base64,${base64Image}`}
//                 className="w-full h-48 rounded-lg shadow-md mt-2"
//               />
//             </div>
//           ) : (
//             <div className="mb-4 dark:text-white text-neutral-700">
//               <span className="text-md">Pré-visualização Vídeo:</span>
//               <img
//                 src="https://via.placeholder.com/150"
//                 alt="Placeholder Preview"
//                 className="w-full h-48 object-cover rounded-lg shadow-md mt-2"
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     )}

//     {/* Campos de Delay, Lista de Números, Tratar Base */}
//     <div className="mt-6">
//       <div className="flex flex-col gap-6 xl:flex-row">
//         {/* Campo Delay */}
//         <div className="w-full xl:w-full">
//           <label className="mb-2.5 block text-gray-900 dark:text-white">
//             Delay
//           </label>
//           <div className="w-full gap-4 flex flex-row justify-start">
//             <input
//               value={delay}
//               onChange={(e) => setDelay(Number(e.target.value))}
//               type="number"
//               name="delay"
//               placeholder="Número"
//               className="w-full rounded text-gray-900 dark:text-white border border-primary/40 dark:border-primary/40 bg-transparent py-3 px-5 font-medium outline-none transition focus:ring-azuluro/from-indigo-950/80 focus:border-azuluro/from-indigo-950/80 dark:bg-darkBlue dark:placeholder-gray-400 dark:focus:ring-azuluro/from-indigo-950/80 dark:focus:border-azuluro/from-indigo-950/80"
//             />
//           </div>
//         </div>

//         {/* Lista de Números */}
//         <div className="w-full xl:w-full">
//           <label className="mb-2.5 block text-black dark:text-white">
//             Lista de números
//           </label>
//           <label
//             className="w-full drop-shadow-md hover:drop-shadow-xl py-4 flex flex-row cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-700/40 via-blue-500/80 to-purple-500/35 shadow-lg text-white hover:bg-opacity-90 transform transition duration-300 hover:scale-105"
//           >
//             <input
//               onChange={(e) => handleFileChange(e)}
//               type="file"
//               name="file"
//               accept="phone/*"
//               className="sr-only"
//             />
//             <FaWhatsapp size={25} />
//           </label>
//           {totalNumbers > 0 && (
//             <p className="mt-2 text-black dark:text-white">
//               Total de números: {totalNumbers}
//             </p>
//           )}
//         </div>

//         {/* Tratar Base */}
//         <div className="w-full xl:w-full">
//           <label className="mb-2.5 block text-black dark:text-white">
//             Tratar Base (Exemplo)
//           </label>
//           <Link href="/doc/tratar_base.xlsx" target="_blank"
//             className="w-full drop-shadow-md hover:drop-shadow-xl py-4 flex flex-row cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-700/40 via-blue-500/80 to-purple-500/35 shadow-lg text-white hover:bg-opacity-90 transform transition duration-300 hover:scale-105"
//           >
//             <FaFileExport size={25} />
//           </Link>
//         </div>
//       </div>
//     </div>
//   </div>
//           </div >

//           <div className="mb-4 dark:text-white text-neutral-700">
//             <span>Total de números: {totalNumbers}</span>
//             <span> | Números processados: {numbersProcessed}</span>
//           </div>

//           <div className="drop-shadow-lg hover:drop-shadow-2 flex justify-end">
//             <button
//               onClick={handleFormSubmit}
//               className="bg-gradient-to-r from-indigo-700/40 via-blue-500/80 to-purple-500/35 shadow-lg hover:from-sky-500 hover:via-secondary hover:to-purple-500 text-white px-4 py-2 rounded-lg w-full"
//             >
//               Adicionar
//             </button>
//           </div>

// {/* Modal para exibir o progresso */ }
// {
//   isModalOpen && (
//     <div
//       style={{ zIndex: '9999999' }}
//       className="  fixed h-auto  top-0 left-0 flex justify-center items-center bottom-0 right-0 bg-[#8b8b8bce] dark:bg-[rgba(255, 255, 255, 0.875)]">
//       <div
//         style={{ zIndex: '9999999' }}
//         className="rounded-md z-50 relative w-96 h-56 flex flex-col dark:bg-gradient-to-bl from-roxouro1 to-darkBlue justify-center items-center"
//         onClick={(e) => e.stopPropagation()}
//       >

//         <div className=" flex  flex-row justify-center items-center gap-6">

//           <Image
//             src="/assets/funilv.svg"
//             alt=""
//             width={40}
//             height={40}
//             className="animate-spin-2 duration-1800 "
//           />
//           <div className="flex flex-row justify-center items-center gap-2">
//             <h2 className="py-5 text-white">Enviando</h2>
//             <span className="relative flex h-2 w-2">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-2 w-2 bg-red-700"></span>
//             </span>
//             <span className="relative flex h-2 w-2">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-2 w-2 bg- bg-red-800"></span>
//             </span>
//             <span className="relative flex h-2 w-2">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-2 w-2 bg-red-900"></span>
//             </span>
//           </div>
//         </div>

//         <span className="text-darkBlue dark:text-white gap-4">
//           {" "}
//           <strong className="text-white  text-3xl">
//             {numbersProcessed}
//           </strong>{" "}
//           <strong className="text-neutral-400 dark:text-white px-4 text-3xl">
//             /
//           </strong>{" "}
//           <strong className="text-vermelhoSangue text-3xl">
//             {totalNumbers}
//           </strong>
//         </span>
//       </div>
//     </div>
//   )
// }

//         </div >
//       </div >
//     </div >
//   </div >
// );
// }