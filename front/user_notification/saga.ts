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
import { dialogActions } from 'components/Dialog';

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
    const list: UserNotificationVO[] = yield call(userNotificationApi.getList);
    yield put(userNotificationAction.setList(list));
  }
}

function* readAll() {
  while (true) {
    yield take(userNotificationAction.readAll);
    yield call(userNotificationApi.readAll);
    const list: UserNotificationVO[] = yield call(userNotificationApi.getList);
    yield put(userNotificationAction.setList(list));
  }
}

function* deleteOne() {
  while (true) {
    const { payload: id } = yield take(UserNotificationActionType.deleteOne);
    try {
      yield call(userNotificationApi.deleteOne, id);
      const list: UserNotificationVO[] = yield call(userNotificationApi.getList);
      yield put(userNotificationAction.setList(list));
      // yield put(dialogActions.openAlert('삭제 했습니다.'));
    }
    catch (e) {
      yield put(dialogActions.openAlert({
        children: '문제가 발생했습니다.',
        status:   'error',
      }));
    }
  }
}

function* deleteAll() {
  while (true) {
    yield take(userNotificationAction.deleteAll);
    try {
      yield call(userNotificationApi.deleteAll);
      const list: UserNotificationVO[] = yield call(userNotificationApi.getList);
      yield put(userNotificationAction.setList(list));
      // yield put(dialogActions.openAlert('전체 알람을 삭제 했습니다.'));
    }catch (e){
      yield put(dialogActions.openAlert({
        children: '문제가 발생했습니다.',
        status:   'error',
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
