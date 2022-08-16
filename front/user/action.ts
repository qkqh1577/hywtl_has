import { createAction } from 'typesafe-actions';
import { UserQuery } from 'user/query';
import { UserVO } from 'user/domain';
import UserChangeParameter from 'user/parameter';
import {
  FormikHelpers,
} from 'formik';
import Page from 'type/Page';

export interface FormikSubmit<Values>
  extends FormikHelpers<any> {
  values: Values;
}

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