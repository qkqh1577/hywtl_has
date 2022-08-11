import { UserVO } from 'user/domain';

export default interface UserChangeParameter
  extends Omit<UserVO,
    | 'createdAt'
    | 'loginAt'
    | 'passwordChangedAt'> {
}