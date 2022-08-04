import { createReducer } from 'typesafe-actions';
import Page, { initial } from 'services/common/domain/Page';
import {
  User,
  UserActionType,
  UserShort,
} from 'services/user';

export type UserState = {
  page: Page<UserShort>;
  login?: User;
  detail?: User;
  selectedId?: number;
}

const initState: UserState = {
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
