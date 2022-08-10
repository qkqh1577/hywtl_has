import { UserVO } from 'user/domain/user';

export interface LoginUser
  extends Pick<UserVO,
    | 'id'
    | 'username'
    | 'name'
    | 'email'
    | 'role'
    | 'department'> {
  loginAt: Date;
}
