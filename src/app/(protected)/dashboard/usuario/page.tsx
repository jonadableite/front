import { Metadata } from "next";

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Instancias from "@/components/Manager/instancias";
import ListUser from "@/components/user/ListUsers"
import { getAuthenticatedAction } from "@/actions/users/get-authenticated.action";

export const metadata: Metadata = {

  title: "Pagina de  | instancia Dashboard WhatLeads",
  description: "SUA DESCRIPTION META",
  // other metadata
};

export default async function Usuario() {
  const userData = await getAuthenticatedAction();

  return (
    <>
      <Breadcrumb pageName="layout" />
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">

        <ListUser />

      </div>
    </>
  );
}
