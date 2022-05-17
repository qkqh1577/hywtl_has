import { createReducer } from 'typesafe-actions';
import {
  PasswordReset,
  PasswordResetActionType,
} from 'services/user/password_reset';

export type PasswordResetState = {
  detail?: PasswordReset;
}

const initPasswordReset: PasswordResetState = {};

const passwordResetReducer = createReducer(initPasswordReset, {
  [PasswordResetActionType.setOne]: (state, action) => ({
    ...state,
    detail: action.payload,
  }),
});

export default passwordResetReducer;
