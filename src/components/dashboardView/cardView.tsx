import React, { useState, useEffect } from "react";
import { getCompaniesAction } from "@/actions/companies/get-companies.action";

type InputFormType = {
  // Declare o tipo para globalMessageCounts se necessário
};
const formatNumber = (number: number) => {
  return number.toLocaleString('pt-BR');
};

export default function CardViewDetails({ }: InputFormType) {
  const [globalMessageCounts, setGlobalMessageCounts] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGlobalCount();
  }, []);

  const fetchGlobalCount = async () => {
    try {
      const result = await getCompaniesAction();
      if (result && result.globalMessageCounts) {
        setGlobalMessageCounts(result.globalMessageCounts);
      }
    } catch (error) {
      console.error('Erro ao buscar globalMessageCounts:', error);
    } finally {
      setLoading(false); // Marca o carregamento como concluído, independentemente de sucesso ou falha
    }
  };

  const formatNumber = (number: number) => {
    return number.toLocaleString('pt-BR');
  };

  if (loading) {
    return (
      <div className="h-auto w-full flex flex-wrap gap-2 bg-white dark:bg-darkBlue">
        {/* Render loading skeleton */}
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="h-28 border border-azuluro dark:border-azuluro shadow rounded-md p-4 max-w-sm w-full mx-auto flex justify-center"
          >
            <div className="animate-pulse flex space-x-4 items-center w-full">
              <div className="rounded-full bg-azuluro dark:bg-azuluro h-14 w-14"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-3 bg-azuluro dark:bg-azuluro rounded col-span-2"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-3 bg-azuluro dark:bg-azuluro rounded col-span-2"></div>
                    <div className="h-3 bg-azuluro dark:bg-azuluro rounded col-span-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col bg-white dark:bg-darkBlue rounded-sm p-6">
      <div className="mb-6">
        <h3 className="font-bold text-muted-800 dark:text-white text-lg">
          Suas estatísticas rápidas ainda não funcionam
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Total de Mensagens"
          value={globalMessageCounts?.totalMessages || 0} // Use 0 (ou outro valor padrão) se globalMessageCounts for null
          icon={<TotalMessagesIcon />}
        />
        <StatCard
          title="Mensagens Entregues"
          value={globalMessageCounts?.deliveredMessages || 0} // Use 0 (ou outro valor padrão) se globalMessageCounts for null
          icon={<DeliveredMessagesIcon />}
        />
        <StatCard
          title="Mensagens Lidas"
          value={globalMessageCounts?.readMessages || 0} // Use 0 (ou outro valor padrão) se globalMessageCounts for null
          icon={<ReadMessagesIcon />}
        />
      </div>
    </div>
  );
}

type StatCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
};

const StatCard = ({ title, value, icon }: StatCardProps) => (
  <div className="glowing-card flex items-center gap-2 rounded-md px-5 py-10">
    <div className="p-4 rounded-full bg-rose-200 text-primary-500 dark:bg-rose-700/20 dark:text-gray-400">
      {icon}
    </div>
    <div className="card-content">
      <h2 className="font-medium text-slate-500 dark:text-white">
        <span className="font-bold text-neutral-400 dark:text-gray-200">
          {formatNumber(value)}
        </span>
      </h2>
      <div className="text-muted-500 dark:text-muted-400">
        <span className="text-neutral-400 dark:text-gray-200">{title}</span>
      </div>
    </div>
  </div>
);


// Exemplo de ícones
const TotalMessagesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
    className="icon size-5"
    width="1em"
    height="1em"
    viewBox="0 0 256 256"
  >
    <g fill="#de3a3a">
      <path
        d="m219.84 73.16l-88-48.16a8 8 0 0 0-7.68 0l-88 48.18a8 8 0 0 0-4.16 7v95.64a8 8 0 0 0 4.16 7l88 48.18a8 8 0 0 0 7.68 0l88-48.18a8 8 0 0 0 4.16-7V80.18a8 8 0 0 0-4.16-7.02M128 168a40 40 0 1 1 40-40a40 40 0 0 1-40 40"
        opacity=".2"
      ></path>
      <path d="M128 80a48 48 0 1 0 48 48a48.06 48.06 0 0 0-48-48m0 80a32 32 0 1 1 32-32a32 32 0 0 1-32 32m95.68-93.85l-88-48.15a15.88 15.88 0 0 0-15.36 0l-88 48.17a16 16 0 0 0-8.32 14v95.64a16 16 0 0 0 8.32 14l88 48.17a15.88 15.88 0 0 0 15.36 0l88-48.17a16 16 0 0 0 8.32-14V80.18a16 16 0 0 0-8.32-14.03M128 224l-88-48.18V80.18L128 32l88 48.17v95.63Z"></path>
    </g>
  </svg>
);

const DeliveredMessagesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
    className="icon size-5"
    width="1em"
    height="1em"
    viewBox="0 0 256 256"
  >
    <g fill="#f2994a">
      <path
        d="m219.84 73.16l-88-48.16a8 8 0 0 0-7.68 0l-88 48.18a8 8 0 0 0-4.16 7v95.64a8 8 0 0 0 4.16 7l88 48.18a8 8 0 0 0 7.68 0l88-48.18a8 8 0 0 0 4.16-7V80.18a8 8 0 0 0-4.16-7.02M128 168a40 40 0 1 1 40-40a40 40 0 0 1-40 40"
        opacity=".2"
      ></path>
      <path d="M128 80a48 48 0 1 0 48 48a48.06 48.06 0 0 0-48-48m0 80a32 32 0 1 1 32-32a32 32 0 0 1-32 32m95.68-93.85l-88-48.15a15.88 15.88 0 0 0-15.36 0l-88 48.17a16 16 0 0 0-8.32 14v95.64a16 16 0 0 0 8.32 14l88 48.17a15.88 15.88 0 0 0 15.36 0l88-48.17a16 16 0 0 0 8.32-14V80.18a16 16 0 0 0-8.32-14.03M128 224l-88-48.18V80.18L128 32l88 48.17v95.63Z"></path>
    </g>
  </svg>
);

const ReadMessagesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
    className="icon size-5"
    width="1em"
    height="1em"
    viewBox="0 0 256 256"
  >
    <g fill="#4096ff">
      <path
        d="m219.84 73.16l-88-48.16a8 8 0 0 0-7.68 0l-88 48.18a8 8 0 0 0-4.16 7v95.64a8 8 0 0 0 4.16 7l88 48.18a8 8 0 0 0 7.68 0l88-48.18a8 8 0 0 0 4.16-7V80.18a8 8 0 0 0-4.16-7.02M128 168a40 40 0 1 1 40-40a40 40 0 0 1-40 40"
        opacity=".2"
      ></path>
      <path d="M128 80a48 48 0 1 0 48 48a48.06 48.06 0 0 0-48-48m0 80a32 32 0 1 1 32-32a32 32 0 0 1-32 32m95.68-93.85l-88-48.15a15.88 15.88 0 0 0-15.36 0l-88 48.17a16 16 0 0 0-8.32 14v95.64a16 16 0 0 0 8.32 14l88 48.17a15.88 15.88 0 0 0 15.36 0l88-48.17a16 16 0 0 0 8.32-14V80.18a16 16 0 0 0-8.32-14.03M128 224l-88-48.18V80.18L128 32l88 48.17v95.63Z"></path>
    </g>
  </svg>
);

