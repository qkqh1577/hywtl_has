import { PersonnelBasic } from 'services/personnel/entity';
import FileItemParameter from 'services/common/file-item/parameter';

export type PersonnelBasicParameter
  = Partial<Omit<PersonnelBasic, 'image'>> & {
  image: FileItemParameter;
};
export type PersonnelParameter = {
  id: number;
  basic: PersonnelBasicParameter;
}
