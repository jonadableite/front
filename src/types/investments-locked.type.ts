import type { UserType } from "@/types"

export type InvestmentsLockedType = {
  id: number;
  user_id: number;
  name: string;
  price: string;
  percentage: number;
  data_final: string;
  active: number;
  created_at: string;
  updated_at: string;
  user: UserType
}