import { Metadata } from "next";

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

import FormTriggerInstance from "@/components/Manager/form/formTrigger";
import { getAuthenticatedAction } from "@/actions/users/get-authenticated.action";

export const metadata: Metadata = {

  title: "Pagina de  | instancia Dashboard WhatLeads",
  description: "WhatLeads instancia envio de mensagem WhatsApp",
  // other metadata
};

export default async function ManagerTriggerInstance() {
  const userData = await getAuthenticatedAction();

  return (
    <>
      <Breadcrumb pageName="layout" />
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <>
          <FormTriggerInstance userData={userData} />
        </>

      </div>
    </>
  );
}
