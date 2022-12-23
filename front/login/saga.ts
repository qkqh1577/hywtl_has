import {
  call,
  fork,
  put,
  take
} from 'redux-saga/effects';
import { loginAction } from 'login/action';
import { loginApi } from 'login/api';
import { LoginVO } from 'login/domain';
import {
  getErrorCode,
  getErrorMessage
} from 'type/Error';
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
      yield put(loginAction.loginError({
        code:    getErrorCode(loginAction.login, e) ?? '',
        message: getErrorMessage(loginAction.login, e) ?? '로그인에 실패하였습니다.'
      }));
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

function* watchPasswordChange() {
  while (true) {
    const { payload: params } = yield take(loginAction.changePassword);
    try {
      yield put(loginAction.requestChange('request'));
      yield call(loginApi.changePassword, params);
      yield put(loginAction.requestChange('done'));
      yield put(dialogAction.openAlert('변경하였습니다.'));
      yield put(loginAction.passwordChangeModal(false));
    }
    catch (e) {
      const message = getErrorMessage(loginAction.changePassword, e);
      const code = getErrorCode(loginAction.changePassword, e);
      yield put(loginAction.passwordValidation({
        code:    code,
        message: message
      }));
      yield put(loginAction.requestChange(message));
    }
  }
}

function* watchResetPassword(){
  while (true) {
    const { payload: params } = yield take(loginAction.reset);
    try {
      yield put(loginAction.requestReset('request'));
      yield call(loginApi.resetPassword, params);
      yield put(loginAction.requestReset('done'));
    }
    catch (e) {
      const message = getErrorMessage(loginAction.reset, e);
      const code = getErrorCode(loginAction.reset, e);
      yield put(loginAction.passwordValidation({
        code:    code,
        message: message
      }));
      yield put(loginAction.requestReset(message));
    }
  }
}
export default function* loginSaga() {
  yield fork(watchLogin);
  yield fork(watchLogout);
  yield fork(watchDetail);
  yield fork(watchChange);
  yield fork(watchPasswordChange);
  yield fork(watchResetPassword);
}
