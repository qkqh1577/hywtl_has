import { userAction } from 'user/action';
import {
  call,
  fork,
  put,
  take,
} from 'redux-saga/effects';
import {
  UserShortVO,
  UserVO
} from 'user/domain';
import Page from 'type/Page';
import { userApi } from 'user/api';
import { dialogAction } from 'dialog/action';
import { getErrorMessage } from 'type/Error';

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


export default function* userSaga() {
  yield fork(getPage);
  yield fork(watchId);
  yield fork(watchChange);
}

