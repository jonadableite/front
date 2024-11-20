'use server';

import { Fragment } from "react";
import { getCommandAction } from "@/actions/companies/comando/get-all-comando.action";
import { Comando } from "@/types/comando/comando";
import { CustomTableComando } from "@/components/CompaniesDatas/CommandMessage/ComandoList";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
export default async function ComandoMessages() {
  const commandData = await getCommandAction();
 

  function renderComponentOrPlaceholder(commandData: Comando[] | null) {
    if (commandData) {
      return  <CustomTableComando commandData={commandData} /> ;
      
    } else {
      return <span>Não encontrado</span>;
    }
  }

  return (
    <Fragment>
      <Breadcrumb pageName="layout" />
     
      {renderComponentOrPlaceholder(commandData)}
    </Fragment>
  );
}

