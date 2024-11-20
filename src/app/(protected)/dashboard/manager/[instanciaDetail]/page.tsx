"use server";

import CompaniesDatas from "@/components/CompaniesDatas";
import { Fragment } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DataInstancia from "@/components/Manager/DataInstancia";
import { getAuthenticatedAction } from "@/actions/users/get-authenticated.action";

interface CompanyDetailsProps {
  params: {
    instanciaDetail: string;
  };
}
export default async function InstanciaDetailsPage({
  params,
}: CompanyDetailsProps) {
  const instance = params.instanciaDetail;
  const userData = await getAuthenticatedAction();
  return (
    <>
      <Breadcrumb pageName="layout" />

      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        {instance ? (
          <DataInstancia instanciaName={instance} />
        ) : (
          <div>Error: Intancias não autenticado</div>
        )}
      </div>
    </>
  );
}
