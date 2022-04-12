import { createAction } from 'typesafe-actions';
import {
  UserInvitationQuery,
  UserInvitationInviteParameter
} from 'services/user/invitation/parameter';
import UserInvitation from 'services/user/invitation/UserInvitation';

export enum UserInvitationType {
  getOne = 'userInvitation/getOne',
  setOne = 'userInvitation/setOne',
  invite = 'userInvitation/invite',
}

export const userInvitationActions = {
  getOne: createAction(UserInvitationType.getOne)<UserInvitationQuery>(),
  setOne: createAction(UserInvitationType.setOne)<UserInvitation | undefined>(),
  invite: createAction(UserInvitationType.invite)<{
    params: UserInvitationInviteParameter;
    callback: (data?: UserInvitation) => void;
  }>(),
};
