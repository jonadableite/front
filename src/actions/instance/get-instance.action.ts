'use server';
import type { Instancia } from '@/types/instancia/instancia';
import axios from 'axios';

export const GetInstancesAction = async () => {
  try {
    const response = await axios.get<Instancia[]>(
      `https://evo.whatlead.com.br/instance/fetchInstances/instance/fetchInstances`,
      {
        headers: {
          'Content-Type': 'application/json',
          apikey: `429683C4C977415CAAFCCE10F7D57E11`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar instâncias:', error);
    //throw new Error("Erro ao buscar instâncias");
  }
};
