"use client";

import type { Empresa } from "@/types/empresa";
import Link from "next/link";
import Image from "next/image";
import ChangeTemplateButtonWhats from "../../buttons/button-modal-template";
import { FaWhatsapp, FaTimes, FaChartBar, FaPlug } from "react-icons/fa";
import { Key } from "react";

interface TemplateProps {
  id: string;
  phone: string;
  name: string;
  text: string;
  image: string;
  active: boolean;
  type: string;
  interaction: string;
  companyId: string; // Adicione esta propriedade
  idCompanie: string;
  enable_whatsapp: boolean;
}

export default function FormCompanyData({
  templateData,
}: {
  templateData: Empresa;
  companyId: { idCompanie: string }; // Altere aqui
}) {
  const template = templateData;
  console.log(template, "dados form");
  const attrs = "2000".split(";");
  return (
    <div className="col-span-12 rounded-sm border border-none bg-white dark:bg-darkBlue p-7 shadow dark:border-strokedark  xl:col-span-7">

      <div>
        <div className="py-2">
          <h5 className="font-medium text-black dark:text-white">
            Quantidade de disparos
          </h5>
        </div>
        {template?.message_per_runs &&
          template?.message_per_runs.map((commands: any, index: any) => (
            <div
              key={commands.id}
              className="col-span-12 flex flex-col w-full overflow-y-auto max-h-auto bg-white dark:bg-darkBlue p-7.5 shadow-md dark:border-stroke dark:shadow-lg rounded-2xl p-4"
            >
              <div className="flex flex-row justify-between items-center relative h-auto w-full min-w-[200px] my-2">
                <span className="text-gray-800 dark:text-white text-lg">
                  {commands.name}
                </span>

              </div>


              <div className="mb-4 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Periodo programado.
                  </label>
                  <input

                    value={commands.id_name}

                    type="text"
                    placeholder=" "
                    className="w-full rounded border border-neutral-600 bg-transparent py-3 px-5 text-base font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  focus:border-1 focus:border-rose-700  focus:outline-0"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Disparo por min.
                  </label>
                  <input

                    value={commands.amount_per_run}

                    type="text"
                    placeholder=" "
                    className="w-full rounded border border-neutral-600 bg-transparent py-3 px-5 text-base font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  focus:border-1 focus:border-rose-700  focus:outline-0"
                  />
                </div>

              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Continuidade
                  </label>
                  <div className="w-full gap-4 flex flex-row justify-start rounded border border-neutral-600 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input focus:border-1 focus:border-rose-700  focus:outline-0">
                    <input
                      checked={true}

                      id="bordered-checkbox-2"
                      type="checkbox"
                      value=""
                      name="bordered-checkbox"
                      className="w-5  text-rose-700 bg-gray-100 rounded border border-neutral-600 bg-transparent py-3 px-5 text-base font-medium outline-none transition focus:border-rose-700 active:border-rose-700 disabled:cursor-default disabled:bg-whiter dark:border-form-neutral-600 dark:bg-form-input dark:focus:border-rose-700"
                    />
                    <label
                      htmlFor="bordered-checkbox-2"
                      className="block text-black dark:text-white"
                    >
                      ativo
                    </label>
                  </div>
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Subject
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-gray-200 dark:bg-darkBlue py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      value="1"
                    //onChange={(e) => setSelectedType(e.target.value)}
                    >
                      <option value="1">1 - Disparo</option>
                      <option value="2">2 - Disparos</option>
                      <option value="3">3 - Disparos</option>
                      <option value="4">4 - Disparos</option>
                      <option value="5">5 - Disparos</option>
                      <option value="6">6 - Disparos</option>
                      <option value="6">6 - Disparos</option>
                      <option value="7">7 - Disparos</option>
                      <option value="8">8 - Disparos</option>
                      <option value="9">9 - Disparos</option>
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

            </div>
          ))}

        <div className="py-2">
          <h5 className="font-medium text-black dark:text-white">
            Integração {template?.integration_name}
          </h5>
        </div>
        {template?.message_per_runs &&
          template?.message_per_runs.map((commands: any, index: any) => (
            <div
              key={commands.id}
              className="col-span-12 flex flex-col w-full overflow-y-auto max-h-auto bg-white dark:bg-darkBlue p-7.5 shadow-md dark:border-stroke dark:shadow-lg rounded-2xl p-4"
            >
              <div className="flex flex-row justify-between items-center relative h-auto w-full min-w-[200px] my-2">
                <span className="text-gray-800 dark:text-white text-lg">
                  {commands.name}
                </span>
                {/* Opção de edição, desativada por agora */}
              </div>


              <div className="mb-4 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Periodo programado.
                  </label>
                  <input
                    //disabled={!editMode[index]}
                    value={commands.id_name}
                    //onChange={(e) => handleInputChange(e, index, "name")}
                    type="text"
                    placeholder=" "
                    className="w-full rounded border border-neutral-600 bg-transparent py-3 px-5 text-base font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  focus:border-1 focus:border-rose-700  focus:outline-0"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Disparo por min.
                  </label>
                  <input
                    //disabled={!editMode[index]}
                    value={commands.amount_per_run}
                    //onChange={(e) => handleInputChange(e, index, "name")}
                    type="text"
                    placeholder=" "
                    className="w-full rounded border border-neutral-600 bg-transparent py-3 px-5 text-base font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  focus:border-1 focus:border-rose-700  focus:outline-0"
                  />
                </div>

              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Continuidade
                  </label>
                  <div className="w-full gap-4 flex flex-row justify-start rounded border border-neutral-600 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input focus:border-1 focus:border-rose-700  focus:outline-0">
                    <input
                      checked={true}
                      //onChange={(e) => setIsActive(e.target.checked)}
                      id="bordered-checkbox-2"
                      type="checkbox"
                      value=""
                      name="bordered-checkbox"
                      className="w-5  text-rose-700 bg-gray-100 rounded border border-neutral-600 bg-transparent py-3 px-5 text-base font-medium outline-none transition focus:border-rose-700 active:border-rose-700 disabled:cursor-default disabled:bg-whiter dark:border-form-neutral-600 dark:bg-form-input dark:focus:border-rose-700"
                    />
                    <label
                      htmlFor="bordered-checkbox-2"
                      className="block text-black dark:text-white"
                    >
                      ativo
                    </label>
                  </div>
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Subject
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-gray-200 dark:bg-darkBlue py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      value="1"
                    //onChange={(e) => setSelectedType(e.target.value)}
                    >
                      <option value="1">1 - Disparo</option>
                      <option value="2">2 - Disparos</option>
                      <option value="3">3 - Disparos</option>
                      <option value="4">4 - Disparos</option>
                      <option value="5">5 - Disparos</option>
                      <option value="6">6 - Disparos</option>
                      <option value="6">6 - Disparos</option>
                      <option value="7">7 - Disparos</option>
                      <option value="8">8 - Disparos</option>
                      <option value="9">9 - Disparos</option>
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

            </div>
          ))}

        <div className="flex flex-1 items-center justify-between">
          <div className="py-4">
            <h5 className="font-medium text-black dark:text-white">
              {templateData.name}
            </h5>

            <div className="gap-3">
              <span className="text-sm text-neutral-600 dark:text-gray-200 gap-3">
                modelo{" "}
              </span>
              {templateData.enable_to_send_provider !== false && (
                <div
                  className={`inline-flex h-6 w-auto items-center justify-center py-1 px-3 p-1 rounded-md  text-sm font-medium text-white dark:text-gray-400
                    ${templateData.enable_to_send_provider == true
                      ? "bg-whatgreen"
                      : "bg-danger "
                    }`}
                >
                  <span className="text-sm font-medium text-white">
                    Campanhas{" "}
                    {templateData.enable_to_send_provider == true
                      ? "Ativo"
                      : "não"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {templateData.enabled !== false && (
            <div
              className={`inline-flex h-6 w-6 items-center justify-center py-1 px-3 p-1 rounded-md  text-sm font-medium text-white
                    ${templateData.enabled == true
                  ? "bg-primary "
                  : "bg-danger "
                }`}
            >
              <span className="text-sm font-medium text-white"> ok</span>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-sm border border-neutral-700 bg-white dark:bg-darkBlue shadow dark:border-strokedark ">
        {template && (
          <>
            {template.template?.template_vars.header &&
              template.template?.template_vars.header.map(
                (
                  headerItem: { type: string; content: string | undefined },
                  index: Key | null | undefined
                ) => {
                  if (headerItem.type === "image") {
                    return (
                      <span key={index} className="block px-4 pt-4" >
                        <img
                          loading="lazy"
                          width="340"
                          height="188"
                          decoding="async"
                          src={headerItem.content}
                          alt={`Header Image ${index}`}
                        />
                      </span>
                    );
                  }
                  return null; // Handle other header types if needed
                }
              )}
            {template.template?.start_script &&
              template.template?.start_script.map((bodyItem: any, index: any) => {
                if (bodyItem.type === "text") {
                  return (
                    <p key={index} className="block px-4 pt-4">
                      {bodyItem.content}
                    </p>
                  );
                } else if (bodyItem.type === "document") {
                  return (
                    <Link
                      key={index}
                      href={bodyItem.url}
                      className="block px-4 pt-4"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {bodyItem.title}
                    </Link>
                  );
                }
                return null; // Handle other body types if needed
              })}
          </>
        )}
      </div>
    </div>
  );
}
