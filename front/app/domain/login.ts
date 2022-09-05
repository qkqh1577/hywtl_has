import { UserVO } from 'user/domain';

export interface LoginUser
  extends UserVO {
  loginAt: Date;
}
