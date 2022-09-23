import { PersonnelId } from 'personnel/domain';
import { FileItemParameter, } from 'file-item';

export interface PersonnelParameter {
  id: PersonnelId;
  basic: PersonnelBasicParameter; // 기본정보
  company: PersonnelCompanyParameter; // 입사정보
  jobList: PersonnelJobParameter[]; // 소속정보
  academicList?: PersonnelAcademicParameter[]; // 학력정보
  careerList?: PersonnelCareerParameter[]; // 경력정보
  licenseList?: PersonnelLicenseParameter[]; // 면허정보
  languageList?: PersonnelLanguageParameter[]; // 어학정보
}

export interface PersonnelBasicParameter {
  engName?: string;
  birthDate?: string;
  sex?: string;
  image?: FileItemParameter;
  address?: string;
  phone?: string;
  emergencyPhone?: string;
  relationship?: string;
  personalEmail?: string;
}

export interface PersonnelCompanyParameter {
  hiredDate?: string;
  hiredType?: string;
  recommender?: string;
}

export interface PersonnelJobParameter {
  isRepresentative?: boolean;
  departmentId?: number;
  jobTitle?: string;
  jobType?: string;
  jobPosition?: string;
  jobClass?: string;
  jobDuty?: string;
}

export interface PersonnelAcademicParameter {
  academyName?: string;
  major?: string;
  degree?: string;
  state?: string;
  grade?: string;
  startDate?: string;
  endDate?: string;
}

export interface PersonnelCareerParameter {
  companyName?: string;
  majorJob?: string;
  startDate?: string;
  endDate?: string;
}

export interface PersonnelLicenseParameter {
  name?: string;
  type?: string;
  organizationName?: string;
  qualifiedNumber?: string;
  qualifiedDate?: string;
  note?: string;
}

export interface PersonnelLanguageParameter {
  name?: string;
  type?: string;
  grade?: string;
  organizationName?: string;
  certifiedDate?: string;
  expiryPeriod?: string;
  trainingPeriod?: string;
}
