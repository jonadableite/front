
'use client';
import api from '@/services/api';
import { setHeaders } from '@/actions/set-headers/set-headers.action';

export const EditComapanyTemplateOneUniti = async (
    companyId: string,
    name: string,
    image: string,
    content: string,
    enabled?: boolean,
    enable_to_send_us_to_lead?: boolean,
    message_per_runs?: { id_name: string; amount_per_run: number }[]
  ) => {
    try {
      let formattedData: any = {};
  
      // Verifica se os dados do template estão definidos
      if (name !== undefined && image !== undefined && content !== undefined) {
        formattedData.templatelistvars = [
          {
            name: name,
            image: image,
            content: content,
          },
        ];
      }
  
      // Verifica se dados adicionais da empresa estão definidos
      if (enabled !== undefined && enable_to_send_us_to_lead !== undefined) {
        formattedData.enabled = enabled;
        formattedData.enable_to_send_provider = enable_to_send_us_to_lead;
      }
  
     // Verifica se os dados de message_per_runs estão definidos
    if (message_per_runs !== undefined) {
        formattedData.message_per_runs = message_per_runs;
      }

    console.log(companyId,'id', name,'intentname',image,content)

      await setHeaders();
      const response = await api.patch(`/companies-unities/companyUnitglobal/${companyId}`, formattedData);
      console.log(response.data,'teste')
    return response.data;
  } catch (error) {
    console.error(error);
    return {
      error: "Falha ao processar sua requisição"
    };
  }
};
