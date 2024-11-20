'use server';
import api from '@/services/api';
import { setHeaders } from '@/actions/set-headers/set-headers.action';

export const getCompanyAction = async (id:string) => {
    try {
      await setHeaders();
      const { data } = await api.get(`companies/${id}`);
     
      return data; 
    } catch (error) {
      console.error(error);
      return {
        error: "Falha ao processar sua requisição"
      };
    }
  };
  