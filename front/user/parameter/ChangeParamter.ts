import { UserVO } from 'user/domain/user';

export default interface UserChangeParameter
  extends Omit<UserVO,
    | 'createdAt'
    | 'loginAt'
    | 'passwordChangedAt'> {
}