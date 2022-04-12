import { createAction } from 'typesafe-actions';
import Page from 'common/Page';
import User, { ListUser } from './User';
import {
  AddUserParameter,
  ChangeUserParameter,
  ChangeUserPasswordParameter,
  UserQuery
} from './parameter';

export enum UserActionType {
  getPage = 'user/getPage',
  setPage = 'user/setPage',
  getOne = 'user/getOne',
  setOne = 'user/setOne',
  add = 'user/add',
  resetPassword = 'user/resetPassword',
  change = 'user/change',
  changePassword = 'user/changePassword',
  selectOne = 'user/selectOne',
}

export const userActions = {
  getPage: createAction(UserActionType.getPage)<UserQuery>(),
  setPage: createAction(UserActionType.setPage)<Page<ListUser>>(),
  getOne: createAction(UserActionType.getOne)<number>(),
  setOne: createAction(UserActionType.setOne)<User | undefined>(),
  add: createAction(UserActionType.add)<{
    params: AddUserParameter;
    callback: (data?: User) => void;
  }>(),
  resetPassword: createAction(UserActionType.resetPassword)<{
    id: number;
    callback: (data?: User) => void;
  }>(),
  change: createAction(UserActionType.change)<{
    params: ChangeUserParameter;
    callback: (data?: User) => void;
  }>(),
  changePassword: createAction(UserActionType.changePassword)<{
    params: ChangeUserPasswordParameter;
    callback: (data?: User) => void;
  }>(),
  selectOne: createAction(UserActionType.selectOne)<number>(),
};