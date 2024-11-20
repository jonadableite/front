'use server';
import api from '@/services/api';
import { setHeaders } from '@/actions/set-headers/set-headers.action';

export const getCompaniesPaginateAction = async (skip:number=1, limit:number=100) => {
    try {
      await setHeaders();
      const { data } = await api.get(`companies/paginate?page=${skip}&take=${limit}`);
      return data;
    } catch (error) {
      console.error(error);
      return {
        error: "Falha ao processar sua requisição"
      };
    }
  };