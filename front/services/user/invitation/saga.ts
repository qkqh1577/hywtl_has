import { ActionType } from 'typesafe-actions';
import { put, takeLatest } from 'redux-saga/effects';
import {
  UserInvitation,
  UserInvitationType,
  userInvitationActions,
  userInvitationApi,
} from 'services/user/invitation';

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
  const data: UserInvitation = yield userInvitationApi.getOne(action.payload);
  yield put(userInvitationActions.setOne(data));
}

export default function* userInvitationSaga() {
  yield takeLatest(UserInvitationType.invite, invite);
  yield takeLatest(UserInvitationType.getOne, getOne);
}
