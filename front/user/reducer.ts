import { createReducer } from 'typesafe-actions';
import Page from 'type/Page';
import { UserVO } from 'user/domain';
import { UserQuery } from 'user/query';
import { UserAction } from 'user/action';
import { LoginUser } from 'app/domain/login';

export interface UserState {
  filter?: UserQuery;
  page?: Page<UserVO>;
  detail?: UserVO;
  editModal?: LoginUser;
}

const initialState: UserState = {};

export const userReducer = createReducer(initialState, {
  [UserAction.setFilter]: (state,
                           action
                          ) => ({
    ...state,
    filter: action.payload.values,
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
  [UserAction.editModal]: (state,
                           action
                          ) => ({
    ...state,
    editModal: action.payload,
  })
});
