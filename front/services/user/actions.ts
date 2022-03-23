import { createAction } from 'typesafe-actions';
import Page from 'common/Page';
import User from './User';
import { UserAddParameter, UserChangeParameter, UserQuery } from './parameter';

export enum UserActionType {
  getPage = 'user/getPage',
  setPage = 'user/setPage',
  getOne = 'user/getOne',
  setOne = 'user/setOne',
  add = 'user/add',
  change = 'user/change',
  selectOne = 'user/selectOne',
}

export const userActions = {
  getPage: createAction(UserActionType.getPage)<UserQuery>(),
  setPage: createAction(UserActionType.setPage)<Page<User>>(),
  getOne: createAction(UserActionType.getOne)<number>(),
  setOne: createAction(UserActionType.setOne)<User | undefined>(),
  add: createAction(UserActionType.add)<UserAddParameter>(),
  change: createAction(UserActionType.change)<UserChangeParameter>(),
  selectOne: createAction(UserActionType.selectOne)<number>(),
};