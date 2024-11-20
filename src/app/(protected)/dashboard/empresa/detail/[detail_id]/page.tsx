"use server";
import { Fragment } from "react";
import { getCompanyUnitiesAction } from "@/actions/companies/get-company-unities.action";
import CompaniesDatas from "@/components/CompaniesDatas";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ConfigurationCompany from "@/components/CompaniesDatas/ConfigurationCompany/configutationList";
import { getAuthenticatedAction } from "@/actions/users/get-authenticated.action";
import { getLeadsChartsDataCompanyUnitiesAction } from "@/actions/leads/get-leads-charts-Date-company-unities.action";
interface CompanyDetailsProps {
  params: {
    detail_id: string;
  };
}

export default async function DetailsCompanyBot({
  params,
}: CompanyDetailsProps) {
  const company = await getCompanyUnitiesAction(params.detail_id);
  const userData = await getAuthenticatedAction();

  return (
    <Fragment>
      {userData ? (
        company ? (
          <div className="mx-auto max-w-screen-2xl p-4 md:p-4 2xl:p-4 ">
            <ConfigurationCompany companyData={company} userData={userData} />
          </div>
        ) : (
          <div>Error: Usuário não autenticado</div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </Fragment>
  );
}
