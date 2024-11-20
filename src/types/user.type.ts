export type UserType = {
  //company: any;
 
  id: string,
  name: string;
  email: string;
  profile: string;
  phone: string;
  active: Boolean;
  createdAt?:Date ;
  updatedAt?:Date;
  aceleraCompanyId: string;
  company?: any | undefined;
}