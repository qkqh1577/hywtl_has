import FileItem from 'services/common/file-item/entity';

export type PersonnelBasicView = {
  engName: string;
  birthDate: Date | '';
  sex: string;
  image?: FileItem;
  address: string;
  phone: string;
  emergencyPhone: string;
  relationship: string;
  personalEmail: string;
}

export type PersonnelCompanyView = {
  hiredDate: Date | '';
  hiredType: string;
  recommender: string;
}

export type PersonnelJobView = {
  departmentId: number | '';
  jobTitle: string;
  jobType: string;
  jobPosition: string;
  jobClass: string;
  jobDuty: string;
}

export type PersonnelAcademicView = {
  academyName: string;
  major: string;
  degree: string;
  state: string;
  grade: string;
  startDate: Date | '';
  endDate: Date | '';
}

export type PersonnelCareerView = {
  companyName: string;
  startDate: Date | '';
  endDate: Date | '';
  majorJob: string;
}

export type PersonnelLicenseView = {
  name: string;
  type: string;
  organizationName: string;
  qualifiedNumber: string;
  qualifiedDate: Date | '';
  memo: string;
}

export type PersonnelView = {
  basic: PersonnelBasicView,
  company: PersonnelCompanyView,
  jobList: PersonnelJobView[];
  academicList: PersonnelAcademicView[];
  careerList: PersonnelCareerView[];
  licenseList: PersonnelLicenseView[];
};

export const initBasicView: PersonnelBasicView = {
  engName: '',
  birthDate: '',
  sex: '',
  address: '',
  phone: '',
  emergencyPhone: '',
  relationship: '',
  personalEmail: '',
};

export const initCompanyView: PersonnelCompanyView = {
  hiredDate: '',
  hiredType: '',
  recommender: '',
};

export const initJobView: PersonnelJobView = {
  departmentId: '',
  jobTitle: '',
  jobType: '',
  jobPosition: '',
  jobClass: '',
  jobDuty: ''
};

export const initAcademicView: PersonnelAcademicView = {
  academyName: '',
  major: '',
  degree: '',
  grade: '',
  startDate: '',
  endDate: '',
  state: '',
};

export const initCareerView: PersonnelCareerView = {
  companyName: '',
  startDate: '',
  endDate: '',
  majorJob: '',
};

export const initLicenseView: PersonnelLicenseView = {
  name: '',
  type: '',
  organizationName: '',
  qualifiedNumber: '',
  qualifiedDate: '',
  memo: '',
};

export const initView: PersonnelView = {
  basic: initBasicView,
  company: initCompanyView,
  jobList: [initJobView],
  academicList: [initAcademicView],
  careerList: [initCareerView],
  licenseList: [initLicenseView],
};
