import { Fragment } from "react";
import Moment from "moment";
import ModalDeleteInvestment from "@/components/ModalDelete";
import { BsAndroid2 } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import "moment/locale/pt-br";
import { FaTrash, FaLock } from "react-icons/fa";
import type { Empresa } from "@/types/empresa";
import Link from "next/link";

export default function ListComapanyAll({ data }: { data: Empresa }) {
  Moment.locale("pt-br");

  return (
    <Fragment>
      <div className=" text-white m-2 ">
        <div className="flex flex-row">
          <div className=" flex flex-col sticky top-0 z-10 w-full">
            <div className="bg-white dark:bg-roxouro1 border dark:border-darkBlue border-neutral-200 shadow-lg  rounded-2xl p-2">
              <div className="flex-none sm:flex ">
                <div className="flex justify-center items-center relative h-10 w-10 mt-3  sm:mb-0 mb-1 bg-greenUro rounded-full ">
                  <BsAndroid2 size={22} />
                </div>

                <div key={`empresa-/${data.id}`} className="flex-auto sm:ml-5 justify-evenly ">
                  <div className="flex items-center justify-between sm:mt-2">
                    <div className="flex items-center w-full">
                      <div className="flex flex-col w-full">
                        <div className="flex items-center space-x-3.5">
                          <Link
                            href={`/dashboard/empresa/${data.id}`}
                            className=" flex  justify-between w-full text-white p-4 text-xs bg-transparent  hover:bg-zinc-200 dark:hover:bg-zinc-800  font-medium tracking-wider  transition ease-in duration-300 rounded-lg"
                          >
                            <div className="flex-none text-lg text-neutral-600 dark:text-gray-200 font-bold leading-none">
                              {data.name}
                            </div>
                            <MdEdit className="text-greenUro dark:text-white text-sm" />
                          </Link>
                        </div>

                        <div className="flex w-full text-gray-400 my-1 px-2 justify-between">
                          <span className="mr-3 ">Status</span>
                          <span className="mr-3 border-r border-gray-600  max-h-0"></span>
                          <span
                            className={`${data.active === true
                              ? "text-green-500"
                              : "text-rose-600"
                              }`}
                          >
                            {data.active === true ? "liberada" : "Em pausa"}
                          </span>
                        </div>

                        <div className="flex w-full text-gray-400 my-1 px-2 justify-between">
                          <span className="mr-3 ">Tipo</span>

                          <span className="mr-3 border-r border-gray-600  max-h-0"></span>
                          <span className="text-yellow-500">
                            {" "}
                            {data.active == true ? "Ativação" : "Receptivo"}
                          </span>
                        </div>
                        <div className="flex w-full text-gray-400 my-1 px-2 justify-between">
                          <span className="mr-3 ">Plataforma</span>

                          <span className="mr-0 border-r w-2 bg-gray-600 border-gray-600  max-h-0"></span>
                          <span className="text-blue-700">
                            {data.active === true ? "Meta Oficial" : "Watson"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
