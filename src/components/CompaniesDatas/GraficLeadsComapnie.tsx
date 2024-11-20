'use client';

import type { Empresa } from "@/types/empresa";
import { useState, useEffect } from 'react';
import { FaUsers, FaWhatsapp, FaUserSlash, FaPlus, FaUserTag, FaUserPlus, FaFilePdf, FaRegFileExcel, FaFileExcel } from "react-icons/fa";
import CardDataStats from "./CardDataStats";
import AreaChartComponent from "./chartsteste";
import CompsDateCharts from './ChatsCompanieList';
import { Lead } from '@/types/leads/leads';
import Image from "next/image";
import { BiSolidMessageRoundedError, BiSolidUserVoice } from "react-icons/bi";
import { RiSignalWifiErrorFill } from "react-icons/ri";
import MessagesComapny from "./Leads-list-company/messages-company-hors";
import { UserType } from "@/types";
import { saveAs } from 'file-saver';
import * as ExcelJS from 'exceljs';
import jsPDF from 'jspdf'; // Adicionando a importação do jsPDF
import 'jspdf-autotable';

interface GraficosLeeadsProps {
  companyData: Empresa;
  leadData: Lead[];
  leadsChart: any;
  messageData: any;
  userData: UserType;
}

export default function GraficosLeeads({ companyData, leadData, leadsChart, messageData, userData }: GraficosLeeadsProps) {
  const [loading, setLoading] = useState(true);
  const [animatedNumbers, setAnimatedNumbers] = useState({
    total: 0,
    NOVO: 0,
    STARTED: 0,
    REPLIED: 0,
  });

  useEffect(() => {
    if (leadsChart) {
      setLoading(false);
      let increment = 0;
      const interval = setInterval(() => {
        if (increment < leadsChart.total) {
          setAnimatedNumbers(prev => ({
            total: Math.min(prev.total + Math.floor(leadsChart.total / 100), leadsChart.total),
            NOVO: Math.min(prev.NOVO + Math.floor(leadsChart.NOVO / 100), leadsChart.NOVO),
            STARTED: Math.min(prev.STARTED + Math.floor(leadsChart.STARTED / 100), leadsChart.STARTED),
            REPLIED: Math.min(prev.REPLIED + Math.floor(leadsChart.REPLIED / 100), leadsChart.REPLIED),
          }));
          increment++;
        } else {
          clearInterval(interval);
        }
      }, 50); // Aumente o tempo para uma animação mais longa

      return () => clearInterval(interval);
    }
  }, [leadsChart]);

  if (!messageData) {
    return (
      <div className="flex items-center justify-center h-full">
        <Image src="/assets/funilv.svg" alt="Loading" width={120} height={120} className="animate-spin duration-1800" />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col bg-white dark:bg-darkBlue px-4 py-6 rounded-lg shadow-lg">
      {loading ? (
        <div className="relative z-40 flex items-center justify-center h-full p-5 bg-gray-200 dark:bg-black bg-opacity-90 rounded-lg">
          <Image
            src="/assets/funilv.svg"
            alt="Loading"
            width={120}
            height={120}
            className="animate-spin duration-1800"
          />
        </div>
      ) : (
        leadsChart && (
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                { title: "Base Total", total: animatedNumbers.total, rate: "0.43%", color: "bg-rose-700", icon: <FaUsers size={20} /> },
                { title: "Novo", total: animatedNumbers.NOVO, rate: "4.35%", color: "bg-blue-500", icon: <FaUserPlus size={20} /> },
                { title: "Em contato", total: animatedNumbers.STARTED, rate: "2.59%", color: "bg-blue-400", icon: <BiSolidUserVoice size={20} /> },
                { title: "Em Atendimento", total: animatedNumbers.REPLIED, rate: "2.59%", color: "bg-[#31ff2e]", icon: <FaWhatsapp size={20} /> },
              ].map((stat, index) => (
                <CardDataStats
                  key={index}
                  title={stat.title}
                  total={stat.total}
                  rate={stat.rate}
                  levelUp
                  color={stat.color}
                  status=""
                  className="transition-transform transform hover:scale-105 duration-300"
                >
                  {stat.icon}
                </CardDataStats>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-8">
              <div className="w-full m-4 bg-white dark:bg-darkBlue/70 rounded-lg shadow-lg">
                <AreaChartComponent metric={leadsChart} />
              </div>
              <div className="w-full m-4 bg-white dark:bg-darkBlue/70 rounded-lg shadow-lg">
                <div className="w-full p-10">
                  <CompsDateCharts metric={leadData} />
                </div>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}
