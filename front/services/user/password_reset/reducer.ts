import PasswordReset from 'services/user/password_reset/entity';
import { createReducer } from 'typesafe-actions';
import { PasswordResetActionType } from 'services/user/password_reset/actions';

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
