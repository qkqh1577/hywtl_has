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

export type PersonnelJob = {
  department: Department;
  jobTitle: string;
  jobType: string;
  jobPosition: string;
  jobClass?: string;
  jobDuty?: string;
}

export type PersonnelCompany = {
  hiredDate: Date;
  hiredType: string;
  recommender?: string;
  jobList: PersonnelJob[];
}

type Personnel = {
  id: number;
  basic: PersonnelBasic;
  company: PersonnelCompany;
}

export default Personnel;
