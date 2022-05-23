import { BusinessManagerStatus } from 'services/business/entity';

export type BusinessManagerView = {
  id?: number;
  name: string;
  jobTitle: string;
  mobilePhone: string;
  officePhone: string;
  email: string;
  meta: string;
  status: BusinessManagerStatus | '';
}

export type BusinessView = {
  name: string;
  representativeName: string;
  registrationNumber: string;
  address: string;
  zipCode: string;
  officePhone: string;
  memo: string;
  managerList: BusinessManagerView[];
};

export const initBusinessManagerView: BusinessManagerView = {
  name: '',
  jobTitle: '',
  mobilePhone: '',
  officePhone: '',
  email: '',
  meta: '',
  status: '',
};

export const initBusinessView: BusinessView = {
  name: '',
  representativeName: '',
  registrationNumber: '',
  address: '',
  zipCode: '',
  officePhone: '',
  memo: '',
  managerList: [initBusinessManagerView],
};
