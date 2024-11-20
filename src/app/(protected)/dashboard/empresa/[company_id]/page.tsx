"use server"

import ListCompaniesUnit from "@/components/company-all/companie-uniti/companies-unit";
import { Fragment } from 'react';
import { getCompanyAction } from "@/actions/companies/get-company.action";
import { getAuthenticatedAction } from "@/actions/users/get-authenticated.action";
import { UserType } from "@/types";
interface CompanyDetailsProps {
  params: {
    company_id: string;
  }
}

export default async function EmpresaDetails({ params } : CompanyDetailsProps){
  const company = await getCompanyAction(params.company_id);
  const userData = await getAuthenticatedAction();

  //
  return (
    <Fragment>

     
     {userData ? (
       <ListCompaniesUnit companyData={company} userData={userData} />
      ) : (
        <div>Error: Usuário não autenticado</div>
      )}
     

    </Fragment>  
  );
}



