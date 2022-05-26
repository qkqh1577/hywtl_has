export type BusinessManagerStatus = 'IN_OFFICE' | 'RESIGNATION' | 'LEAVE';

export type BusinessList = {
  id: number;
  name: string;
  representativeName?: string;
  registrationNumber: string;
  address?: string;
  officePhone?: string;
  managerCount: number;
  projectCount?: number;
  memo?: string;
}

export type BusinessManager = {
  id: number;
  name: string;
  jobTitle?: string;
  mobilePhone?: string;
  officePhone?: string;
  email?: string;
  meta?: string[];
  status: BusinessManagerStatus;
}

export type Business = {
  id: number;
  name: string;
  representativeName?: string;
  registrationNumber: string;
  address?: string;
  zipCode?: string;
  officePhone?: string;
  memo?: string;
  managerList: BusinessManager[];
}
