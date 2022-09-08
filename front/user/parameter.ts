import {
  UserVO
} from 'user/domain';

export interface UserChangeParameter
  extends Omit<UserVO,
    | 'createdAt'
    | 'loginAt'
    | 'passwordChangedAt'> {
}


export interface LoginUserEditParameter
  extends Omit<UserVO,
    | 'id'
    | 'role'
    | 'department'
    | 'createdAt'
    | 'loginAt'
    | 'passwordChangedAt'
    | 'name'
    | 'username'
    | 'email'
    | 'profile'> {
  profile?: File | '';
}
