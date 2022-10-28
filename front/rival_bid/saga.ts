import {
  call,
  fork,
  put,
  select,
  take
} from 'redux-saga/effects';
import { rivalBidAction } from 'rival_bid/action';
import { rivalBidApi } from 'rival_bid/api';
import { RootState } from 'services/reducer';
import { RivalBidVO } from 'rival_bid/domain';
import { dialogAction } from 'dialog/action';
import { getErrorMessage } from 'type/Error';

function* watchProjectId() {
  while (true) {
    const { payload: projectId } = yield take(rivalBidAction.setProjectId);
    if (projectId) {
      const list: RivalBidVO[] = yield call(rivalBidApi.getList, projectId);
      yield put(rivalBidAction.setList(list));
    }
    else {
      yield put(rivalBidAction.setList(undefined));
    }
  }
}

function* watchPush() {
  while (true) {
    yield take(rivalBidAction.push);
    try {
      yield put(rivalBidAction.requestPush('request'));
      const { projectId } = yield select((root: RootState) => root.rivalBid);
      if (!projectId) {
        const message = '프로젝트가 선택되지 않았습니다.';
        yield put(dialogAction.openError(message));
        yield put(rivalBidAction.requestPush(message));
        continue;
      }
      yield call(rivalBidApi.push, projectId);
      yield put(rivalBidAction.requestPush('done'));
    }
    catch (e) {
      const message = getErrorMessage(rivalBidAction.push, e);
      yield put(dialogAction.openError(message));
      yield put(rivalBidAction.requestPush(message));
    }
  }
}

function* watchUpdate() {
  while (true) {
    const { payload: params } = yield take(rivalBidAction.update);
    try {
      yield put(rivalBidAction.requestUpdate('request'));
      yield call(rivalBidApi.update, params);
      yield put(rivalBidAction.requestUpdate('done'));
    }
    catch (e) {
      const message = getErrorMessage(rivalBidAction.update, e);
      yield put(dialogAction.openError(message));
      yield put(rivalBidAction.requestUpdate(message));
    }
  }
}

function* watchDelete() {
  while (true) {
    const { payload: id } = yield take(rivalBidAction.deleteOne);
    try {
      yield put(rivalBidAction.requestDelete('request'));
      yield call(rivalBidApi.deleteOne, id);
      yield put(rivalBidAction.requestDelete('done'));
    }
    catch (e) {
      const message = getErrorMessage(rivalBidAction.deleteOne, e);
      yield put(dialogAction.openError(message));
      yield put(rivalBidAction.requestDelete(message));
    }
  }
}

export default function* rivalBidSaga() {
  yield fork(watchProjectId);
  yield fork(watchPush);
  yield fork(watchUpdate);
  yield fork(watchDelete);
}