
'use server';
import api from '@/services/api';
import { setHeaders } from '@/actions/set-headers/set-headers.action';
import axios from 'axios';

export const saveMessageManual = async (phone:string,message:string,companyDetails:string) => {
  try {
 //console.log(message,'MESSAGE',phone,'phone',companyDetails,'INSTANCIA')
 const requestData = {
    number: `55${phone}`,
    options: {
      delay: 1200,
      presence: 'composing',
      linkPreview: false
    },
    textMessage: {
      text: message
    }
  };

 
      await setHeaders();
      //response = await api.patch(`/companies-unities/${intentId}`, requestData);
    const response =  await axios.post(`${process.env.NEXT_MESSAGE_API_URL}/message/sendText/${companyDetails}`, requestData,
//http://localhost:8080/message/sendText/Marketing3SD'
    {
        headers: {
          'Content-Type': 'application/json',
          apikey: process.env.NEXT_MESSAGE_API_KEY,
        },
      },
    );
      //console.log(response.data,'teste')
      return response.data;
  } catch (error) {
    console.error(error);
    return {
      error: "Falha ao processar sua requisição"
    };
  }
};
