export type BusinessList = {
  id: number;
  name: string;
  representativeName?: string;
  registrationNumber: string;
  address?: string;
  officePhone?: string;
  managerCount: number;
  memo?: string;
}

export type BusinessManagerDetail = {
  id?: number;
  name?: string;
  jobTitle?: string;
  mobile?: string;
  phone?: string;
  email?: string;
  meta?: string[];
  state?: string;
  projectCount?: number;
}

export type BusinessDetail = {
  name: string;
  representativeName?: string;
  registrationNumber: string;
  address?: string;
  zipCode?: string;
  officePhone?: string;
  memo?: string;
  managerList?: BusinessManagerDetail[];
}

type BusinessManager = {
  name?: string;
  jobTitle?: string;
  mobile?: string;
  phone?: string;
  email?: string;
  meta?: string[];
  state?: string;
}

export type Business = {
  id: number,
  name: string;
  representativeName?: string;
  officePhone?: string;
  registrationNumber: string;
  address?: string;
  zipCode?: string;
  memo?: string;
  ManagerList?: BusinessManager[];
}
