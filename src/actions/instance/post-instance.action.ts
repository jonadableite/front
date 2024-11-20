

import api from '@/services/api';
import { setHeaders } from '@/actions/set-headers/set-headers.action';

import axios from 'axios';
import { Dispatch } from 'react';
import type { Instancia } from "@/types/instancia/instancia";
interface CreateInstancesAction {
  type: string;
  payload?: Instancia[]; // Defina o tipo de dados esperado na resposta, se houver
}
//, onCreateSuccess: () => void) => async (dispatch: Dispatch<CreateInstancesAction>
//instanceName,token,qrcode
export const CreateInstancesAction = async (novaInstancia: string,token:string,qrcode:boolean) => {

 console.log(novaInstancia,'INSTANCIA',token,'TOKEN',qrcode,'dados')
  try {
//${process.env.NEXT_MESSAGE_API_URL}process.env.NEXT_MESSAGE_API_KEY
    const responseCreate = await axios.post<Instancia[]>(
      `${process.env.NEXT_MESSAGE_API_URL}/instance/create`,
      {
        instanceName: novaInstancia,
        token: token,
        qrcode: qrcode,
      },
      {
        headers: {
          "Content-Type": "application/json",
          apikey:`${process.env.NEXT_MESSAGE_API_KEY}`,
        },
      }
    );

   

    console.log(responseCreate.data);
    
  } catch (error) {
    console.error("Erro ao criar instância:", error);
    console.error("CREATE_INSTANCES_ERROR");
   
  } finally {
    console.error("Erro geral para criar a intencia",novaInstancia);
  }
};
