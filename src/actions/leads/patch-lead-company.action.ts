
'use server';
import api from '@/services/api';
import { setHeaders } from '@/actions/set-headers/set-headers.action';

export const EditLeadId = async (leadId: string, status: string,curationData:any) => {
  try {
 console.log(leadId,'id', status,'intentname')
    const formattedData = {
       status:status,
       ...curationData,
      };

//console.log(formattedData,'vai para api')
      await setHeaders();
      const response = await api.patch(`/leads/${leadId}`, formattedData);
      console.log( 'Lead-ID',response.data.id,'alterado estatus do lead-',response.data.status)
    return response.data;
  } catch (error) {
    console.error(error);
    return {
      error: "Falha ao processar sua requisição"
    };
  }
};
