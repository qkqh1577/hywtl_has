import { createAction } from 'typesafe-actions';
import { UserQuery } from 'user/parameter/query';
import Page from 'services/common/domain/Page';
import {
  UserId,
  UserVO
} from 'user/domain/user';

export enum UserAction {
  setFilter = 'user/setFilter',
  getPage   = 'user/getPage',
  setPage   = 'user/setPage',
  getOne    = 'user/getOne',
  setOne    = 'user/setOne',

}

export const userAction = {
  setFilter: createAction(UserAction.setFilter)<UserQuery>(),
  getPage:   createAction(UserAction.getPage)<UserQuery>(),
  setPage:   createAction(UserAction.setPage)<Page<UserVO>>(),
  getOne:    createAction(UserAction.getOne)<UserId>(),
  setOne:    createAction(UserAction.setOne)<UserVO>(),
};