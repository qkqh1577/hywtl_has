import { createAction } from 'typesafe-actions';
import { UserQuery } from 'user/query';
import {
  UserError,
  UserId,
  UserShortVO,
  UserVO
} from 'user/domain';
import {
  UserChangeParameter,
  UserPasswordChangeParameter,
} from 'user/parameter';
import Page from 'type/Page';
import { ApiStatus } from 'components/DataFieldProps';
import { UrlValidateParameter } from 'login/parameter';

export enum UserActionType {
  setFilter                     = 'user/filter/set',
  setPage                       = 'user/page/set',
  setId                         = 'user/id/set',
  setOne                        = 'user/one/set',
  change                        = 'user/change',
  requestChange                 = 'user/change/request',
  requestEmailToChangePassword  = 'user/change/password/request',
  validateUrlForPasswordReset   = 'user/reset/password/validate',
  setUrlValidatedResult         = 'user/reset/password/validate/result',
  userError                     = 'user/error',
  requestFindPasswordByUsername = 'user/find/password/request',
}

export const userAction = {
  setFilter:                     createAction(UserActionType.setFilter)<UserQuery>(),
  setPage:                       createAction(UserActionType.setPage)<Page<UserShortVO>>(),
  setOne:                        createAction(UserActionType.setOne)<UserVO | undefined>(),
  setId:                         createAction(UserActionType.setId)<UserId | undefined>(),
  change:                        createAction(UserActionType.change)<UserChangeParameter>(),
  requestChange:                 createAction(UserActionType.requestChange)<ApiStatus>(),
  requestEmailToChangePassword:  createAction(UserActionType.requestEmailToChangePassword)<UserPasswordChangeParameter>(),
  validateUrlForPasswordReset:   createAction(UserActionType.validateUrlForPasswordReset)<UrlValidateParameter>(),
  setUrlValidatedResult:         createAction(UserActionType.setUrlValidatedResult)<boolean>(),
  userError:                     createAction(UserActionType.userError)<UserError | undefined>(),
  requestFindPasswordByUsername: createAction(UserActionType.requestFindPasswordByUsername)<ApiStatus>(),
};
