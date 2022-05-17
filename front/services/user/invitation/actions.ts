import { createAction } from 'typesafe-actions';
import {
  UserInvitation,
  UserInvitationInviteParameter,
  UserInvitationQuery,
} from 'services/user/invitation';

export enum UserInvitationType {
  getOne = 'user-invitation/getOne',
  setOne = 'user-invitation/setOne',
  invite = 'user-invitation/invite',
}

export const userInvitationActions = {
  getOne: createAction(UserInvitationType.getOne)<UserInvitationQuery>(),
  setOne: createAction(UserInvitationType.setOne)<UserInvitation | undefined>(),
  invite: createAction(UserInvitationType.invite)<{
    params: UserInvitationInviteParameter;
    callback: (data?: UserInvitation) => void;
  }>(),
};
