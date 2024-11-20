

'use server';
import api from '@/services/api';
import { setHeaders } from '@/actions/set-headers/set-headers.action';

export const saveCreateLead = async (name: string, phoneNumber: string, email: string, config_id: string,dialog:any) => {
  try {
  
    const formattedData = {
      name: name,
      phone: phoneNumber,
      email: email,
      config_id: config_id,
      dialog: dialog, 
    };
console.log(formattedData,'dados para slavar');
    await setHeaders();
    const response = await api.post(`/leads-start-template`, formattedData);
    console.log('Lead-ID', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return {
      error: "Falha ao processar sua requisição"
    };
  }
};
