import { ActionType } from 'typesafe-actions';
import { userInvitationActions, UserInvitationType } from 'services/user/invitation/actions';
import UserInvitation from 'services/user/invitation/UserInvitation';
import userInvitationApi from 'services/user/invitation/api';
import { put, takeLatest } from 'redux-saga/effects';

function* invite(action: ActionType<typeof userInvitationActions.invite>) {
  const { params, callback } = action.payload;
  try {
    const data: UserInvitation = yield userInvitationApi.invite(params);
    callback(data);
  } catch (e) {
    callback();
  }
}

function* getOne(action: ActionType<typeof userInvitationActions.getOne>) {
  try {
    const data: UserInvitation = yield userInvitationApi.getOne(action.payload);
    yield put(userInvitationActions.setOne(data));
  } catch(e) {
    yield put(userInvitationActions.setOne(undefined));
  }
}

export default function* saga() {
  yield takeLatest(UserInvitationType.invite, invite);
  yield takeLatest(UserInvitationType.getOne, getOne);
}
