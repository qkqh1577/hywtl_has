export type ManagerView = {
  id?: number;
  name?: string;
  position?: string;
  mobile?: string;
  phone?: string;
  email?: string;
  meta?: string[];
  state?: string;
}

export const initManagerView: ManagerView[] = [{
  id: undefined,
  name: '',
  position: '',
  mobile: '',
  phone: '',
  email: '',
  meta: [''],
  state: '재직',
}]


export type CompanyView = {
  name: string;
  representativeName?: string;
  companyNumber: string;
  address?: string;
  zipCode?: string;
  phone?: string;
  memo?: string;
  managerList?: ManagerView[]
};

export const initCompanyView: CompanyView = {
  name: '',
  representativeName: '',
  phone: '',
  companyNumber: '',
  address: '',
  zipCode: '',
  memo: '',
  managerList: [{
    name: '',
    position: '',
    mobile: '',
    phone: '',
    email: '',
    meta: [''],
    state: ''
  }]
}
