"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import type { Instancia } from "@/types/instancia/instancia";
import { FaBitcoin, FaEye } from "react-icons/fa";
import Link from "next/link";
import InstanciasCreate from "../createInstancia";
import { GetInstancesAction } from "@/actions/instance/get-instance.action";
import Image from "next/image";
import { formatarTelefone } from "@/util/formatPhone";
export default function Instancias() {
  const [instances, setInstances] = useState<Instancia[]>([]);
  const [showCreateInstance, setShowCreateInstance] = useState<boolean>(false);

  const handleVerDetalhes = (instance: Instancia) => {

  };



  useEffect(() => {
    fetchInstances();
  }, []);

  const fetchInstances = async () => {

    try {
      const response = await GetInstancesAction();
      if (response) {
        setInstances(response);
        console.log("Instâncias encontradas:", response);
      } else {
        console.error("A resposta da API está vazia ou indefinida.");
      }


    } catch (error) {
      console.error("Erro ao buscar instâncias:", error);
    }
  };


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
        return "Instância Conectada";
      case "connecting":
        return "Aguardando Conectar";
      case "close":
        return "Instância Desconectada";
      default:
        return "";
    }
  };


  const handleCreateInstanceClick = () => {
    setShowCreateInstance(true);
  };

  const handleCreateSuccess = () => {
    setShowCreateInstance(false);
    fetchInstances();
  };

  return (
    <div className="col-span-12 rounded-sm border border-neutral-0 bg-white dark:bg-darkBlue p-7 shadow-default dark:border-neutral-600  xl:col-span-12">
      {showCreateInstance ? (
        <InstanciasCreate onCreateSuccess={handleCreateSuccess} />
      ) : (
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7">
          <div className="col-span-12">
            <div className="font-bold py-2 px-8">
              <span className="text-gray-500">Listar e Visualizar /</span>{" "}
              Instâncias
            </div>
            <div className=" text-white dark:text-gray-600 shadow overflow-hidden sm:rounded-lg">
              <div className=" sm:py-2  text-black dark:text-white">
                <div className="flex text-center justify-between px-8">
                  <div className="flex text-center justify-center flex-col">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-600 text-start">
                      Detalhes da Instância
                    </h3>
                    <p className="flex mt-1 max-w-2xl text-sm text-gray-500 dark:text-white align-center  text-start">
                      Informações sobre as instâncias disponíveis.
                    </p>
                  </div>
                  <div className="flex text-center justify-between  ">
                    <button
                      type="button"
                      onClick={handleCreateInstanceClick}
                      className="inline-flex  m-2 items-center justify-center px-8 p-3 rounded-full text-sm font-medium text-white bg-green-700 hover:bg-green-800"
                    >
                      Criar nova instância
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-sm border border-none bg-white dark:bg-darkBlue px-5 pt-6 pb-2 shadow-default dark:border-gray-600  sm:px-7 xl:pb-1">
                {instances.length === 0 ? (
                  <>
                    <div

                      className=" relative z-40 top-0 left-0 right-0 bottom-0 h-full flex flex-col items-center justify-center p-5 bg-[#000] bg-opacity-90"
                    >


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
                    <div className="rounded-sm bg-gray-2 dark:bg-darkBlue sm:grid-cols-5 text-red-700 px-4 py-3  mb-4 mt-4 text-center">
                      <p>Não há instâncias criadas.</p>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col">
                    <div className="grid grid-cols-6 rounded-sm bg-gray-100 dark:bg-darkBlue/20 sm:grid-cols-6">
                      <div className="p-2.5 text-start justify-center xl:p-5 text-gray-600 dark:text-gray-500">
                        <h5 className="text-sm font-medium uppercase xsm:text-base ">
                          WhatsApp
                        </h5>
                      </div>
                      <div className="p-2.5 text-start justify-center xl:p-5 text-gray-600 dark:text-gray-500">
                        <h5 className="text-sm font-medium uppercase xsm:text-base ">
                          Nome da Instância
                        </h5>
                      </div>
                      <div className="p-2.5 text-start justify-center xl:p-5 text-gray-600 dark:text-gray-500">
                        <h5 className="text-sm font-medium uppercase xsm:text-base ">
                          Nome da Instância
                        </h5>
                      </div>
                      <div className="p-2.5 text-start justify-center xl:p-5 text-gray-600 dark:text-gray-500">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                          Número
                        </h5>
                      </div>
                      <div className="hidden p-2.5 text-start justify-center sm:block xl:p-5 text-gray-600 dark:text-gray-500">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                          Status
                        </h5>
                      </div>
                      <div className="hidden p-2.5 text-start justify-center sm:block xl:p-5 text-gray-600 dark:text-gray-500">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                          Ações
                        </h5>
                      </div>
                    </div>

                    {instances.map((instance: any, index: number) => {
                      const { instanceName, owner, status, profilePictureUrl, profileName } = instance.instance;
                      return (
                        <div
                          key={index}
                          className={`grid grid-cols-3 sm:grid-cols-6 ${index === instances.length - 1
                            ? ""
                            : "border-b border-gray-200 dark:border-strokedark"
                            }`}
                        // className={`bg-white dark:bg-aibitMenu text-black dark:text-white`
                        // index % 2 === 0 ? "bg-gray-50" : "bg-bgmessage"
                        >
                          <div className="flex items-center justify-start gap-3 p-2.5 xl:p-5">
                            <div className="flex items-center justify-center w-14 h-14 overflow-hidden rounded-full bg-rose-700">
                              {profileName && (
                                <>
                                  {profilePictureUrl ? (
                                    <img
                                      src={profilePictureUrl}
                                      alt=""
                                      className="w-full"
                                    />
                                  ) : (
                                    <span className="text-white">
                                      {profileName.substr(0, 2).toUpperCase()}
                                    </span>
                                  )}
                                </>
                              )}


                            </div>
                          </div>
                          <div className="flex items-center justify-start gap-3 p-2.5 xl:p-5">
                            <p className="hidden text-black dark:text-white sm:block">
                              {profileName}
                            </p>
                          </div>
                          <div className="flex items-center justify-start gap-3 p-2.5 xl:p-5">
                            <p className="hidden text-black dark:text-white sm:block">
                              {instanceName}
                            </p>
                          </div>
                          <div className="flex items-center justify-start p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">
                              {" "}
                              {/* {owner ? formatarTelefone(owner.split("@")[0]) : "Instância Desconectada"} */}
                              {owner ? formatarTelefone(owner.split("@")[0].replace(/^.{2}/, '')) : "Instância Desconectada"}

                            </p>
                          </div>
                          <div className="flex items-center justify-start p-2.5 xl:p-5">
                            <p
                              className={`px-4 py-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(
                                status
                              )}`}
                            >
                              {getStatusText(status)}
                            </p>
                          </div>
                          <div className="hidden items-center justify-start p-2.5 sm:flex xl:p-5">
                            <Link href={`/dashboard/manager/${instanceName}`}>
                              <div className=" py-5 px-4 ">
                                <span className=" space-x-3 relative flex h-8 w-8 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray-100 hover:text-rose-700 dark:hover:text-rose-700 dark:border-strokedark dark:bg-white text-neutral-500 dark:text-neutral-600">
                                  <FaEye />
                                </span>
                              </div>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>


                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}