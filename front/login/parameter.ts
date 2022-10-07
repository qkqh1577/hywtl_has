import { LoginVO } from 'login/domain';
import { FileItemParameter } from 'file-item';

export interface LoginChangeParameter
  extends Omit<LoginVO,
    | 'role'
    | 'department'
    | 'createdAt'
    | 'loginAt'
    | 'passwordChangedAt'
    | 'name'
    | 'username'
    | 'email'
    | 'profile'> {
  profile?: FileItemParameter;
}

