import type { UserType } from './user.type'
import type { InvestmentType } from './investment.type'

export type PagePropsType = {
  userData: UserType;
  investments: Array<InvestmentType>;
};