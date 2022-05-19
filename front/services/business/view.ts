export type BusinessManagerView = {
  name?: string;
  jobTitle?: string;
  mobilePhone?: string;
  phone?: string;
  email?: string;
  meta?: string[];
  state?: string;
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
