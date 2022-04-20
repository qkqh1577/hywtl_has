import { PersonnelBasic } from 'services/personnel/entity';
import FileItemParameter from 'services/common/file-item/parameter';

export type PersonnelBasicParameter
  = Partial<Omit<PersonnelBasic, 'image'>> & {
  image: FileItemParameter;
};

export type PersonnelJobParameter = {
  departmentId: number;
  jobTitle: string;
  jobType: string;
  jobPosition: string;
  jobClass?: string;
  jobDuty?: string;
}
export type PersonnelCompanyParameter = {
  hiredDate: Date;
  hiredType: string;
  recommender?: string;
}

export type PersonnelParameter = {
  id: number;
  basic: PersonnelBasicParameter;
  company: PersonnelCompanyParameter;
  jobList: PersonnelJobParameter[];
}
