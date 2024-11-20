
import MessageLeadCompanie from "@/components/CompaniesDatas/Leads-list-company/MessageLeadCompanie";
import { Lead } from "@/types/leads/leads";
import { getLeadsPosCompanyUnitiesAction } from "@/actions/leads/get-leads-pos-company-unities.action";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";


interface CompanyDetailsProps {
  params: {
    bot_id: string;
  };
}

export default async function ListLead({ params }: CompanyDetailsProps) {
  const companyData = await getLeadsPosCompanyUnitiesAction(params.bot_id);

 function renderComponentOrPlaceholder(companyData: { leads: Lead[] } | null) {
  if (companyData) {
    return (
    <>
    <Breadcrumb pageName="layout" />
    <MessageLeadCompanie leadsData={companyData}/>;
    </>
   )
  } else {
    return <span>Leads não encontrado</span>;
  }
}
  return (
    
     
     renderComponentOrPlaceholder(companyData)

     
  );
}
