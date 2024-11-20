"use client";

import React, { useState } from 'react';
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";

interface PaginationButtonsProps {
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}


export default function PaginationButtons({
  totalPages,
  totalItems,
  onPageChange,
}: PaginationButtonsProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    onPageChange(currentPage - 1);
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex justify-center my-4 ">
      <div className='flex justify-between w-4/5'>
      <button onClick={handlePrevPage} disabled={currentPage === 1} className="flex items-center space-x-4 relative  h-8 w-8  justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-gray-200 dark:border-strokedark dark:bg-meta-4  text-zinc-400 dark:text-white transition-all duration-800  hover:bg-rose-700 dark:hover:bg-rose-700">
      <MdOutlineNavigateBefore />
      </button>
      <span className=' text-gray-400 dark:text-gray-400'>Página <strong className='p-2 text-rose-700'>{currentPage}</strong> de <strong className='p-2 text-yellow-500'>{totalPages}</strong></span>
      <span className=' text-gray-400 dark:text-gray-400'>Total de Itens: <strong className='p-2 text-rose-700'>{totalItems}</strong></span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages} className="flex items-center space-x-3.5 relative  h-8 w-8  justify-center rounded-full border-[0.5px] border-stroke bg-gray text-zinc-400 hover:text-gray-200 dark:border-strokedark dark:bg-neutral-800 dark:text-white transition-all duration-800  hover:bg-rose-700 dark:hover:bg-rose-700">
      <MdOutlineNavigateNext />
      </button>
      </div>
    </div>
  );
};



