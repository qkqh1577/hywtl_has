import { createAction } from 'typesafe-actions';
import {
  PasswordReset,
  PasswordResetParameter,
  PasswordResetQuery,
} from 'services/user/password_reset';

export enum PasswordResetActionType {
  getOne = 'password-reset/getOne',
  setOne = 'password-reset/setOne',
  reset = 'password-reset/reset',
}

export const passwordResetActions = {
  getOne: createAction(PasswordResetActionType.getOne)<PasswordResetQuery>(),
  setOne: createAction(PasswordResetActionType.setOne)<PasswordReset | undefined>(),
  reset: createAction(PasswordResetActionType.reset)<{
    params: PasswordResetParameter;
    callback: (data?: PasswordReset) => void;
  }>(),
};