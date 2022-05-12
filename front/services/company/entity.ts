export type CompanyList = {
  id: number;
  name: string;
  representativeName?: string;
  companyNumber?: string;
  address?: string;
  phone?: string;
  managerCount: number;
  memo?: string;
}

export type ManagerDetail = {
  id?: number;
  name?: string;
  position?: string;
  mobile?: string;
  phone?: string;
  email?: string;
  meta?: string[];
  state?: string;
  projectCount?: number;
}

type CompanyDetail = {
  name: string;
  representativeName?: string;
  companyNumber: string;
  address?: string;
  zipCode?: string;
  phone?: string;
  memo?: string;
  managerList?: ManagerDetail[];
}

type Manager = {
  name?: string;
  position?: string;
  mobile?: string;
  phone?: string;
  email?: string;
  meta?: string[];
  state?: string;
}

export type Company = {
  id: number,
  name: string;
  representativeName?: string;
  phone?: string;
  companyNumber: string;
  address?: string;
  zipCode?: string;
  memo?: string;
  ManagerList: Manager[];
}

export default CompanyDetail;