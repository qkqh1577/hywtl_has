import { createAction } from 'typesafe-actions';
import { UserQuery } from 'user/query';
import { UserVO } from 'user/domain';
import {
  UserChangeParameter,
  LoginUserEditParameter
} from 'user/parameter';
import Page from 'type/Page';
import {
  FormikSubmit
} from 'type/Form';
import { LoginUser } from 'app/domain/login';

export enum UserAction {
  setFilter = 'user/filter/set',
  setPage   = 'user/page/set',
  setOne    = 'user/one/set',
  change    = 'user/change',
  edit      = 'user/login',
  editModal = 'user/login/modal'
}

export const userAction = {
  setFilter: createAction(UserAction.setFilter)<FormikSubmit<UserQuery>>(),
  setPage:   createAction(UserAction.setPage)<Page<UserVO>>(),
  setOne:    createAction(UserAction.setOne)<UserVO>(),
  change:    createAction(UserAction.change)<FormikSubmit<UserChangeParameter>>(),
  edit:      createAction(UserAction.edit)<FormikSubmit<LoginUserEditParameter>>(),
  editModal: createAction(UserAction.editModal)<LoginUser | undefined>(),
};
