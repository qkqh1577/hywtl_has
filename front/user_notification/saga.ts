import {
  call,
  fork,
  put,
  take,
} from 'redux-saga/effects';
import {
  userNotificationAction,
  UserNotificationActionType
} from 'user_notification/action';
import { userNotificationApi } from 'user_notification/api';
import { UserNotificationVO } from 'user_notification/domain';
import { dialogAction } from 'dialog/action';
import { DialogStatus } from 'dialog/domain';

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
    yield call(userNotificationApi.read, id);
    yield put(userNotificationAction.requestCount());
    yield put(userNotificationAction.requestList());
  }
}

function* readAll() {
  while (true) {
    yield take(userNotificationAction.readAll);
    yield call(userNotificationApi.readAll);
    yield put(userNotificationAction.requestCount());
    yield put(userNotificationAction.requestList());
  }
}

function* deleteOne() {
  while (true) {
    const { payload: id } = yield take(UserNotificationActionType.deleteOne);
    try {
      yield call(userNotificationApi.deleteOne, id);
      yield put(userNotificationAction.requestCount());
      yield put(userNotificationAction.requestList());
    }
    catch (e) {
      yield put(dialogAction.openAlert({
        children: '문제가 발생했습니다.',
        status:   DialogStatus.ERROR,
      }));
    }
  }
}

function* deleteAll() {
  while (true) {
    yield take(userNotificationAction.deleteAll);
    try {
      yield call(userNotificationApi.deleteAll);
      yield put(userNotificationAction.requestCount());
      yield put(userNotificationAction.requestList());
    }
    catch (e) {
      yield put(dialogAction.openAlert({
        children: '문제가 발생했습니다.',
        status:   DialogStatus.ERROR,
      }));
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
