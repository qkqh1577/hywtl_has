export type BusinessQuery = {
  page: number;
  size: number;
  sort: string;
  keywordType?: string;
  keyword?: string;
}

export type BusinessQueryForModal = {
  keywordType?: string;
  keyword?: string;
}

export type BusinessManagerAddParameter = {
  id?: number;
  name?: string;
  position?: string;
  mobile?: string;
  phone?: string;
  email?: string;
  meta?: string[];
  state?: string;
}

export type BusinessAddParameter = {
  name: string;
  representativeName?: string;
  officePhone?: string;
  registrationNumber: string;
  address?: string;
  zipCode?: string;
  memo?: string;
  managerList?: BusinessManagerAddParameter[];
}

export type BusinessChangeParameter = {
  id: number
  name: string;
  representativeName?: string;
  officePhone?: string;
  registrationNumber: string;
  address?: string;
  zipCode?: string;
  memo?: string;
  managerList?: BusinessManagerAddParameter[];
}
