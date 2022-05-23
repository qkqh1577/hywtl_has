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

export type BusinessManagerParameter = {
  id?: number;
  name?: string;
  jobTitle?: string;
  mobilePhone?: string;
  officePhone?: string;
  email?: string;
  meta?: string[];
  status?: string;
}

export type BusinessAddParameter = {
  name: string;
  representativeName?: string;
  officePhone?: string;
  registrationNumber: string;
  address?: string;
  zipCode?: string;
  memo?: string;
  managerList?: BusinessManagerParameter[];
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
  managerList?: BusinessManagerParameter[];
}

export type BusinessRegistrationNumberCheckParameter = {
  registrationNumber: string;
  id?: number;
}
