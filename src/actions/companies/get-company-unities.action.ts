'use server';
import api from '@/services/api';
import { setHeaders } from '@/actions/set-headers/set-headers.action';

export const getCompanyUnitiesAction = async (botId: string, startDate?: string, endDate?: string) => {
    try {
      await setHeaders();
      // const { data } = await api.get(`companies-unities/bot/${id}`);
    
          const { data } = await api.get(`companies-unities/botData/${botId}`, {
            params: {
              startDate,
              endDate
            }
          });
          
      //const { data } = await api.get(`companies-unities/${id}`);
     
      return data; 
    } catch (error) {
      console.error(error);
      return {
        error: "Falha ao processar sua requisição"
      };
    }
  };
  