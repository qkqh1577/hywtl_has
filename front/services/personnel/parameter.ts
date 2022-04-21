import FileItemParameter from 'services/common/file-item/parameter';

export type PersonnelBasicParameter = {
  engName: string;
  birthDate: string;
  sex: string;
  image?: FileItemParameter;
  address?: string;
  phone?: string;
  emergencyPhone?: string;
  relationship?: string;
  personalEmail?: string;
}

export type PersonnelCompanyParameter = {
  hiredDate: string;
  hiredType: string;
  recommender?: string;
}

export type PersonnelJobParameter = {
  departmentId: number;
  jobTitle: string;
  jobType: string;
  jobPosition: string;
  jobClass?: string;
  jobDuty?: string;
}

export type PersonnelAcademicParameter = {
  academyName: string;
  major: string;
  degree?: string;
  state: string;
  grade?: string;
  startDate: string;
  endDate: string;
}

export type PersonnelCareerParameter = {
  companyName: string;
  startDate: string;
  endDate: string;
  majorJob: string;
}

export type PersonnelLicenseParameter = {
  name: string;
  type?: string;
  organizationName: string;
  qualifiedNumber: string;
  qualifiedDate: string;
  memo?: string;
}

export type PersonnelLanguageParameter = {
  name: string;
  type: string;
  grade?: string;
  organizationName: string;
  certifiedDate: string;
  expiryPeriod?: string;
  trainingPeriod?: string;
}

export type PersonnelParameter = {
  id: number;
  basic: PersonnelBasicParameter;
  company: PersonnelCompanyParameter;
  jobList: PersonnelJobParameter[];
  academicList: PersonnelAcademicParameter[];
  careerList: PersonnelCareerParameter[];
  licenseList: PersonnelLicenseParameter[];
  languageList: PersonnelLanguageParameter[];
}
