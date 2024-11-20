import React, { useState } from "react";
import toast from "react-hot-toast"; // Importa a biblioteca de notificações toast
import { EditComapanyTemplateOneUniti } from "@/actions/companies/companyUnit/patch-data-company-unit.action"; // Importa a função para editar o template da empresa
import { Empresa } from "@/types/empresa"; // Importa o tipo Empresa

// Definição das propriedades esperadas pelo componente de modal customizado
interface CustomModalProps {
  companyId: string; // ID da empresa
  companyData: Empresa; // Dados da empresa do tipo Empresa
  selectedTemplate: any; // Template selecionado
  onRequestClose: () => void; // Função para fechar o modal
  updateTemplateData: (updatedData: Empresa) => void; // Função para atualizar os dados do template
}

// Componente funcional CustomModalTemplateOne que recebe as props definidas acima
const CustomModalTemplateOne: React.FC<CustomModalProps> = ({
  companyId,
  companyData,
  selectedTemplate,
  onRequestClose,
  updateTemplateData,
}) => {
  // Estados para armazenar os dados do template selecionado
  const [selectedText, setSelectedText] = useState(
    selectedTemplate.content || ""
  );
  const [inputName, setInputName] = useState(
    selectedTemplate.name || ""
  );
  const [inputImage, setInputImage] = useState(
    selectedTemplate.image || ""
  );

  // Função assíncrona para enviar o template modificado para a API
  const sendMessageTemplate = async () => {
    try {
      const toastId = toast.loading("Enviando mensagem..."); // Exibe mensagem de carregamento
      await EditComapanyTemplateOneUniti( // Chama a função para editar o template da empresa
        companyId,
        inputName,
        inputImage,
        selectedText
      );
      toast.success("Alteração com sucesso"); // Exibe toast de sucesso após a alteração
  
      // Atualiza os dados no componente pai após a alteração
      const updatedTemplates = companyData.templatelistvars?.map((template) =>
        template.name === selectedTemplate.name
          ? { ...template, name: inputName, image: inputImage, content: selectedText }
          : template
      ) || [];
  
      const updatedData = {
        ...companyData,
        templatelistvars: updatedTemplates,
      };
      updateTemplateData(updatedData); // Chama a função para atualizar os dados do template no componente pai
  
      onRequestClose(); // Fecha o modal após a conclusão da alteração
    } catch (error) {
      toast.error("Falha ao atualizar a lista"); // Exibe toast de erro em caso de falha
      console.error("Erro ao enviar mensagem para o WhatsApp:", error); // Registra o erro no console
    }
  };

  // Renderização do componente CustomModalTemplateOne
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center p-5 bg-[#00000076]"
      style={{ zIndex: 99999 }}
    >
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 w-full xl:w-1/2 h-[90%] overflow-auto">
        <div className="flex flex-col gap-9 justify-center">
          <div className="rounded-sm p-8 dark:bg-neutral-800 bg-white shadow-default">
            <div className="flex justify-between items-center border-b border-neutral-600 py-4 px-6.5 dark:border-neutral-600">
              <h3 className="font-medium text-black dark:text-white">Formulario template</h3>
              <button
                className="bg-meta-3sv text-white p-2 cursor-pointer hover:bg-blue-700 mb-2 rounded-sm"
                onClick={onRequestClose} // Ação ao clicar para fechar o modal
              >
                Fechar
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">Nome template</label>
                  <input
                    value={inputName} // Valor do inputName do estado
                    onChange={(e) => setInputName(e.target.value)} // Ação ao alterar o valor do inputName
                    type="text"
                    placeholder="Enter your first name"
                    className="w-full rounded border border-neutral-600 bg-transparent py-3 px-5 text-base font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input focus:border-1 focus:outline-0"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-black dark:text-white">Url imagem</label>
                <input
                  value={inputImage} // Valor do inputImage do estado
                  onChange={(e) => setInputImage(e.target.value)} // Ação ao alterar o valor do inputImage
                  type="text"
                  placeholder="url da imagem"
                  className="w-full rounded border border-neutral-600 bg-transparent py-3 px-5 text-base font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input focus:border-1 focus:outline-0"
                />
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-black dark:text-white">Message</label>
                <textarea
                  id="content"
                  rows={6}
                  placeholder="Type your message"
                  className="w-full rounded border border-neutral-600 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  value={selectedText} // Valor do selectedText do estado
                  onChange={(e) => setSelectedText(e.target.value)} // Ação ao alterar o valor do selectedText
                />
              </div>
              <button 
                onClick={sendMessageTemplate} // Ação ao clicar para enviar o template modificado
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModalTemplateOne; // Exporta o componente CustomModalTemplateOne para uso em outros componentes



// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { EditComapanyTemplateOneUniti } from "@/actions/companies/companyUnit/patch-data-company-unit.action";
// import { Empresa } from "@/types/empresa";

// interface CustomModalProps {
//   companyId: string;
//   companyData: Empresa;
//   onRequestClose: () => void;
//   updateTemplateData: (updatedData: Empresa) => void;
// }

// const CustomModalTemplateOne: React.FC<CustomModalProps> = ({
//   companyId,
//   companyData,
//   onRequestClose,
//   updateTemplateData,
// }) => {
//   const [selectedText, setSelectedText] = useState(
//     companyData.templatelistvars?.content || ""
//   );
//   const [inputName, setInputName] = useState(
//     companyData.templatelistvars?.name || ""
//   );
//   const [inputImage, setInputImage] = useState(
//     companyData.templatelistvars?.image || ""
//   );

//   const sendMessageTemplate = async () => {
//     try {
//       const toastId = toast.loading("Enviando mensagem...");
//       const dataToSend = {
//         companyId: companyId,
//         name: inputName,
//         image: inputImage,
//         content: selectedText,
//       };
//       await EditComapanyTemplateOneUniti(
//         companyId,
//         inputName,
//         inputImage,
//         selectedText
//       );
//       toast.success("Alteração com sucesso");

//       // Atualiza os dados no componente pai após a alteração
//       const updatedData = {
//         ...companyData,
//         templatelistvars: {
//           name: inputName,
//           image: inputImage,
//           content: selectedText,
//         },
//       };
//       updateTemplateData(updatedData);

//       onRequestClose();
//     } catch (error) {
//       toast.error("Falha ao atualizar a lista");
//       console.error("Erro ao enviar mensagem para o WhatsApp:", error);
//     }
//   };


//   return (
//     <div
//       className="fixed top-0 left-0 right-0 bottom-0 flex  items-center justify-center p-5 bg-[#00000076]"
//       style={{ zIndex: 99999 }}
//     >
//       <div className="grid grid-cols-1 gap-9 sm:grid-cols-1  w-full xl:w-1/2 h-[90%] overflow-auto">
//         <div className="flex flex-col gap-9 justify-center">
//           <div className="rounded-sm p-8  dark:bg-neutral-800  bg-white shadow-default">
//             <div className="flex justify-between items-center  border-b border-neutral-600 py-4 px-6.5 dark:border-neutral-600">
//               <h3 className="font-medium text-black dark:text-white">Formulario template</h3>
//               <button
//                 className="bg-meta-3sv text-white p-2 cursor-pointer hover:bg-blue-700 mb-2 rounded-sm"
//                 onClick={onRequestClose}
//               >
//                 Fechar
//               </button>
//             </div>
//             <div className="p-6">

              
//               <div className="mb-4 flex flex-col gap-6 xl:flex-row">
//                 <div className="w-full xl:w-1/2">
//                   <label className="mb-2.5 block text-black dark:text-white">Nome template</label>
//                   <input
//                     value={inputName}
//                     onChange={(e) => setInputName(e.target.value)}
//                     type="text"
//                     placeholder="Enter your first name"
//                     className="w-full rounded border border-neutral-600 bg-transparent py-3 px-5 text-base font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  focus:border-1  focus:outline-0"
//                   />
//                 </div>
               
//               </div>
//               <div className="mb-6">
//               <label className="mb-2 block text-black dark:text-white">Url imagem</label>
//                   <input
//                     value={inputImage}
//                     onChange={(e) => setInputImage(e.target.value)}
//                     type="text"
//                     placeholder="url da imagem"
//                     className="w-full rounded border border-neutral-600 bg-transparent py-3 px-5 text-base font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  focus:border-1   focus:outline-0"
//                   />
//                 </div>
//               <div className="mb-6">
//                 <label className="mb-2 block text-black dark:text-white">Message</label>
//                 <textarea
//                   id="content"
//                   rows={6}
//                   placeholder="Type your message"
//                   className="w-full rounded border border-neutral-600 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
//                   value={selectedText}
//                   onChange={(e) => setSelectedText(e.target.value)}
//                 />
//               </div>
              
//               <button 
//                 onClick={sendMessageTemplate}
//                 className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
//               >
//                 Send Message
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomModalTemplateOne;
