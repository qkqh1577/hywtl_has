import {
  UserId,
  UserVO
} from 'user/domain/user';

export default interface UserChangeParameter
  extends Omit<UserVO,
    | 'id'
    | 'createdAt'
    | 'loginAt'
    | 'passwordChangedAt'> {
  id: UserId;
}