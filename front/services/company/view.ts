export type CompanyBasicView = {
  name: string;
  representativeName?: string;
  companyNumber?: string;
  address?: string;
  zipCode?: string;
  phone?: string;
  memo?: string;
}

export const initCompanyBasicView = {
  name: '',
}

export type CompanyView = {
  basic: CompanyBasicView,
};

export const initView: CompanyView = {
  basic: initCompanyBasicView,
}