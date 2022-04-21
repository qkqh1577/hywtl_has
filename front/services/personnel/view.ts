import FileItem from 'services/common/file-item/entity';
import { ListDepartment } from 'services/department/entity';

export type PersonnelBasicView = {
  engName: string;
  birthDate: Date | null;
  sex: string;
  image?: FileItem;
  address: string;
  phone: string;
  emergencyPhone: string;
  relationship: string;
  personalEmail: string;
}

export type PersonnelCompanyView = {
  hiredDate: Date | null;
  hiredType: string;
  recommender: string;
}

export type PersonnelJobView = {
  department: ListDepartment | null;
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
  startDate: Date | null;
  endDate: Date | null;
}

export type PersonnelCareerView = {
  companyName: string;
  startDate: Date | null;
  endDate: Date | null;
  majorJob: string;
}

export type PersonnelLicenseView = {
  name: string;
  type: string;
  organizationName: string;
  qualifiedNumber: string;
  qualifiedDate: Date | null;
  memo: string;
}

export type PersonnelLanguageView = {
  name: string;
  type: string;
  grade: string;
  organizationName: string;
  certifiedDate: Date | null;
  expiryPeriod: string;
  trainingPeriod: string;
}

export type PersonnelView = {
  basic: PersonnelBasicView,
  company: PersonnelCompanyView,
  jobList: PersonnelJobView[];
  academicList: PersonnelAcademicView[];
  careerList: PersonnelCareerView[];
  licenseList: PersonnelLicenseView[];
  languageList: PersonnelLanguageView[];
};

export const initBasicView: PersonnelBasicView = {
  engName: '',
  birthDate: null,
  sex: '',
  address: '',
  phone: '',
  emergencyPhone: '',
  relationship: '',
  personalEmail: '',
};

export const initCompanyView: PersonnelCompanyView = {
  hiredDate: null,
  hiredType: '',
  recommender: '',
};

export const initJobView: PersonnelJobView = {
  department: null,
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
  startDate: null,
  endDate: null,
  state: '',
};

export const initCareerView: PersonnelCareerView = {
  companyName: '',
  startDate: null,
  endDate: null,
  majorJob: '',
};

export const initLicenseView: PersonnelLicenseView = {
  name: '',
  type: '',
  organizationName: '',
  qualifiedNumber: '',
  qualifiedDate: null,
  memo: '',
};

export const initLanguageView: PersonnelLanguageView = {
  name: '',
  type: '',
  grade: '',
  organizationName: '',
  certifiedDate: null,
  expiryPeriod: '',
  trainingPeriod: '',
};

export const initView: PersonnelView = {
  basic: initBasicView,
  company: initCompanyView,
  jobList: [initJobView],
  academicList: [initAcademicView],
  careerList: [initCareerView],
  licenseList: [initLicenseView],
  languageList: [initLanguageView],
};
