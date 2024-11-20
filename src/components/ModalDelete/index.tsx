import { Fragment, useState } from "react";
import Moment from "moment";
import "moment/locale/pt-br";
import { useRouter } from "next/router";
import type { InvestmentType } from "@/types";
import { FaBitcoin } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "@/services/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { createInvestmentValidator } from "@/validators/create-investiment.valodator";
import { useForm } from "../../../node_modules/react-hook-form/dist";

export default function ModalDeleteInvestment({
  data,
  change,
  refreshInvestments,
}: {
  data: InvestmentType;
  change: any;
  refreshInvestments: any;
}) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const handleInvest = async (data: any) => {
    const toastId = toast.loading("Processando...");
    try {
      setLoading(true);
      await api.delete(`investments/${data.id}`);
      toast.dismiss(toastId);
      toast.success("Investimento removido!");
      refreshInvestments();

    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Falha o remover investimento");
    } finally {
      setLoading(false);
      change(false)
    }
  };

  return (
    <Fragment>
      <div className="block space-y-4 md:flex md:space-y-0 md:space-x-4 rtl:space-x-reverse w-full justify-center">
        <div
          id="progress-modal"
          aria-hidden="true"
          style={{ background: "rgb(0 0 0 / 88%)" }}
          className="dark:bg-red-700 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full bg-red-700">
            <div className="relative bg-white rounded-lg shadow dark:bg-black">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-white bg-[#696969] hover:bg-gray-100 hover:text-gray-100 rounded-lg text-sm w-22 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => change(false)}
              >
                <span className="text-gray-200 p-5">X</span>
              </button>

              <div className="p-4 md:p-5">
                <div className="p-1 md:p-1">
                  <span className=" text-gray-400">Remover Investimento</span>
                </div>
                <div className="p-1 md:p-1 bg-slate-800 flex justify-center">

                </div>

              </div>
              <Fragment>
                <div className="p-4 md:p-5">
                  <div className="flex justify-between mb-1 text-gray-500 dark:text-gray-400">
                    <span className="text-base font-normal">
                      {data.name}
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {data.price}
                    </span>
                  </div>
                  <form method="post" onSubmit={handleSubmit(handleInvest)}>
                    <input
                      type="hidden"
                      {...register("id", { value: data.id })}
                    />

                    <div className="flex items-center mt-6 space-x-2 rtl:space-x-reverse">
                      <button
                        type="submit"
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-800"
                      >
                        {loading ? (
                          <Fragment>
                            <svg
                              aria-hidden="true"
                              role="status"
                              className="inline mr-3 w-4 h-4 text-white animate-spin"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="#E5E7EB"
                              ></path>
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                            Confirmando deletar...
                          </Fragment>
                        ) : (
                          <Fragment>Confirmar deletar</Fragment>
                        )}
                      </button>

                      <button
                        onClick={() => change(false)}
                        type="button"
                        className="text-gray-500 bg-red-800 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-green-600 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              </Fragment>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
