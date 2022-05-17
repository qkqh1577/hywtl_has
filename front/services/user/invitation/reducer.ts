import { createReducer } from 'typesafe-actions';
import {
  UserInvitation,
  UserInvitationType,
} from 'services/user/invitation';

export type UserInvitationState = {
  detail?: UserInvitation;
}

const initState: UserInvitationState = {};

const userInvitationReducer = createReducer(initState, {
  [UserInvitationType.setOne]: (state, action) => ({
    ...state,
    detail: action.payload,
  })
});

export default userInvitationReducer;
