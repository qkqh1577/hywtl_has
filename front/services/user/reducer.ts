import User, { ListUser } from 'services/user/entity';
import Page, { initial } from 'components/Page';
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
  [UserActionType.setLogin]: (state, action) => ({
    ...state,
    login: action.payload,
  }),
});

export default userReducer;
