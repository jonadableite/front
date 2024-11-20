"use client";
import api from "@/services/api";
import { setHeaders } from "@/actions/set-headers/set-headers.action";

export const EditComapanyUniti = async (
  companyId: string,
  enabled: boolean,
  enable_to_send_us_to_lead: boolean
) => {
  try {
    let formattedData = {};

    if (enabled !== undefined && enable_to_send_us_to_lead !== undefined) {
      formattedData = {
        enabled: enabled,
        enable_to_send_provider: enable_to_send_us_to_lead,
      };
    } else if (enabled !== undefined) {
      formattedData = {
        enabled: enabled,
      };
    } else if (enable_to_send_us_to_lead !== undefined) {
      formattedData = {
        enable_to_send_provider: enable_to_send_us_to_lead,
      };
    }

    await setHeaders();
    const response = await api.patch(
      `/companies-unities/companyUnit/${companyId}`,
      formattedData
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return {
      error: "Falha ao processar sua requisição",
    };
  }
};
