import {
  call,
  fork,
  put,
  take,
} from 'redux-saga/effects';
import { userNotificationAction } from 'user_notification/action';
import { userNotificationApi } from 'user_notification/api';
import { UserNotificationVO } from 'user_notification/domain';

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
    yield call(userNotificationAction.read, id);
  }
}

function* deleteOne() {
  while (true) {
    const { payload: id } = yield take(userNotificationAction.deleteOne);
    yield call(userNotificationAction.deleteOne, id);
  }
}

export default function* userNotificationSaga() {
  yield fork(watchCount);
  yield fork(watchList);
  yield fork(read);
  yield fork(deleteOne);
}