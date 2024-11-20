"use server"
import { CardHome } from "@/components/DataHome/card-home.component";
// import { getCompaniesAction } from "@/actions/companies/get-companies.action";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export default async function Dashboard() {
  // const companiesList = await getCompaniesAction();
  // const CountMessage = companiesList.globalMessageCounts;

  // if ("error" in companiesList) {
  //   return (
  //     <div className="ml-4  mr-4 p-4 rounded-lg bg-rose-700 mt-14 flex justify-center items-center">
  //       <span className="text-white dark:text-white">Error: Usuário não autenticado</span>
  //     </div>
  //   );
  // }

  return (
    <>
      <Breadcrumb pageName="layout" />
      <main className="flex min-h-screen flex-col items-start justify-start px-24 py-2 bg-gray-100 dark:bg-darkBlue">

        {/* {companiesList ? (
          <CardHome globalMessageCounts={CountMessage} type="sei la" name='fernando' placeholder="oiiiiii" classname="bg-rose-500" />
        ) : (
          <div className="p-5 bg-darkBlue/15">
            <span className="text-white dark:text-white">Error: Usuário não autenticado</span>
          </div>
        )} */}
        <CardHome type="sei la" name='fernando' placeholder="oiiiiii" classname="bg-rose-500" />

      </main>
    </>
  );
}




