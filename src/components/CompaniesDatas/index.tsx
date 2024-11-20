'use client';

import { useState, useEffect } from "react";
import type { Empresa } from "@/types/empresa";
import { UserType } from "@/types";
import { Lead } from "@/types/leads/leads";
import ProfileCompany from "./ProfileCompany";
import GraficosLeeads from "@/components/CompaniesDatas/GraficLeadsComapnie";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DateFilter from "@/components/CompaniesDatas/DatePickerLead";
import { getCompanyUnitiesAction } from "@/actions/companies/get-company-unities.action";

interface CompaniesDatasProps {
  botId: string;
  userData: UserType;
}

export default function CompaniesDatas({ botId, userData }: CompaniesDatasProps) {
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [companyData, setCompanyData] = useState<Empresa | null>(null);
  const [leadData, setLeadData] = useState<Lead[]>([]);
  const [leadsChart, setLeadsChart] = useState<any>(null);
  const [leadsMessages, setLeadsMessages] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchingData, setFetchingData] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setFetchingData(true); // Set fetching data to true
      setError(null);

      try {
        const data = await getCompanyUnitiesAction(botId, startDate, endDate);
        if (data.error) {
          setError(data.error);
          setCompanyData(null);
        } else {
          setCompanyData(data.company.companyUnity);
          setLeadData(data.company.charts);
          setLeadsChart(data.company.countLeads);
          setLeadsMessages(data.company.messages);
        }
      } catch (error) {
        setError("Erro ao buscar dados da empresa");
        setCompanyData(null);
      } finally {
        setLoading(false);
        setFetchingData(false); // Set fetching data to false
      }
    };

    fetchData();
  }, [botId, startDate, endDate]);

  const handleFetchData = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleResetFilters = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-6">
    
      <DateFilter onFetchData={handleFetchData} onResetFilters={handleResetFilters} fetchingData={fetchingData} />
      {error && <div>{error}</div>}
      {companyData ? (
        <>
          <ProfileCompany companyData={companyData} userData={userData} />
          <GraficosLeeads companyData={companyData} leadData={leadData} leadsChart={leadsChart} messageData={leadsMessages} userData={userData} />
    
        </>
      ) : (
        !fetchingData && <div className="p-4 text-white dark:text-gray-400">No data available</div>
      )}
    </div>
  );
}

