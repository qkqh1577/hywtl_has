import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'services/common/reducer';
import UserInvitation from 'services/user/invitation/UserInvitation';
import {
  UserInvitationInviteParameter,
  UserInvitationQuery
} from 'services/user/invitation/parameter';
import { userInvitationActions } from 'services/user/invitation/actions';

export default function useUserInvitation() {
  const userInvitationState = useSelector((state: RootState) => state.userInvitation);
  const dispatch = useDispatch();

  const getOne = useCallback(
    (query: UserInvitationQuery) =>
      dispatch(userInvitationActions.getOne(query)),
    [dispatch]
  );

  const clearOne = useCallback(
    () =>
      dispatch(userInvitationActions.setOne(undefined)),
    [dispatch]
  );

  const invite = useCallback(
    (params: UserInvitationInviteParameter, callback: (data?: UserInvitation) => void) =>
      dispatch(userInvitationActions.invite({ params, callback })),
    [dispatch]
  );

  return {
    userInvitationState,
    getOne,
    clearOne,
    invite,
  };
}