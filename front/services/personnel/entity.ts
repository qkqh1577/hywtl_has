import FileItem from 'services/common/file-item/entity';

export type PersonnelBasic = {
  engName?: string;
  birthDate?: string;
  sex?: '남' | '여';
  image?: FileItem;
  address?: string;
  phone?: string;
  emergencyPhone?: string;
  relationship?: string;
  personalEmail?: string;
}
type Personnel = {
  id: number;
  basic: PersonnelBasic;
}

export default Personnel;
