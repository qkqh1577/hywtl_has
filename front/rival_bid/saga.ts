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
import { ApiStatus } from 'components/DataFieldProps';
import { RivalBidVO } from 'rival_bid/domain';

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
      const { projectId } = yield select((root: RootState) => root.rivalBid);
      yield put(rivalBidAction.requestPush(ApiStatus.REQUEST));
      yield call(rivalBidApi.push, projectId);
      yield put(rivalBidAction.requestPush(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(rivalBidAction.requestPush(ApiStatus.FAIL));
    }
  }
}

function* watchUpdate() {
  while (true) {
    const { payload: params } = yield take(rivalBidAction.update);
    try {
      yield put(rivalBidAction.requestUpdate(ApiStatus.REQUEST));
      yield call(rivalBidApi.update, params);
      yield put(rivalBidAction.requestUpdate(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(rivalBidAction.requestUpdate(ApiStatus.FAIL));
    }
  }
}

function* watchDelete() {
  while (true) {
    const { payload: id } = yield take(rivalBidAction.deleteOne);
    try {
      yield put(rivalBidAction.requestDelete(ApiStatus.REQUEST));
      yield call(rivalBidApi.deleteOne, id);
      yield put(rivalBidAction.requestDelete(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(rivalBidAction.requestDelete(ApiStatus.FAIL));
    }
  }
}

export default function* rivalBidSaga() {
  yield fork(watchProjectId);
  yield fork(watchPush);
  yield fork(watchUpdate);
  yield fork(watchDelete);
}