export type ManagerView = {
  name?: string;
  position?: string;
  mobile?: string;
  phone?: string;
  email?: string;
  meta?: string[];
  state?: string;
}


export type CompanyView = {
  name: string;
  representativeName?: string;
  companyNumber: string;
  address?: string;
  zipCode?: string;
  phone?: string;
  memo?: string;
  managerList?: ManagerView[]
};
