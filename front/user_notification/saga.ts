import {
  call,
  fork,
  put,
  take,
} from 'redux-saga/effects';
import { userNotificationAction } from 'user_notification/action';
import { userNotificationApi } from 'user_notification/api';
import { UserNotificationVO } from 'user_notification/domain';
import { dialogAction } from 'dialog/action';
import { getErrorMessage } from 'type/Error';

function* watchCount() {
  while (true) {
    yield take(userNotificationAction.requestCount);
    const count: number = yield call(userNotificationApi.count);
    yield put(userNotificationAction.setCount(count));
  }
}

function* watchList() {
  while (true) {
    yield take(userNotificationAction.requestList);
    const list: UserNotificationVO[] = yield call(userNotificationApi.getList);
    yield put(userNotificationAction.setList(list));
  }
}

function* read() {
  while (true) {
    const { payload: id } = yield take(userNotificationAction.read);
    try {
      yield put(userNotificationAction.requestRead('request'));
      yield call(userNotificationApi.read, id);
      yield put(userNotificationAction.requestRead('done'));
    }
    catch (e) {
      const message = getErrorMessage(userNotificationAction.read, e);
      yield put(dialogAction.openError(message));
      yield put(userNotificationAction.requestRead(message));
    }
  }
}

function* readAll() {
  while (true) {
    yield take(userNotificationAction.readAll);
    try {
      yield put(userNotificationAction.requestReadAll('request'));
      yield call(userNotificationApi.readAll);
      yield put(userNotificationAction.requestReadAll('done'));
    }
    catch (e) {
      const message = getErrorMessage(userNotificationAction.readAll, e);
      yield put(dialogAction.openError(message));
      yield put(userNotificationAction.requestReadAll(message));
    }
  }
}

function* deleteOne() {
  while (true) {
    const { payload: id } = yield take(userNotificationAction.deleteOne);
    try {
      yield put(userNotificationAction.requestDelete('request'));
      yield call(userNotificationApi.deleteOne, id);
      yield put(userNotificationAction.requestDelete('done'));
    }
    catch (e) {
      const message = getErrorMessage(userNotificationAction.deleteOne, e);
      yield put(dialogAction.openError(message));
      yield put(userNotificationAction.requestDelete(message));
    }
  }
}

function* deleteAll() {
  while (true) {
    yield take(userNotificationAction.deleteAll);
    try {
      yield put(userNotificationAction.requestDeleteAll('request'));
      yield call(userNotificationApi.deleteAll);
      yield put(userNotificationAction.requestDeleteAll('done'));
    }
    catch (e) {
      const message = getErrorMessage(userNotificationAction.deleteAll, e);
      yield put(dialogAction.openError(message));
      yield put(userNotificationAction.requestDeleteAll(message));
    }
  }
}

export default function* userNotificationSaga() {
  yield fork(watchCount);
  yield fork(watchList);
  yield fork(read);
  yield fork(readAll);
  yield fork(deleteOne);
  yield fork(deleteAll);
}
