import { UserVO } from 'user/domain';
import { DepartmentId } from 'department/domain';

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

export const initialUserParameter = {
  edit: false
} as unknown as UserChangeParameter;