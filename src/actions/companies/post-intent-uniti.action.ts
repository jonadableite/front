
'use client';
import api from '@/services/api';
import { setHeaders } from '@/actions/set-headers/set-headers.action';

export const saveMessageEdit = async (intentId: string, intentName: string, messages: any) => {
  try {
 console.log(intentId,'id', intentName,'intentname', messages,'mensage,')
    const formattedData = {
        "meta_configuration": {
          "messages_by_intent": {
            [intentName]:messages
          }
        }       
      };
    // const formattedData = {
    //     meta_configuration: {
    //       messages_by_intent: {
    //         [intentName]: [
    //           ...(messages_by_intent[intentName] || []), // Se já houver mensagens para essa intenção, adicione-as
    //           ...messages // Adicione as novas mensagens
    //         ]
    //       }
    //     }
    //   };

      await setHeaders();
      const response = await api.patch(`/companies-unities/${intentId}`, formattedData);
      console.log(response.data,'teste')
    return response.data;
  } catch (error) {
    console.error(error);
    return {
      error: "Falha ao processar sua requisição"
    };
  }
};
