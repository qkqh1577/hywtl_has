import { FileItem } from 'services/common/file-item';
import { DepartmentShort } from 'services/department';

export type PersonnelBasic = {
  engName: string;
  birthDate: Date;
  sex: string;
  image?: FileItem;
  address?: string;
  phone?: string;
  emergencyPhone?: string;
  relationship?: string;
  personalEmail?: string;
}

export type PersonnelCompany = {
  hiredDate: Date;
  hiredType: string;
  recommender?: string;
}

export type PersonnelJob = {
  department: DepartmentShort;
  jobTitle: string;
  jobType: string;
  jobPosition: string;
  jobClass?: string;
  jobDuty?: string;
}

export type PersonnelAcademic = {
  academyName: string;
  major: string;
  degree?: string;
  state: string;
  grade?: string;
  startDate: Date;
  endDate: Date;
}

export type PersonnelCareer = {
  companyName: string;
  startDate: Date;
  endDate: Date;
  majorJob: string;
}

export type PersonnelLicense = {
  name: string;
  type?: string;
  organizationName: string;
  qualifiedNumber: string;
  qualifiedDate: Date;
  memo?: string;
}

export type PersonnelLanguage = {
  name: string;
  type: string;
  grade?: string;
  organizationName: string;
  certifiedDate: Date;
  expiryPeriod?: string;
  trainingPeriod?: string;
}

export type PersonnelShort = {
  id: number;
  name: string;
  email: string;
  username: string;
  basic: PersonnelBasic;
  company: PersonnelCompany;
  jobCount?: number;
  academicCount?: number;
  careerCount?: number;
  licenseCount?: number;
  languageCount?: number;
}

export type Personnel = {
  id: number;
  basic: PersonnelBasic;
  company: PersonnelCompany;
  jobList: PersonnelJob[];
  academicList?: PersonnelAcademic[];
  careerList?: PersonnelCareer[];
  licenseList?: PersonnelLicense[];
  languageList?: PersonnelLanguage[];
}

