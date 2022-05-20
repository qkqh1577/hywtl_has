export type BusinessManagerView = {
  name?: string;
  jobTitle?: string;
  mobilePhone?: string;
  officePhone?: string;
  email?: string;
  meta?: string[];
  status?: string;
}

export type BusinessView = {
  name: string;
  representativeName?: string;
  registrationNumber: string;
  address?: string;
  zipCode?: string;
  officePhone?: string;
  memo?: string;
  managerList?: BusinessManagerView[]
};
