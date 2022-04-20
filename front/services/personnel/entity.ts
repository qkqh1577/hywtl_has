import FileItem from 'services/common/file-item/entity';
import Department from 'services/department/entity';

export type PersonnelBasic = {
  engName?: string;
  birthDate?: Date;
  sex?: string;
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
  department: Department;
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

type Personnel = {
  id: number;
  basic: PersonnelBasic;
  company: PersonnelCompany;
  jobList: PersonnelJob[];
  academicList?: PersonnelAcademic[];
  careerList?: PersonnelCareer[];
  licenseList?: PersonnelLicense[];
}

export default Personnel;
