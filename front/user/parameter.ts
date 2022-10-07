import { UserVO } from 'user/domain';
import { FileItemParameter } from 'file-item';

export interface LoginParameter {
  username: string;
  password: string;
}

export interface UserChangeParameter
  extends Omit<UserVO,
    | 'createdAt'
    | 'loginAt'
    | 'passwordChangedAt'
    | 'profile'> {
  profile?: FileItemParameter;
}

export const initialUserParameter = {
  edit: false
} as unknown as UserChangeParameter;