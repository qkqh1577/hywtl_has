import {
  call,
  fork,
  put,
  take
} from 'redux-saga/effects';
import { loginAction } from 'login/action';
import { loginApi } from 'login/api';
import { LoginVO } from 'login/domain';
import { getErrorMessage } from 'type/Error';
import { dialogAction } from 'dialog/action';

function* watchLogin() {
  while (true) {
    const { payload: params } = yield take(loginAction.login);
    try {
      yield put(loginAction.requestLogin('request'));
      yield call(loginApi.login, params);
      yield put(loginAction.requestLogin('done'));
    }
    catch (e) {
      const message = getErrorMessage(loginAction.login, e);
      yield put(dialogAction.openError(message || '로그인에 실패하였습니다.'));
      yield put(loginAction.requestLogin(message));
    }
  }
}

function* watchLogout() {
  while (true) {
    yield take(loginAction.logout);
    try {
      yield put(loginAction.requestLogout('request'));
      yield call(loginApi.logout);
      yield put(loginAction.requestLogout('done'));
    }
    catch (e) {
      const message = getErrorMessage(loginAction.logout, e);
      yield put(dialogAction.openError(message));
      yield put(loginAction.requestLogout(message));
    }
  }
}

function* watchDetail() {
  while (true) {
    yield take(loginAction.requestDetail);
    try {
      const detail: LoginVO = yield call(loginApi.get);
      if (detail) {
        yield put(loginAction.setDetail(detail));
      }
      else {
        yield put(loginAction.setDetail(undefined));
        yield put(loginAction.requestLogin('로그인 정보가 없습니다.'));
      }
    }
    catch (e) {
      const message = getErrorMessage(loginAction.requestDetail, e);
      yield put(loginAction.setDetail(undefined));
      yield put(dialogAction.openError(message));
      yield put(loginAction.requestLogin(message));
    }
  }
}

function* watchChange() {
  while (true) {
    const { payload: params } = yield take(loginAction.change);
    try {
      yield put(loginAction.requestChange('request'));
      yield call(loginApi.change, params);
      yield put(loginAction.requestChange('done'));
      yield put(dialogAction.openAlert('변경하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(loginAction.change, e);
      yield put(dialogAction.openError(message));
      yield put(loginAction.requestChange(message));
    }
  }
}

export default function* loginSaga() {
  yield fork(watchLogin);
  yield fork(watchLogout);
  yield fork(watchDetail);
  yield fork(watchChange);
}