import { LoginVO } from 'login/domain';
import { FileItemParameter } from 'file-item';

export interface LoginParameter {
  username: string;
  password: string;
}

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

