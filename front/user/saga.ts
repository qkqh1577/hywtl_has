import { userAction } from 'user/action';
import {
  call,
  fork,
  put,
  take,
  delay
} from 'redux-saga/effects';
import {
  UserShortVO,
  UserVO
} from 'user/domain';
import Page from 'type/Page';
import { userApi } from 'user/api';
import { dialogAction } from 'dialog/action';
import { getErrorMessage } from 'type/Error';
import { progressAction } from 'components/Progress/action';

function* getPage() {
  while (true) {
    const { payload: query } = yield take('user/filter/set');
    const page: Page<UserShortVO> = yield call(userApi.getPage, query);
    yield put(userAction.setPage(page));
  }
}

function* watchId() {
  while (true) {
    const { payload: id } = yield take(userAction.setId);
    if (id) {
      const detail: UserVO = yield call(userApi.getOne, id);
      yield put(userAction.setOne(detail));
    }
    else {
      yield put(userAction.setOne(undefined));
    }
  }
}

function* watchChange() {
  while (true) {
    const { payload: params } = yield take(userAction.change);
    try {
      yield put(userAction.requestChange('request'));
      yield call(userApi.change, params);
      yield put(userAction.requestChange('done'));
      yield put(dialogAction.openAlert('변경하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(userAction.change, e);
      yield put(dialogAction.openError(message));
      yield put(userAction.requestChange(message));
    }
  }
}

function* watchInvite() {
  while (true) {
    const { payload: {parameter, callback} } = yield take(userAction.invite);
    yield put(progressAction.progress(true));
    try {
      yield call(userApi.invite, parameter);
      yield delay(500);
      yield call(callback);
    }
    catch (e) {
      const message = getErrorMessage(userAction.change, e);
      yield put(dialogAction.openError(message));
      yield put(userAction.requestChange(message));
    } finally {
      yield put(progressAction.progress(false));
    }
  }
}

function* watchSendEmail() {
  while (true) {
    const { payload: params } = yield take(userAction.requestEmailToChangePassword);
    try {
      yield put(progressAction.progress(true));
      yield put(userAction.requestFindPasswordByUsername('request'));
      yield call(userApi.requestChangePasswordEmail, params);
      yield put(userAction.requestFindPasswordByUsername('done'));
      yield put(progressAction.progress(false));
      yield put(dialogAction.openAlert('이메일을 발송했습니다.'));
    }
    catch (e) {
      yield put(progressAction.progress(false));
      const message = getErrorMessage(userAction.requestEmailToChangePassword, e);
      yield put(userAction.userError({
        code: 'NotFoundException',
        message: message,
      }))
    }
  }
}

function* watchValidateUrlForPasswordChange() {
  while (true) {
    const { payload: params } = yield take(userAction.validateUrlForPasswordReset);
    try {
      const result: boolean = yield call(userApi.validateUrlForPasswordReset, params);
      yield put(userAction.setUrlValidatedResult(result));
    }catch (e) {
      console.log(e);
    }
  }
}

export default function* userSaga() {
  yield fork(getPage);
  yield fork(watchId);
  yield fork(watchChange);
  yield fork(watchInvite);
  yield fork(watchSendEmail);
  yield fork(watchValidateUrlForPasswordChange)
}

