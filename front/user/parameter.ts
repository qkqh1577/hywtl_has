import {
  UserShort,
  UserVO
} from 'user/domain';

export interface UserChangeParameter
  extends Omit<UserVO,
    | 'createdAt'
    | 'loginAt'
    | 'passwordChangedAt'> {
}


export interface LoginUserEditParameter
  extends UserShort {
}
