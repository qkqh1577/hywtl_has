import { createAction } from 'typesafe-actions';
import { ApiStatus } from 'components/DataFieldProps';
import { LoginVO } from 'login/domain';
import {
  LoginChangeParameter,
  LoginParameter,
  PasswordChangeParameter,
  PasswordValidation
} from 'login/parameter';

export enum LoginActionType {
  login               = 'login',
  requestLogin        = 'login/request',
  logout              = 'logout',
  requestLogout       = 'logout/request',
  requestDetail       = 'login/detail/request',
  setDetail           = 'login/detail/set',
  change              = 'login/change',
  requestChange       = 'login/change/request',
  changeModal         = 'login/change-modal',
  passwordChangeModal = 'login/password-change-modal',
  changePassword      = 'login/change-password',
  passwordValidation  = 'login/password-validation',
}

export const loginAction = {
  login:               createAction(LoginActionType.login)<LoginParameter>(),
  requestLogin:        createAction(LoginActionType.requestLogin)<ApiStatus>(),
  logout:              createAction(LoginActionType.logout)(),
  requestLogout:       createAction(LoginActionType.requestLogout)<ApiStatus>(),
  requestDetail:       createAction(LoginActionType.requestDetail)(),
  setDetail:           createAction(LoginActionType.setDetail)<LoginVO | undefined>(),
  change:              createAction(LoginActionType.change)<LoginChangeParameter>(),
  requestChange:       createAction(LoginActionType.requestChange)<ApiStatus>(),
  changeModal:         createAction(LoginActionType.changeModal)<boolean>(),
  passwordChangeModal: createAction(LoginActionType.passwordChangeModal)<boolean>(),
  changePassword:      createAction(LoginActionType.changePassword)<PasswordChangeParameter>(),
  passwordValidation:  createAction(LoginActionType.passwordValidation)<PasswordValidation | undefined>(),
};
