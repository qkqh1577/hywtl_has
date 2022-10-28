import { createReducer } from 'typesafe-actions';
import Page from 'type/Page';
import {
  UserId,
  UserShortVO,
  UserVO
} from 'user/domain';
import { UserQuery } from 'user/query';
import { UserActionType } from 'user/action';
import { ApiStatus } from 'components/DataFieldProps';

export interface UserState {
  filter?: UserQuery;
  page?: Page<UserShortVO>;
  detail?: UserVO;
  id?: UserId;
  requestChange: ApiStatus;
}

const initialState: UserState = {
  requestChange: 'idle',
};

export const userReducer = createReducer(initialState, {
  [UserActionType.setFilter]:     (state,
                                   action
                                  ) => ({
    ...state,
    filter: action.payload,
  }),
  [UserActionType.setPage]:       (state,
                                   action
                                  ) => ({
    ...state,
    page: action.payload,
  }),
  [UserActionType.setId]:         (state,
                                   action
                                  ) => ({
    ...state,
    id: action.payload,
  }),
  [UserActionType.setOne]:        (state,
                                   action
                                  ) => ({
    ...state,
    detail: action.payload,
  }),
  [UserActionType.requestChange]: (state,
                                   action
                                  ) => ({
    ...state,
    requestChange: action.payload,
  }),
});
