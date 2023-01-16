import {UserRole, UserVO} from 'user/domain';
import {DepartmentId} from 'department/domain';

export interface UserChangeParameter
  extends Omit<UserVO,
    | 'department'
    | 'createdAt'
    | 'loginAt'
    | 'passwordChangedAt'
    | 'username'
    | 'profile'> {
  departmentId: DepartmentId;
}

export interface UserAddParameter {
  name: string;
  username: string;
  password: string;
  email: string;
  authKey: string;
}

export interface UserInviteParameter {
  email: string;
  name?: string;
  departmentId?: number;
  role?: UserRole;
  authKey?: string;
}

export const initialUserParameter = {
  edit: false
} as unknown as UserChangeParameter;

export interface UserPasswordChangeParameter {
  username: string;
}
