"use server";
import axios from "axios";
import type { Instancia } from "@/types/instancia/instancia";

export const GetInstancesAction = async () => {
  try {
    const response = await axios.get<Instancia[]>(
      `https://evo.whatlead.com.br/instance/fetchInstances/instance/fetchInstances`,
      {
        headers: {
          "Content-Type": "application/json",
          apikey: `B6D711FCDE4D4FD5936544120E713976`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar instâncias:", error);
    //throw new Error("Erro ao buscar instâncias");
  }
};
