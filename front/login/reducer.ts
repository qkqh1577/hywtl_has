import { LoginVO } from 'login/domain';
import { createReducer } from 'typesafe-actions';
import { LoginActionType } from 'login/action';
import { ApiStatus } from 'components/DataFieldProps';

export interface LoginState {
  detail?: LoginVO;
  requestLogin: ApiStatus;
  requestLogout: ApiStatus;
  requestChange: ApiStatus;
  changeModal: boolean;
}

const initial: LoginState = {
  requestLogin:  'idle',
  requestLogout: 'idle',
  requestChange: 'idle',
  changeModal:   false,
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
  [LoginActionType.changeModal]: (state,
                                  action
                                 ) => ({
    ...state,
    changeModal: action.payload
  })
});