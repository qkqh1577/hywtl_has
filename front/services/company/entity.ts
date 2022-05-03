export type CompanyBasic = {
  name: string;
  representativeName?: string;
  companyNumber?: string;
  address?: string;
  zipCode?: string;
  phone?: string;
  memo?: string;
}

export type ListCompany = {
  id: number;
  name: string;
  representativeName?: string;
  companyNumber?: string;
  address?: string;
  phone?: string;
  managerCount: number;
  memo?: string;
}

type Company = {
  id: number;
  basic: CompanyBasic;
}

export default Company;