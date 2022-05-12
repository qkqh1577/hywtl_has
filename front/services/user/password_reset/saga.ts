import { ActionType } from 'typesafe-actions';
import {
  passwordResetActions,
  PasswordResetActionType
} from 'services/user/password_reset/actions';
import PasswordReset from 'services/user/password_reset/entity';
import passwordResetApi from 'services/user/password_reset/api';
import { put, takeLatest } from 'redux-saga/effects';

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
