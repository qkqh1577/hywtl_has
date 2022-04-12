import User, { ListUser } from './User';
import Page, { initial } from 'common/Page';
import { createReducer } from 'typesafe-actions';
import { UserActionType } from './actions';

export type UserState = {
  page: Page<ListUser>;
  login?: User;
  detail?: User;
  selectedId?: number;
}

export const initState: UserState = {
  page: initial,
};

const userReducer = createReducer(initState, {
  [UserActionType.setPage]: (state, action) => ({
    ...state,
    page: action.payload,
  }),
  [UserActionType.setOne]: (state, action) => ({
    ...state,
    detail: action.payload,
  }),
  [UserActionType.selectOne]: (state, action) => ({
    ...state,
    selectedId: action.payload,
  }),
});

export default userReducer;
