"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import type { Instancia } from "@/types/instancia/instancia";
import { FaBitcoin, FaAngleDown } from "react-icons/fa";
import { FiMoreVertical, FiPlus } from "react-icons/fi";
import { BsQrCodeScan } from "react-icons/bs";
import { MdEdit, MdNoCell, MdCellWifi } from "react-icons/md";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

interface DataInstanciaProps {
  instanciaName: string;
  //onDelete: () => void; // Defina o tipo de onDelete como uma função que não retorna nada
}

export default function DataInstancia({
  instanciaName,
  // onDelete,
}: DataInstanciaProps) {


  const router = useRouter();
  //const [dropdownOpen, setDropdownOpen] = useState<boolean[]>(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [instance, setInstance] = useState<Instancia | null>(null);
  //const [showQRCode, setShowQRCode] = useState(false);
  const [QRCodeImage, setQRCodeImage] = useState("");
  const [erroOpen, setErroOpen] = useState(false);
  //const router = useRouter();
  const { instanceName, state } = (instance?.instance || {}) as { instanceName: any, state: any };

  // console.log("Instance name:", instanceName);
  // console.log("Instance state:", state);

  // console.log("Instances:", instance);
  useEffect(() => {
    fetchInstance();
  }, []);

  const fetchInstance = async () => {
    try {
      const response = await axios.get<Instancia>(
        `http://localhost:8080/instance/connectionState/${instanciaName}`,
        {
          headers: {
            "Content-Type": "application/json",
            apikey: `B6D711FCDE4D4FD5936544120E713976`,
          },
        }
      );


      setInstance(response.data);
      console.clear()
    } catch (error) {
      console.error("Erro ao buscar instância:", error);
    }
  };



  const handleButtonClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/instance/connect/${instanciaName}`,
        {
          headers: {
            "Content-Type": "application/json",
            apikey: `B6D711FCDE4D4FD5936544120E713976`,
          },
        }
      );
      console.log(response.data.base64);
      const { code, base64 } = response.data;
      setQRCodeImage(base64);
      if (code === 200 && base64) {
        setQRCodeImage(base64);
        //setShowQRCode(true);
      } else {
        console.error("Erro ao obter o QR Code");
      }
    } catch (error) {
      console.error("Erro ao conectar à instância:", error);
    }
  };
  const handleEncerrarInstance = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/instance/logout/${instanciaName}`,
        {
          headers: {
            "Content-Type": "application/json",
            apikey: `B6D711FCDE4D4FD5936544120E713976`,
          },
        }
      );

      if (response.data === 200) {
        console.error("Instancia deleta com sucesso");
      } else {
        console.error("Erro ao deletar Instancia");
      }
    } catch (error) {
      console.error("Erro ao deletar essa  instância:", instanciaName, error);
    }
  };

  const handleDeleteInstance = async () => {
    try {
      const responseDelete = await axios.delete(
        `http://localhost:8080/instance/delete/${instanciaName}`,
        {
          headers: {
            "Content-Type": "application/json",
            apikey: `B6D711FCDE4D4FD5936544120E713976`,
          },
        }
      );
      console.log("Logout response:", responseDelete.data);
      const { status, error, response } = responseDelete.data;
      if (status === "SUCCESS" && !error) {
        console.log("Logout successful:", response.message);
        router.push("/dashboard/manager");

        // Coloque aqui qualquer lógica adicional após o logout bem-sucedido
      } else {
        console.error("Erro ao fazer logout:", response.message);
      }
    } catch (error) {
      console.error("Erro ao conectar à instância:", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };


  const getStatusBadgeColor = (state: string | undefined) => {
    switch (state || "") {
      case "open":
        return "bg-[#219653] text-[#219653] bg-opacity-[0.12]";
      case "connecting":
        return "bg-[#FFA70B] text-[#FFA70B] bg-opacity-[0.12]";
      case "close":
        return "bg-[#D34053] text-[#D34053] bg-opacity-[0.12]";
      default:
        return "bg-[#fb8c00] text-[#fb8c00] bg-opacity-[0.12]";
    }
  };

  return (
    <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7">
      <div className="col-span-12">
        <span className="text-gray-500">Listar e Visualizar / <strong className=" text-gray-500">Instâncias</strong></span>{" "}

        <div className="bg-white dark:bg-darkBlue shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 bg-white dark:bg-[#121212] ">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-400">
              Detalhes da Instância {instanceName}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400 gag-4">
              Informações sobre as instâncias disponíveis:
              <span
                className={`${getStatusBadgeColor(
                  state
                )} ml-2 inline-flex  py-1 px-3 p-1 rounded-md  bg-opacity-75 text-sm font-medium`}
              >
                {state === 'open' ? (
                  <div className="flex items-center">
                    <MdCellWifi className="mr-2" />
                    Conectada
                  </div>
                ) : (
                  <div className="flex items-center">
                    <MdNoCell className="mr-2" />
                    Desconectada
                  </div>
                )}
              </span>
            </p>
          </div>
          <div className="border-t border-gray-200 flex flex-row justify-between">
            <div className="flex flex-grow gap-3">
              <button
                type="button"
                className="inline-flex h-6 m-2 items-center justify-center py-1 px-3 p-1 rounded-md text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-darkBlue"
                onClick={toggleDropdown}
              >
                <FiMoreVertical className="ml-1 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <div className="flex flex-grow gap-3">
              <button
                className="inline-flex h-6 m-2 items-center justify-center py-1 px-3 p-1 rounded-md  text-sm font-medium text-gray-500 dark:text-gray-400
                bg-white dark:bg-darkBlue"
                onClick={handleButtonClick}
              >
                Gerar QRCode
              </button>
              <button
                className="inline-flex h-6 m-2 items-center justify-center py-1 px-3 p-1 rounded-md  text-sm font-medium text-gray-500 dark:text-gray-400
                bg-white dark:bg-darkBlue"
                onClick={handleButtonClick}
              >
                Desconectar
              </button>
            </div>
            <div
              className={`${dropdownOpen ? "" : "hidden"
                } absolute left-10 mt-4 bg-white dark:bg-aibitMenu divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby={`options-menu`}
            >
              <div className="py-1" role="none">
                <button
                  className="inline-flex h-6 m-2 items-center justify-center py-1 px-3 p-1 gap-3 rounded-md text-sm font-medium text-graydark"
                  onClick={handleButtonClick}
                >
                  <MdEdit /> Gerar QRCode
                </button>
                <button
                  className="inline-flex h-6 m-2 items-center justify-center py-1 px-3 p-1 gap-3 rounded-md text-sm font-medium text-graydark"
                  onClick={handleEncerrarInstance}
                >
                  <MdEdit /> Desconectar
                </button>
                <button
                  className="inline-flex h-6 m-2 items-center justify-center py-1 px-3 p-1 gap-3 rounded-md text-sm font-medium text-white bg-red-700"
                  onClick={handleDeleteInstance}
                >
                  <MdEdit /> Deletar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col col-span-12 bg-white dark:bg-darkBlue/20  rounded-md h-auto">
        {state === "open" ? (
          <></>
        ) : (
          <>
            <div className="flex flex-row col-span-12 bg-white dark:bg-neutral-800 rounded-md  min-h-[40px] h-auto w-full">
              <div
                className="flex flex-grow bg-warning text-white dark:text-gray-400 gap-4 w-full justify-between text-center"
                role="alert"
              >
                <div className="flex flex-grow text-white dark:text-gray-400 pl-5 gap-4 justify-between items-center text-center max-w-[250px]">
                  <BsQrCodeScan />
                  <span className="text-rose-700"> Telefone não conectado</span>
                </div>
                <div>
                  <button
                    type="button"
                    className="inline-flex h-6 m-2 items-center justify-center py-4 px-3 gap-3 rounded-md text-sm font-medium text-white dark:text-gray-400 bg-green-700"
                    onClick={handleButtonClick}
                  >
                    <FiPlus className="ml-1" /> Conectar
                  </button>
                </div>
              </div>
            </div>
            <div className="col-span-12 ml-10">
              <Image
                src="/assets/WhatsApp-offline.jpg"
                alt="Conectado"
                width={300}
                height={300}
                className="w-auto h-80 size-60 ml-5 rounded-xl my-3"
              // style={{
              //   width: "120px",
              //   marginLeft: 10,
              //   marginBottom: 10,
              //   borderRadius: "12px",
              //   marginTop:10
              // }}
              />
            </div>
          </>
        )}
      </div>

      <div className="flex flex-row col-span-12 bg-white dark:bg-darkBlue rounded-md min-h-[80px] h-auto">
        <div className="mt-2 text-sm text-gray-900 sm:w-[50px] h-[40px] relative bg-white dark:bg-darkBlue  flex  flex-col gap-4">
          <div className="flex gap-3 mr-2 h-[20px]">
            <button
              type="button"
              className="inline-flex h-6 m-2 items-center justify-center  p-6 rounded-md text-sm font-medium text-graydark bg-white dark:bg-darkBlue "
              onClick={toggleDropdown}
            >
              <FiMoreVertical className="text-3xl" />
            </button>
          </div>


        </div>
        <div className="col-span-12 ml-10">
          {state === "open" ? (
            <Image
              src="/assets/whats-conectado.jpg"
              width={300}
              height={300}
              alt="Conectado"
              style={{
                //width: "300px",
                marginLeft: "30px",
                marginBottom: "30px",
                borderRadius: "12px",
                marginTop: 30
              }}
            />
          ) : (
            <div>
              {QRCodeImage && (
                <div className="col-span-12 ml-4">
                  <div className="px-5"
                  // style={{ paddingLeft: "20px", paddingRight: "20px" }}
                  >
                    <div
                      className="bg-rose-500 text-gray-500 dark:text-gray-400  rounded-full p-4 mb-5"
                      role="alert"

                    >
                      QRCODE é válido por apenas 40 segundos, Caso não apareça
                      ou erro, atualize a página.
                    </div>
                  </div>
                  <Image
                    width={384}
                    src={QRCodeImage}
                    alt="QR Code"
                    className=" w-96 ml-5 mb-5"
                  // style={{
                  //   width: "400px",
                  //   marginLeft: "20px",
                  //   marginBottom: "20px",
                  // }}
                  />
                </div>
              )}
            </div>
          )}

          {/* {QRCodeImage && (
          <div className="col-span-12">
            <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
              <div
                className="bg-danger text-white border-r-2"
                role="alert"
                style={{ padding: "20px" }}
              >
                QRCODE é válido por apenas 40 segundos, Caso não apareça ou
                erro, atualize a página.
              </div>
            </div>
            <img
              src={QRCodeImage}
              alt="QR Code"
              style={{
                width: "400px",
                marginLeft: "20px",
                marginBottom: "20px",
              }}
            />
          </div>
        )} */}
        </div>
      </div>


      {/* <div 
      className= {`${
        dropdownOpen ? "" : "hidden"
      }relative -left-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 block`}>
        <div className="px-4.5 py-3"><h5 className="text-sm font-medium text-bodydark2">Notification</h5></div><ul className="flex h-auto flex-col overflow-y-auto"><li><a className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4" href="#"><p className="text-sm"><span className="text-black dark:text-white">Edit your information in a swipe</span> Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</p><p className="text-xs">12 May, 2025</p></a></li><li><a class="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4" href="#"><p className="text-sm"><span className="text-black dark:text-white">It is a long established fact</span> that a reader will be distracted by the readable.</p><p className="text-xs">24 Feb, 2025</p></a></li><li><a className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4" href="#"><p className="text-sm"><span className="text-black dark:text-white">There are many variations</span> of passages of Lorem Ipsum available, but the majority have suffered</p><p className="text-xs">04 Jan, 2025</p></a></li><li><a className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4" href="#"><p className="text-sm"><span className="text-black dark:text-white">There are many variations</span> of passages of Lorem Ipsum available, but the majority have suffered</p><p className="text-xs">01 Dec, 2024</p></a></li></ul></div> */}

    </div>
  );
}
