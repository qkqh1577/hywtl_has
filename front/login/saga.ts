import {
  call,
  fork,
  put,
  take
} from 'redux-saga/effects';
import { loginAction } from 'login/action';
import { loginApi } from 'login/api';
import { ApiStatus } from 'components/DataFieldProps';
import { LoginVO } from 'login/domain';

function* watchLogin() {
  while (true) {
    const { payload: params } = yield take(loginAction.login);
    try {
      yield put(loginAction.requestLogin(ApiStatus.REQUEST));
      yield call(loginApi.login, params);
      yield put(loginAction.requestLogin(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(loginAction.requestLogin(ApiStatus.FAIL));
    }
  }
}

function* watchLogout() {
  while (true) {
    yield take(loginAction.requestLogout);
    try {
      yield put(loginAction.requestLogout(ApiStatus.REQUEST));
      yield call(loginApi.logout);
      yield put(loginAction.requestLogout(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(loginAction.requestLogout(ApiStatus.FAIL));
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
        yield put(loginAction.requestLogin(ApiStatus.FAIL));
      }
    }
    catch (e) {
      yield put(loginAction.setDetail(undefined));
      yield put(loginAction.requestLogin(ApiStatus.FAIL));
    }
  }
}

function* watchChange() {
  while (true) {
    const { payload: params } = yield take(loginAction.change);
    try {
      yield put(loginAction.requestChange(ApiStatus.REQUEST));
      yield call(loginApi.change, params);
      yield put(loginAction.requestChange(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(loginAction.requestChange(ApiStatus.FAIL));
    }
  }
}

export default function* loginSaga() {
  yield fork(watchLogin);
  yield fork(watchLogout);
  yield fork(watchDetail);
  yield fork(watchChange);
}