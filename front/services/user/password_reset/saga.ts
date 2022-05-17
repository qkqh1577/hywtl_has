import { ActionType } from 'typesafe-actions';
import { put, takeLatest } from 'redux-saga/effects';
import {
  PasswordReset,
  PasswordResetActionType,
  passwordResetActions,
  passwordResetApi,
} from 'services/user/password_reset';

function* getOne(action: ActionType<typeof passwordResetActions.getOne>) {
  const data: PasswordReset = yield passwordResetApi.getOne(action.payload);
  yield put(passwordResetActions.setOne(data));
}

function* reset(action: ActionType<typeof passwordResetActions.reset>) {
  const { params, callback } = action.payload;
  try {
    const data: PasswordReset = yield passwordResetApi.reset(params);
    callback(data);
  } catch (e) {
    callback();
  }
}

export default function* passwordResetSaga() {
  yield takeLatest(PasswordResetActionType.getOne, getOne);
  yield takeLatest(PasswordResetActionType.reset, reset);
}
