'use client';

import ListCompanyAll from '@/components/company-all/company-list-item-all.component';
import { Empresa } from '@/types/empresa';
import { useEffect, useState } from 'react';

export default function ListCompanies() {
  const [companiesList, setCompaniesList] = useState<Empresa[]>([]);
  const [name, setName] = useState('');
  const [active, setActive] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchCompanies = async () => {
    try {
      const response = await fetch('https://api.whatlead.com.br/companies');
      if (response.ok) {
        const data = await response.json();
        setCompaniesList(data);
      } else {
        setError('Failed to fetch companies');
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
      setError('An error occurred while fetching companies');
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const createCompany = async () => {
    setError('');
    setSuccess('');

    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndoYXRsZWFkLmNvbS5ickBnbWFpbC5jb20iLCJzdWIiOiI2NmRlNjY4ODQ3ZTFkNjY0ZjYxZDU4NGQiLCJpYXQiOjE3MjU4NTYxNjUsImV4cCI6MTcyNTg1OTc2NX0.gTRvZOjGhJWgHWZudYhTBl-ddeIfsJO89P7cFPPuRdQ';

    try {
      const response = await fetch('https://api.whatlead.com.br/companies', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          active: active,
        }),
      });

      if (response.ok) {
        setSuccess('Company created successfully!');
        setName('');
        setActive(true);
        fetchCompanies();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to create company');
      }
    } catch (error) {
      console.error('Error creating company:', error);
      setError('An error occurred while creating the company');
    }
  };

  return (
    <>
      <div
        className="dark:bg-darkBlue bg-slate-50 text-white p-8 min-h-[100vh]"
        suppressHydrationWarning
      >
        <div className="flex flex-col justify-center m-2 p-4 bg-white dark:bg-roxouro1 border border-neutral-200 dark:border-darkBlue/30 shadow-md hover:shadow-lg rounded-2xl h-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex flex-col">
                <div className="font-medium leading-none text-rose-700">
                  Companies empreendimento
                </div>
                <p className="text-sm text-neutral-400 dark:text-gray-100 leading-none mt-1">
                  Visualização de empreendimento disponíveis na plataforma.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulário para criação de empresa */}
        <div className="p-4 bg-white dark:bg-roxouro1 border border-neutral-200 dark:border-darkBlue/30 shadow-md rounded-2xl mt-4">
          <h2 className="text-xl mb-4">Criar Nova Empresa</h2>
          <div>
            <input
              type="text"
              className="p-3 mb-2 border rounded-lg shadow-inner bg-gray-50 dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Nome da Empresa"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2 flex items-center">
            <label className="mr-2 text-gray-700 dark:text-gray-300">
              Ativa:
            </label>
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500 transition duration-150 ease-in-out"
            />
          </div>
          <button
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
            onClick={createCompany}
          >
            Criar Empresa
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}
        </div>

        {/* Listagem das empresas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
          {companiesList.length > 0 &&
            companiesList.map((item: Empresa) => (
              <ListCompanyAll key={`company-${item.id}`} data={item} />
            ))}
        </div>
      </div>
    </>
  );
}
