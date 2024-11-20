
import ListCompaniesUnit from "@/components/company-all/companie-uniti/companies-unit";
import { Fragment } from "react";
import { getCompanyUnitiesAction } from "@/actions/companies/get-company-unities.action";
import { getLeadsIdCompanyUnitiesAction } from "@/actions/leads/get-leads-Id-company-unities.action";

import { Lead } from "@/types/leads/leads";
import LeadIdMessageCompanie from "@/components/CompaniesDatas/Leads-list-company/LeadIdMessageCompanie";

import { UserType } from "@/types";
interface CompanyDetailsProps {
  params: {
    lead_id: string;
  };
 
}

export default async function BotLeadDetails({params }: CompanyDetailsProps) {
  const lead : Lead= await getLeadsIdCompanyUnitiesAction(params.lead_id);
  return (
    <Fragment>
      <LeadIdMessageCompanie leadsData={lead}/>

    </Fragment>
  );
}
