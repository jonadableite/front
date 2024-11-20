"use server"
import { Comando } from "@/types/comando/comando";
import ComandosMessageCompanie from "@/components/CompaniesDatas/CommandMessage/Comands";

export async function CustomTableComando({commandData}:{commandData:Comando[]}) {

  return (
    <>
      <div className=" text-black dark:text-white p-8">

        <div className="grid gap-4 grid-cols-1 md:grid-cols-1 m-1">
        {commandData ? (
       <ComandosMessageCompanie commandData={commandData} />
      ) : (
        <div>Error: Lista de comando não disponivel!</div>
      )}
        
        </div>
      </div>
    </>
  );
}
