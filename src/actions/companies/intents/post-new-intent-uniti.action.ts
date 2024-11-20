"use client"
import api from '@/services/api';
import { setHeaders } from '@/actions/set-headers/set-headers.action';

export const InsertMessageSave = async (intentId: string,intentName:string, message: string, type: string) => {
  console.log(intentId,'entrada-api',intentName,'Name',message,'message',type,'index')
  try {
  
    // Definir o corpo da requisição DELETE com o índice da mensagem a ser excluída
    // const formattedData = {
    //   // intentName: intentName, // Passa o nome da intenção
    //   // index: index, // Passa o índice da mensagem a ser excluída
    //   "meta_configuration": {
    //     "messages_by_intent": {
    //       [intentName]:{content:message,type:type}
    //     }
    //     // intentName: intentName,
    //     // type: 'text'
    //   }
    
    // };
    let formattedData = {};

    // Verificar o tipo de conteúdo selecionado
    if (type === 'text') {
      // Se for texto, formatar o objeto message com a chave "content"
      formattedData = {
        meta_configuration: {
          messages_by_intent: {
            [intentName]: { content: message, type: type }
          }
        }
      };
    } else if (type === 'image') {
      // Se for imagem, formatar o objeto message com a chave "url"
      formattedData = {
        meta_configuration: {
          messages_by_intent: {
            [intentName]: { url: message, type: type }
          }
        }
      };
    }
    else if (type === 'document') {
      // Se for imagem, formatar o objeto message com a chave "url"
      formattedData = {
        meta_configuration: {
          messages_by_intent: {
            [intentName]: { url: message, type: type }
          }
        }
      };
    }else if (type === 'hold') {
      // Se for imagem, formatar o objeto message com a chave "url"
      const timeAsInt = parseInt(message, 10);
      formattedData = {
        meta_configuration: {
          messages_by_intent: {
            [intentName]: { time: timeAsInt , type: type }
          }
        }
      };
    }
    console.info(formattedData,'vai para api')
    // Definir os headers da requisição
    await setHeaders();

    //Enviar a requisição de exclusão da mensagem
    const response = await api.post(`/companies-unities/save/comando/${intentId}`, formattedData );
    console.log(response.data,'insert intent')
    return response.data;
      //Retornar os dados da resposta da API
  } catch (error) {
    console.error(error);
    return {
      error: "Falha ao processar sua requisição"
    };
  }
};
