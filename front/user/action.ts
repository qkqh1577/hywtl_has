import { createAction } from 'typesafe-actions';
import { UserQuery } from 'user/query';
import { UserVO } from 'user/domain';
import UserChangeParameter from 'user/parameter';
import Page from 'type/Page';
import { FormikSubmit } from 'type/Form';

export enum UserAction {
  setFilter = 'user/filter/set',
  setPage   = 'user/page/set',
  setOne    = 'user/one/set',
  change    = 'user/change',
}

export const userAction = {
  setFilter: createAction(UserAction.setFilter)<FormikSubmit<UserQuery>>(),
  setPage:   createAction(UserAction.setPage)<Page<UserVO>>(),
  setOne:    createAction(UserAction.setOne)<UserVO>(),
  change:    createAction(UserAction.change)<FormikSubmit<UserChangeParameter>>(),
};