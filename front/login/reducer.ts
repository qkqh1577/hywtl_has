import { LoginVO } from 'login/domain';
import { createReducer } from 'typesafe-actions';
import { LoginActionType } from 'login/action';
import { ApiStatus } from 'components/DataFieldProps';

export interface LoginState {
  detail?: LoginVO;
  requestLogin: ApiStatus;
  requestLogout: ApiStatus;
  requestChange: ApiStatus;
  userModal: boolean;
}

const initial: LoginState = {
  requestLogin:  ApiStatus.IDLE,
  requestLogout: ApiStatus.IDLE,
  requestChange: ApiStatus.IDLE,
  userModal:     false,
};

export const loginReducer = createReducer(initial, {
  [LoginActionType.setDetail]:     (state,
                                    action
                                   ) => ({
    ...state,
    detail: action.payload,
  }),
  [LoginActionType.requestLogin]:  (state,
                                    action
                                   ) => ({
    ...state,
    requestLogin: action.payload,
  }),
  [LoginActionType.requestLogout]: (state,
                                    action
                                   ) => ({
    ...state,
    requestLogout: action.payload
  }),
  [LoginActionType.requestChange]: (state,
                                    action
                                   ) => ({
    ...state,
    requestChange: action.payload,
  }),
  [LoginActionType.userModal]:     (state,
                                    action
                                   ) => ({
    ...state,
    userModal: action.payload
  })
});