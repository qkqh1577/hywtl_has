import { createReducer } from 'typesafe-actions';
import Page from 'services/common/domain/Page';
import { UserVO } from 'user/domain/user';
import { UserQuery } from 'user/parameter/query';
import { UserAction } from 'user/domain/action';

export interface UserState {
  filter?: UserQuery;
  page?: Page<UserVO>;
  detail?: UserVO;
}

const initialState: UserState = {};

export const userReducer = createReducer(initialState, {
  [UserAction.setFilter]: (state,
                           action
                          ) => ({
    ...state,
    filter: action.payload
  }),
  [UserAction.setPage]:   (state,
                           action
                          ) => ({
    ...state,
    page: action.payload,
  }),
  [UserAction.setOne]:    (state,
                           action
                          ) => ({
    ...state,
    detail: action.payload,
  })
});