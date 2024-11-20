import type { InvestmentType } from './investment.type'
export type UserWithInvestmentsType = {
  id: number;
  name: string;
  email: string;
  phone:string;
  rule:string;
  investments: Array<InvestmentType>; 
  bitcoin_key?: string | null;
  created_at: Date;
  active:number;
}