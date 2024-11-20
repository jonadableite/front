// pages/dashboard/empresa/bot/[bot_id].tsx
// pages/dashboard/empresa/bot/[bot_id].tsx
// pages/dashboard/empresa/bot/[bot_id].tsx
'use client';
'use client';

import { useEffect, useState } from "react";
import CompaniesDatas from "@/components/CompaniesDatas";
import { getAuthenticatedAction } from "@/actions/users/get-authenticated.action";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

interface CompanyDetailsProps {
  params: {
    bot_id: string;
  };
}

export default function BotDetails({ params }: CompanyDetailsProps) {
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getAuthenticatedAction();
        setUserData(data);
      } catch (error) {
        setError("Erro ao buscar dados do usuário");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Breadcrumb pageName="layout" />
      {userData ? (
        <CompaniesDatas botId={params.bot_id} userData={userData} />
      ) : (
        <div>Loading...</div>
      )}
      {error && <div>{error}</div>}
    </div>
  );
}
