"use client"
import api from '@/services/api';
import { setHeaders } from '@/actions/set-headers/set-headers.action';

export const deleteMessageEdit = async (intentId: string, intentName: string, index: number) => {
  console.log(intentId,'entrada-api',intentName,'Name',index,'index')
  try {
  
    // Definir o corpo da requisição DELETE com o índice da mensagem a ser excluída
    const formattedData = {
      // intentName: intentName, // Passa o nome da intenção
      // index: index, // Passa o índice da mensagem a ser excluída
      
        intentName: intentName,
        index: index
    
    
    };
    console.info(formattedData,'vai para api')
    // Definir os headers da requisição
    await setHeaders();

    // Enviar a requisição de exclusão da mensagem
    const response = await api.patch(`/companies-unities/message/${intentId}`, formattedData );
    console.log(response.data,'DELETEI')
    //Retornar os dados da resposta da API
    return response.data;
  } catch (error) {
    console.error(error);
    return {
      error: "Falha ao processar sua requisição"
    };
  }
};
