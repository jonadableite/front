
import ListCompaniesUnit from "@/components/company-all/companie-uniti/companies-unit";
import { Fragment } from "react";
import { getCompanyUnitiesAction } from "@/actions/companies/get-company-unities.action";
import CompaniesDatas from "@/components/CompaniesDatas";
import MessageIntentsCompanie from "@/components/CompaniesDatas/MessageIntentsCompanie";
import { Empresa } from "@/types/empresa";
import { UserType } from "@/types";
import { getAuthenticatedAction } from "@/actions/users/get-authenticated.action";
import { getFullCompanyUnitiesAction } from "@/actions/companies/get-full-companie-unities.action";

interface CompanyDetailsProps {
  params: {
    bot_id: string;
  };
 
}

export default async function Intents({ params }: CompanyDetailsProps) {
  const companyData = await getFullCompanyUnitiesAction(params.bot_id);

console.log(companyData,'dados da intencao')

function renderComponentOrPlaceholder(companyData: Empresa | null,) {
  if (companyData) {
    return <MessageIntentsCompanie intentsData={companyData}/>;
  } else {
    return <span>Não encontrado</span>;
  }
}

  return (
    renderComponentOrPlaceholder(companyData)
  );
}
