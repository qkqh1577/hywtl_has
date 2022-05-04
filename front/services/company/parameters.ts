export type CompanyQuery = {
  page: number;
  size: number;
}

export type ManagerAddParameter = {
  name?: string;
  position?: string;
  mobile?: string;
  phone?: string;
  email?: string;
  meta?: string[];
  state?: boolean;
}

export type CompanyAddParameter = {
  name: string;
  representativeName?: string;
  phone?: string;
  companyNumber: string;
  address?: string;
  zipCode?: string;
  memo?: string;
  managerList?: ManagerAddParameter[];
}