import ListCompanies from "@/components/company-all/company-list-all.component";
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { Metadata } from "next";


export const metadata: Metadata = {
 
  title: "Profile Page | Next.js E-commerce Dashboard Template",
  description: "This is Profile page for TailAdmin Next.js",
  
};

export default function Empresa() {


  return (
    <>
    
      <ListCompanies/>
  </>
  );
}
