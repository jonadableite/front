"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import type { Instancia } from "@/types/instancia/instancia";
import { CreateInstancesAction } from "@/actions/instance/post-instance.action";


interface InstanciasCreateProps {
  onCreateSuccess: () => void; // Adicione a propriedade onCreateSuccess
}

export default function Instancias({ onCreateSuccess }: InstanciasCreateProps) {
  const [createinstances, setCreateInstances] = useState<Instancia[]>([]);
  const [novaInstancia, setNovaInstancia] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    CreateInstances();
  }, []);

  const CreateInstances = async () => {
    try {
      setLoading(true);

      const responseCreate = await axios.post<Instancia[]>(
        `https://evo.whatlead.com.br/instance/create`,
        {
          instanceName: novaInstancia,
          token: generateToken(),
          qrcode: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            apikey: 'B6D711FCDE4D4FD5936544120E713976',
          },
        }
      );
      setCreateInstances(responseCreate.data);
      console.log(responseCreate.data)
      onCreateSuccess();

    } catch (error) {
      console.error("Erro ao criar instância:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para gerar um token aleatório
  const generateToken = () => {
    return Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
  };

  return (
    <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7">
      <div className="col-span-12">
        <h4 className="font-bold py-3 mb-4">
          <span className="text-gray-500">Listar e Visualizar /</span> Instâncias
        </h4>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              1. Dados da instancia web
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Criar / Instância
            </p>
          </div>
          <div className="border-t border-gray-200">


          </div>
          <div className="p-6.5 ">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-col">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Nome usuário
                </label>
                <input
                  type="text"
                  value={novaInstancia}
                  onChange={(e) => setNovaInstancia(e.target.value)}
                  placeholder="Nome da instância"
                  className="w-full rounded border border-gray-200 bg-transparent py-3 text-gray-500 dark:text-gray-500py-3 px-5 font-medium outline-none transition focus:border-rose-700 active:border-rose-700 disabled:cursor-default disabled:bg-transparent dark:border-form-neutral-600 dark:bg-form-input dark:focus:border-neutral-600"
                />
              </div>
              <div className="w-full xl:w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Confirmar
                </label>
                <button
                  type="button"
                  className="inline-flex min-w-[250px] m-2 items-center justify-center px-8 p-3 rounded-full text-sm font-medium text-white bg-green-700"
                  onClick={CreateInstances}
                  disabled={loading}
                >
                  {loading ? "Criando aguarde..." : "Continuar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


