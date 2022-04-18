import User from 'services/user/entity';
import FileItem from 'services/common/file-item/entity';

export type PersonnelBasic = {
  name: string;
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
  user: User;
  basic: PersonnelBasic;
}

export default Personnel;
