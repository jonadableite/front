'use server';
import api from '@/services/api';
import { setHeaders } from '@/actions/set-headers/set-headers.action';

export const getFullCompanyUnitiesAction = async (id:string, type: string = 'full') => {
    try {
      await setHeaders();
      const { data } = await api.get(`companies-unities/${id}`, {
        params: { type }
      });
   
     
      return data; 
    } catch (error) {
      console.error(error);
      return {
        error: "Falha ao processar sua requisição"
      };
    }
  };