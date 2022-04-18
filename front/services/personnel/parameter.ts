import { PersonnelBasic } from 'services/personnel/entity';

export type PersonnelBasicAddParameter = Partial<PersonnelBasic>;
export type PersonnelAddParameter = {
  userId: number;
  basic: PersonnelBasicAddParameter;
}

export type PersonnelBasicChangeParameter = Partial<PersonnelBasic>;
export type PersonnelChangeParameter = {
  id: number;
  basic: PersonnelBasicChangeParameter;
}
