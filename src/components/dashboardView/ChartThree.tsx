import {
  FaWhatsapp,
  FaTimes,
  FaChartBar,
} from "react-icons/fa";
import { useState, useEffect } from "react";

export default function ChartThree() {
  const [progress, setProgress] = useState(0);
  const [circleProgress, setCircleProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCircleProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, 80);
    return () => clearInterval(interval);
  }, []);

  // Função para calcular o valor conforme o progresso
  const calculateValue = (progress: number, maxValue: number) => {
    return Math.floor((progress / 100) * maxValue);
  };

  return (
    <div className="flex w-full flex-col bg-gradient-to-r from-gray-100 to-white dark:from-gray-800 dark:to-darkBlue rounded-lg p-6 shadow-lg">
      <div className="flex flex-col gap-6 xl:flex-col">
        <div className="grid gap-6 md:grid-cols-2">

          {/* Gráfico de Rosca com Animação Contínua */}
          <div className="relative flex justify-center items-center rounded-lg border border-gray-200 backdrop-filter backdrop-blur-lg bg-white/40 dark:bg-darkBlue/40 py-8 shadow-lg">
            <div className="relative flex items-center justify-center">
              <div className="relative flex flex-col items-center justify-center" style={{ width: "150px", height: "150px" }}>
                <svg className="-rotate-90 transform" style={{ width: "150px", height: "150px" }}>
                  <circle
                    className="text-gray-200 dark:text-strokedark"
                    strokeWidth="16"
                    stroke="currentColor"
                    fill="transparent"
                    r="58"
                    cx="75"
                    cy="75"
                  ></circle>
                  <circle
                    className="text-blue-600 transition-all duration-500 ease-in-out"
                    strokeWidth="16"
                    strokeDasharray="364.42"
                    strokeDashoffset={364.42 - (circleProgress / 100) * 364.42}
                    stroke="currentColor"
                    fill="transparent"
                    r="58"
                    cx="75"
                    cy="75"
                  ></circle>
                </svg>
                <span
                  className="absolute text-xl font-bold text-black dark:text-white transition-transform duration-300"
                  style={{ top: "50%", transform: "translateY(-50%)" }}
                >
                  {circleProgress}%
                </span>
              </div>
            </div>

            <div className="ml-8">
              <h3 className="text-xl font-bold text-black dark:text-white">
                Mensagem disponível
              </h3>
              <p className="mt-3.5 font-medium">
                <span className="text-black dark:text-white">{calculateValue(circleProgress, 250)}</span>
                <span className="text-sm"> MSG</span> /
                <span className="text-black dark:text-white">500</span>
                <span className="text-sm"> MSG</span>
              </p>
            </div>

            {/* <button className="absolute right-4 top-1/2 transform -translate-y-1/2 rotate-[270deg] rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 py-1 px-4 font-medium text-white shadow transition-all duration-300">
              Ativo
            </button> */}
          </div>

          {/* Gráfico de Barra com Animação e Números em Loop */}
          <div className="flex-grow rounded-lg border border-gray-200 backdrop-filter backdrop-blur-lg bg-white/40 dark:bg-darkBlue/40 p-6 shadow-lg">
            <div className="mb-4">
              <span className="font-medium text-black dark:text-white">Média por disparos</span>
              <div className="relative mt-2 h-2 rounded-full bg-gray-300 dark:bg-strokedark">
                <div
                  className="absolute left-0 h-2 rounded-full bg-primary transition-all duration-500 ease-in-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-sm font-medium text-black dark:text-white mt-1">{calculateValue(progress, 20)} MSG</div>
            </div>

            <div className="mt-5 flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-gray-200 dark:bg-darkBlue">
                <FaWhatsapp className="text-success" />
              </div>
              <div className="flex-grow">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-medium text-black dark:text-white">Mensagens WhatsApp</span>
                  <span className="text-sm font-medium text-black dark:text-white">{calculateValue(progress, 250)}</span>
                </div>
                <div className="relative h-2 rounded-full bg-gray-300 dark:bg-strokedark">
                  <div
                    className="absolute left-0 h-2 rounded-full bg-[#F2994A] transition-all duration-500 ease-in-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-gray-200 dark:bg-darkBlue">
                <FaTimes className="text-red-500" />
              </div>
              <div className="flex-grow">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-medium text-black dark:text-white">Sem retorno</span>
                  <span className="text-sm font-medium text-black dark:text-white">{calculateValue(progress, 120)}</span>
                </div>
                <div className="relative h-2 rounded-full bg-gray-300 dark:bg-strokedark">
                  <div
                    className="absolute left-0 h-2 rounded-full bg-red-700 transition-all duration-500 ease-in-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-gray-200 dark:bg-darkBlue">
                <FaChartBar className="text-green-600" />
              </div>
              <div className="flex-grow">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-medium text-black dark:text-white">Positivas</span>
                  <span className="text-sm font-medium text-black dark:text-white">{calculateValue(progress, 180)}</span>
                </div>
                <div className="relative h-2 rounded-full bg-gray-300 dark:bg-strokedark">
                  <div
                    className="absolute left-0 h-2 rounded-full bg-green-600 transition-all duration-500 ease-in-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
