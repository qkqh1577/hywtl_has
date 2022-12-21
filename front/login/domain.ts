import { UserVO } from 'user/domain';

export interface LoginVO
  extends Omit<UserVO, |'loginAt'> {
  loginAt: Date;
}

export interface LoginError {
  code: string;
  message: string;
}
