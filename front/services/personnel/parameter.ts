import { PersonnelBasic } from 'services/personnel/entity';
import FileItemParameter from 'services/common/file-item/parameter';

export type PersonnelBasicParameter
  = Partial<Omit<PersonnelBasic, 'image' | 'birthDate'>> & {
  birthDate?: string;
  image: FileItemParameter;
};

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

export type PersonnelParameter = {
  id: number;
  basic: PersonnelBasicParameter;
  company: PersonnelCompanyParameter;
  jobList: PersonnelJobParameter[];
  academicList: PersonnelAcademicParameter[];
  careerList: PersonnelCareerParameter[];
  licenseList: PersonnelLicenseParameter[];
}
