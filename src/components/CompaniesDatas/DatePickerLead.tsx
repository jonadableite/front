'use client';

import { useState, useEffect } from "react";

interface DateFilterProps {
  onFetchData: (start: string, end: string) => void;
  onResetFilters: () => void;
  fetchingData: boolean;
}

export default function DateFilter({ onFetchData, onResetFilters, fetchingData }: DateFilterProps) {
  const today = new Date().toISOString().split('T')[0];
  const [tempStartDate, setTempStartDate] = useState<string | undefined>(undefined);
  const [tempEndDate, setTempEndDate] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (tempStartDate && tempEndDate) {
      onFetchData(tempStartDate, tempEndDate);
    }
  }, [tempStartDate, tempEndDate]);

  const handleResetClick = () => {
    setTempStartDate(undefined);
    setTempEndDate(undefined);
    onResetFilters();
  };

  return (
   
    <div className="flex flex-row items-center mt-2 px-12 gap-10">
      <div className="relative max-w-sm">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </div>
        <input
          type="date"
          id="startDate"
          value={tempStartDate || today}
          onChange={(e) => setTempStartDate(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Select date"
        />
      </div>

      <div className="relative max-w-sm">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </div>
        <input
          type="date"
          id="endDate"
          value={tempEndDate || today}
          onChange={(e) => setTempEndDate(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Select date"
        />
      </div>
      <div className="relative flex h-[36px] gap-6">
       
        <button
          onClick={handleResetClick}
          disabled={fetchingData}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-900 focus:outline-none focus:bg-gray-600"
        >
          Reset
        </button>
      </div>
      <div className="w-full bg-rose-500 text-white rounded-md"> {fetchingData && <span className="text-sm text-gray-700">Buscando...</span>}</div>
    </div>
   
    
  );
}

