export type CompanyQuery = {
  page: number;
  size: number;
  sort: string;
  keywordType?: string;
  keyword?: string;
}

export type ManagerAddParameter = {
  id?: number;
  name?: string;
  position?: string;
  mobile?: string;
  phone?: string;
  email?: string;
  meta?: string[];
  state?: string;
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

export type CompanyChangeParameter = {
  id: number
  name: string;
  representativeName?: string;
  phone?: string;
  companyNumber: string;
  address?: string;
  zipCode?: string;
  memo?: string;
  managerList?: ManagerAddParameter[];
}