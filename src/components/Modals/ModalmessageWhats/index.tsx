"use client";

import React, { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import { AiFillFolderOpen } from "react-icons/ai";
import api from "@/services/api";
import toast from "react-hot-toast";
import { BsCheckAll } from "react-icons/bs";
import Image from "next/image";
interface CustomModalProps {
  id: string;
  phone: string;
  name: string;
  conteudo: Array<any>;
  customMessage: string;
  onRequestClose: () => void;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  selectedImage: File | null;
  setSelectedImage: Dispatch<SetStateAction<File | null>>;
}

const CustomModalWhatsmessage: React.FC<CustomModalProps> = ({
  id,
  phone,
  name,
  customMessage,
  onRequestClose,
  inputValue,
  setInputValue,
  selectedImage,
  setSelectedImage,
  conteudo,
}) => {
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedImage(file || null);
  };

  const sendMessageToWhatsapp = async () => {
    try {
      const toastId = toast.loading("Enviando mensagem...");
      if (!id || !phone || !name) {
        toast.error(
          "Parâmetros inválidos para enviar mensagem para o WhatsApp..."
        );
        console.error(
          "Parâmetros inválidos para enviar mensagem para o WhatsApp"
        );
        return;
      }

      const formData = new FormData();
      formData.append("id", id);
      formData.append("phone", phone);
      formData.append("name", name);
      formData.append("customMessage", inputValue || customMessage);

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await api.post("/whats/testel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.dismiss(toastId);
      console.log("Resposta da rota do WhatsApp:", response.data);

      onRequestClose();
    } catch (error) {
      toast.error("Falha ao atualizar a lista");
      console.error("Erro ao enviar mensagem para o WhatsApp:", error);
    }
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 flex  items-center justify-center p-5 bg-[#000]"
      style={{ zIndex: 99999 }}
    >

      <div className="h-[80%] overflow-y-auto"
        style={{
          backgroundColor: "rgb(0 0 0 / 99%)",
        }}
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
          className="w-[550px] h-auto bg-boxdark-2  p-5 bg-repeat bg-[url('/assets/WhatsappBg-whats.png')]"
          style={{
            //opacity:.2,
            backgroundSize: 300,
            backgroundColor: "rgba(255,255,255,0.12)",
          }}
        >


          <div className="text-gray-600 mb-5">
            <div className="text-gray-600 mb-5 h-auto p-4 text-sm bg-bgmessage ">
              <p>ID: {id}</p>
              <p className="text-white">
                Nome:<span className="text-meta-3sv font-bold"> {name}</span>
              </p>
              <p className="text-white">
                Contato:<span className="text-success font-bold"> {phone}</span>
              </p>
              <p className="text-white">
                Mensagem Personalizada:
                <span className="text-meta-3sv"> {customMessage}</span>
              </p>
              <div className="flex justify-start items-start font-bold">
                Total Mensagem enviadas:
                <span className="pl-2 text-meta-3sv font-bold"> {conteudo.length}</span>
              </div>
            </div>
            {conteudo.map((item, index) => (
              <>
                {item.text && (
                  <div
                    key={index}
                    className="text-gray-600 mb-5 h-auto p-2 bg-bgmessage "
                    style={{
                      // border-radius-[0px 15px 15px],
                      borderRadius: "0px 15px 15px",
                    }}
                  >
                    <p className="text-sm text-white py-2">IA: {item.text}</p>
                    <span className="flex justify-start items-center gap-2">mensagem visualizada  <BsCheckAll className="text-primary" /></span>
                  </div>
                )}
                {item.image && (
                  <div className=" w-auto text-gray-600 mb-5 h-auto p-2 bg-bgmessage border-radius-[0px 15px 15px]">

                    {/* <Image
                      key={item.image}
                      src={`http://localhost:3333/files/imagemwp/${item.image}`}
                      alt={item.image}
                      width={120}
                      height={120}
                     
                    /> */}
                    <span className="flex justify-start items-center gap-2">imagem visualizada  <BsCheckAll color="#3fabf8" /></span>
                  </div>

                )}
              </>
            ))}

            <label htmlFor="imageInput">Selecione uma imagem:</label>
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-5"
            />

            <textarea
              id="customMessageTextarea"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full h-20 mb-5 bg-black-2 text-white"
            />
          </div>

          <button
            className="bg-meta-3sv text-white p-2 cursor-pointer hover:bg-blue-700 mb-2 rounded-full"
            onClick={onRequestClose}
          >
            Fechar
          </button>

          <button
            className="bg-success text-white p-2 cursor-pointer hover:bg-green-700 rounded-full"
            onClick={sendMessageToWhatsapp}
          >
            <AiFillFolderOpen /> Enviar Mensagem no WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModalWhatsmessage;

// import { Fragment, useState } from "react";
// import { useRouter } from "next/router";
// import type { Empresa } from "@/types/empresa";
// import { FaBitcoin } from "react-icons/fa";
// import toast from "react-hot-toast";
// import api from "@/services/api";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { createInvestmentValidator } from "@/validators/create-investiment.valodator";
// import { useForm } from "react-hook-form";

// export default function ModalinvestUsers({
//   userData,
//   refreshInvestments,
// }: {
//   userData: Empresa;
//   refreshInvestments: any;
// }) {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [modalOpenInvest, setModalOpenInvest] = useState<boolean>(false);
//   const [modalOpenKey, setModalOpenKey] = useState<boolean>(false);
//   const { register, handleSubmit, formState, setValue } = useForm({
//     resolver: yupResolver(createInvestmentValidator),
//   });
//   const { errors } = formState;

//   const handleOpenModal = () => {
//     console.log(userData);
//     if (userData) {
//       setModalOpenInvest(true);
//     } else {
//       console.log('nada de odal')
//       // setModalOpenKey(true);
//     }
//   };

//   const handleCloseModal = async () => {
//     setModalOpenInvest(false);
//   };

//   const handleInvest = async (data: any) => {
//     const toastId = toast.loading("Processando...");
//     try {
//       setLoading(true);
//       await api.post(`/whats/testel`, data);
//       toast.dismiss(toastId);
//       toast.success("Mensagem enviado!");
//       refreshInvestments();
//     } catch (error) {
//       toast.dismiss(toastId);
//       toast.error("Falha o realizar mensagem");
//     } finally {
//       setLoading(false);
//       handleCloseModal();
//     }
//   };

//   const ModalComponentWhatsApp = () => {
//     return (
//       <Fragment>
//         <div className="block space-y-4 md:flex md:space-y-0 md:space-x-4 rtl:space-x-reverse w-full justify-center">
//           <div
//             id="progress-modal"
//             aria-hidden="true"
//             style={{ background: "rgb(0 0 0 / 88%)" }}
//             className="dark:bg-red-700 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
//           >
//             <div className="relative p-4 w-full max-w-md max-h-full bg-yellow-500">
//               <div className="relative bg-white rounded-lg shadow dark:bg-black">
//                 <button
//                   type="button"
//                   className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//                   onClick={() => {
//                     handleCloseModal();
//                   }}
//                 >
//                   <span className="sr-only text">Close modal</span>
//                 </button>

//                 <div className="p-4 md:p-5">
//                   <div className="flex justify-center mb-1 text-gray-500 dark:text-gray-400">
//                     <span className="text-base font-normal">
//                       ENVIAR MENSAGEM
//                     </span>
//                   </div>

//                 </div>
//                 <div className="p-4 md:p-5">
//                   <div className="flex justify-between mb-1 text-gray-500 dark:text-gray-400">
//                     <span className="text-base font-normal">
//                       {userData.name}
//                     </span>
//                     <span className="text-sm font-semibold text-gray-900 dark:text-white">
//                       {userData.phone}
//                     </span>
//                   </div>
//                   <form method="post" onSubmit={handleSubmit(handleInvest)}>
//                     <input
//                       type="hidden"
//                       {...register("id", { value: userData.id })}
//                     />
//                     <input
//                       type="hidden"
//                       {...register("name", { value: userData.name })}
//                     />
//                     <div className="relative z-0 w-full mb-5 group">
//                       <input
//                         type="file"
//                         id="floating_last_name"
//                         className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer
//                         }`}
//                         placeholder=" "
//                         disabled={loading}
//                         {...register("image")}
//                       />
//                       <label
//                         htmlFor="floating_last_name"
//                         className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
//                       >
//                        Selecione uma imagem
//                       </label>

//                     </div>

//                     <div className="flex items-center mt-6 space-x-2 rtl:space-x-reverse">
//                       <button
//                         type="submit"
//                         className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
//                       >
//                         {loading ? (
//                           <Fragment>
//                             <svg
//                               aria-hidden="true"
//                               role="status"
//                               className="inline mr-3 w-4 h-4 text-white animate-spin"
//                               viewBox="0 0 100 101"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
//                                 fill="#E5E7EB"
//                               ></path>
//                               <path
//                                 d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
//                                 fill="currentColor"
//                               ></path>
//                             </svg>
//                             Confirmando depósito...
//                           </Fragment>
//                         ) : (
//                           <Fragment>Confirmar depósito</Fragment>
//                         )}
//                       </button>

//                       <button
//                         onClick={() => {
//                           handleCloseModal();
//                         }}
//                         type="button"
//                         className="text-gray-500 bg-red-800 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-green-600 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Fragment>
//     );
//   };

//   // const ModalWarningKey = () => {
//   //   return (
//   //     <Fragment>
//   //       <div className="block space-y-4 md:flex md:space-y-0 md:space-x-4 rtl:space-x-reverse w-full justify-center">
//   //         <div
//   //           id="key-modal"
//   //           aria-hidden="true"
//   //           style={{ background: "rgb(0 0 0 / 88%)" }}
//   //           className="dark:bg-red-700 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
//   //         >
//   //           <div className="relative p-4 w-full max-w-md max-h-full">
//   //             <div className="relative bg-red:700 rounded-lg shadow dark:bg-red-700">
//   //               <button
//   //                 type="button"
//   //                 className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//   //                 onClick={() => setModalOpenKey(false)}
//   //               >
//   //                 <span className="sr-only">Close modal</span>
//   //               </button>
//   //               <div className="p-4 md:p-5">
//   //                 <div className="flex justify-between mb-1 text-gray-500 dark:text-gray-400">
//   //                   <span className="text-base font-normal">
//   //                     {userData.name}, para fazer depósito é necessário
//   //                     cadastrar a sua Carteira USDT {"(Bep20)"}
//   //                   </span>
//   //                   <button
//   //                     onClick={redirectToUpdate}
//   //                     className="text-sm font-semibold text-gray-900 dark:text-white"
//   //                   >
//   //                     Atualizar agora
//   //                   </button>
//   //                 </div>
//   //               </div>
//   //             </div>
//   //           </div>
//   //         </div>
//   //       </div>
//   //     </Fragment>
//   //   );
//   // };

//   return (
//     <Fragment>
//       {/* {modalOpenInvest && <ModalComponentWhatsApp />} */}
//       <ModalComponentWhatsApp/>
//       {/* {modalOpenKey && <ModalWarningKey />} */}
//       <div className="z-5 mb-1 text-base font-medium text-red-900 dark:text-red-900 group">
//         <button
//           className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 me-2 mb-2"
//           onClick={() => {
//             handleOpenModal();
//           }}
//         >
//           <FaBitcoin className="mr-2" /> Fazer Depósito
//         </button>

//         <span className="absolute rigth-11 scale-0 bg-black text-white rounded p-2 text-xs group-hover:scale-100">
//           Fazer Depósito
//         </span>
//       </div>
//     </Fragment>
//   );
// }
