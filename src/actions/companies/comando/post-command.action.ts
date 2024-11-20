
'use client';
import api from '@/services/api';
import { setHeaders } from '@/actions/set-headers/set-headers.action';

export const saveCommandMessage = async (name: string, descritivo: string) => {
  try {
 console.log(name,'id', descritivo,'intentname')
    const formattedData = {
        name:name,
        descritivo:descritivo
      };
      console.log(formattedData,'intentname')
      await setHeaders();
      const response = await api.post(`/command-messages`, formattedData);
      console.log(response.data,'teste')
    return response.data;
  } catch (error) {
    console.error(error);
    return {
      error: "Falha ao processar sua requisição"
    };
  }
};
