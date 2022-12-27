import {
  LoginError,
  LoginVO
} from 'login/domain';
import { createReducer } from 'typesafe-actions';
import { LoginActionType } from 'login/action';
import { ApiStatus } from 'components/DataFieldProps';
import { PasswordValidation } from 'login/parameter';

export interface LoginState {
  detail?: LoginVO;
  requestLogin: ApiStatus;
  requestLogout: ApiStatus;
  requestChange: ApiStatus;
  changeModal: boolean;
  passwordChangeModal: boolean;
  passwordValidation?: PasswordValidation;
  loginError?: LoginError;
  requestReset: ApiStatus;
}

const initial: LoginState = {
  requestLogin:        'idle',
  requestLogout:       'idle',
  requestChange:       'idle',
  changeModal:         false,
  passwordChangeModal: false,
  requestReset:        'idle'
};

export const loginReducer = createReducer(initial, {
  [LoginActionType.setDetail]:           (state,
                                          action
                                         ) => ({
    ...state,
    detail: action.payload,
  }),
  [LoginActionType.requestLogin]:        (state,
                                          action
                                         ) => ({
    ...state,
    requestLogin: action.payload,
  }),
  [LoginActionType.requestLogout]:       (state,
                                          action
                                         ) => ({
    ...state,
    requestLogout: action.payload
  }),
  [LoginActionType.requestChange]:       (state,
                                          action
                                         ) => ({
    ...state,
    requestChange: action.payload,
  }),
  [LoginActionType.changeModal]:         (state,
                                          action
                                         ) => ({
    ...state,
    changeModal: action.payload
  }),
  [LoginActionType.passwordChangeModal]: (state,
                                          action
                                         ) => ({
    ...state,
    passwordChangeModal: action.payload
  }),
  [LoginActionType.passwordValidation]:  (state,
                                          action
                                         ) => ({
    ...state,
    passwordValidation: action.payload
  }),
  [LoginActionType.loginError]:          (state,
                                          action
                                         ) => ({
    ...state,
    loginError: action.payload
  }),
  [LoginActionType.requestReset]:        (state,
                                          action
                                         ) => ({
    ...state,
    requestReset: action.payload
  }),
});
