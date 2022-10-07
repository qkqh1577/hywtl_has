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
import { ApiStatus } from 'components/DataFieldProps';

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
      yield put(userAction.requestChange(ApiStatus.REQUEST));
      yield call(userApi.change, params);
      yield put(userAction.requestChange(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(userAction.requestChange(ApiStatus.FAIL));
    }
  }
}


export default function* userSaga() {
  yield fork(getPage);
  yield fork(watchId);
  yield fork(watchChange);
}

