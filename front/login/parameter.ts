import { LoginVO } from 'login/domain';
import { FileItemParameter } from 'file-item';
import { UserId } from 'user/domain';

export interface LoginParameter {
  username: string;
  password: string;
}

export interface LoginChangeParameter
  extends Omit<LoginVO,
    | 'role'
    | 'department'
    | 'createdAt'
    | 'loginAt'
    | 'passwordChangedAt'
    | 'name'
    | 'username'
    | 'email'
    | 'profile'> {
  profile?: FileItemParameter;
}

export interface PasswordChangeParameter {
  id: UserId;
  nowPassword: string;
  newPasswordConfirm: string;
}

export const initialPasswordParameter = {
  id:                 undefined,
  nowPassword:        '',
  newPasswordConfirm: ''
} as unknown as PasswordChangeParameter;

export enum PasswordValidationCode {
  // 현재 비밀번호
  PASSWORD_NOT_MATCH                  = 'password.not_match',
  USER_NOW_PASSWORD_NOT_BLANK         = 'user.now_password.not_blank',
  // 신규 비밀번호
  PASSWORD_SAME                       = 'password.same',
  PASSWORD_ROLE_VIOLATION             = 'password.role_violation',
  USER_NEW_PASSWORD_NOT_BLANK         = 'user.new_password.not_blank',
  // 신규 비밀번호 확인
  PASSWORD_NOT_EQUAL_NEW_PASSWORD     = 'password.not_equal_new_password',
  USER_NEW_PASSWORD_CONFIRM_NOT_BLANK = 'user.new_password_confirm.not_blank'
}

export interface PasswordValidation {
  code: string,
  message: string,
}

export interface PasswordToFindByEmailParameter {
  username: string;
}

export interface UrlValidateParameter {
  token: string;
}
