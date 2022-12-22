import { createAction } from 'typesafe-actions';
import { UserQuery } from 'user/query';
import {
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

export enum UserActionType {
  setFilter                    = 'user/filter/set',
  setPage                      = 'user/page/set',
  setId                        = 'user/id/set',
  setOne                       = 'user/one/set',
  change                       = 'user/change',
  requestChange                = 'user/change/request',
  requestEmailToChangePassword = 'user/change/password/request',
}

export const userAction = {
  setFilter:                    createAction(UserActionType.setFilter)<UserQuery>(),
  setPage:                      createAction(UserActionType.setPage)<Page<UserShortVO>>(),
  setOne:                       createAction(UserActionType.setOne)<UserVO | undefined>(),
  setId:                        createAction(UserActionType.setId)<UserId | undefined>(),
  change:                       createAction(UserActionType.change)<UserChangeParameter>(),
  requestChange:                createAction(UserActionType.requestChange)<ApiStatus>(),
  requestEmailToChangePassword: createAction(UserActionType.requestEmailToChangePassword)<UserPasswordChangeParameter>(),
};
