import UserInvitation from 'services/user/invitation/UserInvitation';
import { createReducer } from 'typesafe-actions';
import { UserInvitationType } from 'services/user/invitation/actions';

export type UserInvitationState = {
  detail?: UserInvitation;
}

export const initState: UserInvitationState = {};

const userInvitationReducer = createReducer(initState, {
  [UserInvitationType.setOne]: (state, action) => ({
    ...state,
    detail: action.payload,
  })
});

export default userInvitationReducer;
