
'use server';
import api from '@/services/api';
import { setHeaders } from '@/actions/set-headers/set-headers.action';
export const getIntentsAction = async () => {
    try {
      await setHeaders();
      const { data } = await api.get('Intentions');
      return data; 
    } catch (error) {
      console.error(error);
      return {
        error: "Falha ao processar sua requisição"
      };
    }
  };
  