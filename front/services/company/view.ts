export type ManagerView = {
  name?: string,
  position?: string,
  mobile?: string,
  phone?: string,
  email?: string,
  state?: boolean
}

export const initManagerView: ManagerView[] = [{
  name: '',
  position: '',
  mobile: '',
  phone: '',
  email: '',
  state: true,
}]


export type CompanyView = {
  name: string,
  representativeName?: string,
  companyNumber?: string,
  address?: string,
  zipCode?: string,
  phone?: string,
  memo?: string,
  managerList?: ManagerView[]
};

export const initCompanyView: CompanyView = {
  name: '',
  representativeName: '',
  companyNumber: '',
  address: '',
  zipCode: '',
  phone: '',
  memo: '',
  managerList: [{
    name: '',
    position: '',
    mobile: '',
    phone: '',
    email: '',
    state: true
  }]
}
