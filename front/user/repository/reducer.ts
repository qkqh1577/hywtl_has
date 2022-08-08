import { createReducer } from 'typesafe-actions';
import Page, { initialPage } from 'services/common/domain/Page';
import { UserVO } from 'user/domain/user';
import { UserAction } from 'user/domain/action';
import {
  initialUserQuery,
  UserQuery
} from 'user/parameter/query';

export interface UserState {
  filter: UserQuery;
  page: Page<UserVO>;
  detail: UserVO | undefined;
}

const initial: UserState = {
  filter: initialUserQuery,
  page:   initialPage,
  detail: undefined
};

export const userReducer = createReducer(initial, {
  [UserAction.setFilter]: (state,
                           action
                          ) => ({
    ...state,
    filter: action.payload,
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
  }),
});