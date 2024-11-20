"use client"
import React, { ReactNode, useState } from 'react';
import CustomModalLeadsmessage from "@/components/Modals/ModalLeads";
import { Lead } from '@/types/leads/leads';
import { FaDownload, FaEllipsisV, FaFilePdf, FaList } from 'react-icons/fa';
import { MdMoreVert } from 'react-icons/md';
import { FiMoreVertical } from 'react-icons/fi';
import { saveAs } from 'file-saver';
import * as ExcelJS from 'exceljs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface CardDataStatsProps {
  title: string;
  total: string | number;
  rate: string;
  color: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
  //leads: Lead[];
  status: string;
  className?: string;
}

const today = new Date().toISOString().split('T')[0];
// const exportToExcel = (leadData: Lead[], status?: string) => {
//   // Verifica se leadData é uma matriz antes de iterar sobre ela
//   if (!Array.isArray(leadData)) {
//     console.error('leadData não é uma matriz:', leadData);
//     return;
//   }

//   const workbook = new ExcelJS.Workbook();
//   let worksheet: ExcelJS.Worksheet;

//   if (status) {
//     worksheet = workbook.addWorksheet(`Leads - ${status}`);

//     // Adicione cabeçalhos
//     worksheet.addRow(['Nome', 'Telefone', 'Status']);

//     // Adicione os dados dos leads com o status especificado
//     leadData.forEach(lead => {
//       if (lead.status === status) {
//         worksheet.addRow([lead.name, lead.phone, lead.status]);
//       }
//     });
//   } else {
//     worksheet = workbook.addWorksheet('Todos os Leads');

//     // Adicione cabeçalhos
//     worksheet.addRow(['Nome', 'Telefone', 'Status']);

//     // Adicione todos os dados dos leads
//     leadData.forEach(lead => {
//       worksheet.addRow([lead.name, lead.phone, lead.status]);
//     });
//   }

//   // Salve o arquivo Excel
//   workbook.xlsx.writeBuffer().then(buffer => {
//     const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//     const filename = status ? `leads_${status}.xlsx` : 'todos_os_leads.xlsx';
//     saveAs(blob, filename);
//   });
// };



// const exportToPDF = (title: string, total: string, leadData: Lead[], status: string) => {
//   // Criar uma instância do jsPDF
//   const doc = new jsPDF();

//   // Definir o título e o total
//   doc.text(`Título: ${title}`, 10, 10);
//   doc.text(`Total: ${total}`, 10, 20);

//   // Adicionar uma tabela para os dados dos leads
//   const leadRows = leadData.map((lead, index) => [lead.name, lead.phone, lead.status]);
//   doc.autoTable({
//     head: [['Nome', 'Telefone', 'Status']],
//     body: leadRows,
//     startY: 30,
//   });

//   // Salvar o PDF
//   doc.save(`${today}-relatorio-${status}.pdf`);
// };



const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  color,
  rate,
  levelUp,
  levelDown,
  children,
  //leads,
  status
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [modalTitle, setModalTitle] = useState('');

  // const openModal = () => {
  //   // Filtra os leads com base no status do card
  //   const filtered = leads.filter(lead => lead.status === status);
  //   setFilteredLeads(filtered);
  //   setModalTitle(`Leads - ${status}`);
  //   setModalOpen(true);
  // };



  const closeModal = () => {
    setModalOpen(false);
  };
  // const exportLeadsByStatus = () => {
  //   exportToExcel(filteredLeads, status);
  // };




  return (
    <>


      <div className="dark:bg-darkBlue bg-slate-50 text-white p-2 w-full">

        <div className="flex flex-row">
          <div className="flex flex-col sticky top-0 z-10 w-full">
            <div className=" bg-white dark:bg-neutral-800/60 border-none dark:border-neutral-900 shadow-md  rounded-2xl p-4">
              <div className="flex-none sm:flex">
                <div className={`flex justify-center items-center relative h-10 w-10  sm:mb-0 mb-1 ${color} rounded-full mt-4 `}>
                  {children}
                </div>
                <div className="flex-auto sm:ml-2 justify-evenly ">
                  <div className="flex items-center justify-between sm:mt-2">
                    <div className="flex items-center w-full">
                      <div className="flex flex-col w-full">
                        <div className="flex items-center space-x-3.5 pl-4">
                          <div className="flex text-center items-center  justify-between w-full  my-3 text-xs bg-transparent  font-medium tracking-wider  transition ease-in duration-300 rounded-sm">
                            <div className="flex w-full text-lg  first-letter:flex items-center justify-between dark:text-gray-200 text-neutral-500   leading-none">
                              <h3> {title}</h3>
                              {status && status !== null && (
                                <>

                                  {/* <button onClick={exportLeadsByStatus}
                                    className=" text-base text-gray-400 dark:text-gray-200 hover:text-rose-700 hover:dark:text-rose-700">
                                    <FaDownload />
                                  </button>
                                  <button
                                    className='dark:bg-darkBlue text-white'
                                    onClick={() => exportToPDF(title, total, filteredLeads, status)}>
                                    <FaFilePdf />
                                  </button> */}
                                  {/* <button onClick={openModal} className=" text-xl text-gray-400 dark:text-gray-200 hover:text-rose-700 hover:dark:text-rose-700">
                                    <FaEllipsisV />
                                  </button> */}
                                </>
                              )}

                            </div>
                          </div>
                        </div>
                        <div className="flex w-full  my-1 pl-4 px-0 justify-between">
                          <div className='flex w-full  first-letter:flex items-center justify-between dark:text-gray-200 text-neutral-500   leading-none'>
                            <span className="mr-3 text-3xl gap-3 dark:text-white text-black font-bold">
                              {total}
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
      </div>
      {/* Conteúdo do modal (exibido condicionalmente) */}
      {modalOpen && (
        <div className="fixed z-50 overflow-y-hidden top-0 left-0 w-full h-full flex justify-center items-center  bg-darkBlue bg-opacity-90">
          <div className=" bg-white dark:bg-darkBlue p-4 rounded-lg h-4/5 max-h-[90%] w-6/12 overflow-y-auto">
            <div className='flex flex-row justify-between items-center p-4'>
              <h2 className="text-xl font-bold mb-4 text-gray-500 dark:text-gray-200">{modalTitle}</h2>
              <button onClick={closeModal} className="h-10 w-10 rounded-full  text-gray-500  dark:text-gray-200 hover:text-rose-700 dark:hover:text-rose-700 hover:bg-gray-400 hover:dark:bg-neutral-500 ">X</button>
            </div>


            <CustomModalLeadsmessage leads={filteredLeads} onRequestClose={function (): void {
              throw new Error('Function not implemented.');
            }} />
          </div>
        </div>
      )}




    </>
  );
};

export default CardDataStats;
