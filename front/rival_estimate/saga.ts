import {
  call,
  fork,
  put,
  select,
  take
} from 'redux-saga/effects';
import { rivalEstimateAction } from 'rival_estimate/action';
import { RivalEstimateVO } from 'rival_estimate/domain';
import { rivalEstimateApi } from 'rival_estimate/api';
import { RootState } from 'services/reducer';
import { ApiStatus } from 'components/DataFieldProps';

function* watchProjectId() {
  while (true) {
    const { payload: id } = yield take(rivalEstimateAction.setProjectId);
    if (id) {
      const list: RivalEstimateVO[] = yield call(rivalEstimateApi.getList, id);
      yield put(rivalEstimateAction.setList(list));
    }
    else {
      yield put(rivalEstimateAction.setList(undefined));
    }
  }
}


function* watchPush() {
  while (true) {
    yield take(rivalEstimateAction.push);
    const { projectId } = yield select((root: RootState) => root.rivalEstimate);
    try {
      yield put(rivalEstimateAction.requestPush(ApiStatus.REQUEST));
      yield call(rivalEstimateApi.push, projectId);
      yield put(rivalEstimateAction.requestPush(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(rivalEstimateAction.requestPush(ApiStatus.FAIL));
    }
  }
}

function* watchUpdate() {
  while (true) {
    const { payload: params } = yield take(rivalEstimateAction.update);
    try {
      yield put(rivalEstimateAction.requestUpdate(ApiStatus.REQUEST));
      yield call(rivalEstimateApi.update, params.id, params);
      yield put(rivalEstimateAction.requestUpdate(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(rivalEstimateAction.requestUpdate(ApiStatus.FAIL));
    }
  }
}

function* watchDelete() {
  while (true) {
    const { payload: id } = yield take(rivalEstimateAction.deleteOne);
    try {
      yield put(rivalEstimateAction.requestDelete(ApiStatus.REQUEST));
      yield call(rivalEstimateApi.deleteOne, id);
      yield put(rivalEstimateAction.requestDelete(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(rivalEstimateAction.requestDelete(ApiStatus.FAIL));
    }
  }
}

export default function* rivalEstimateSaga() {
  yield fork(watchProjectId);
  yield fork(watchPush);
  yield fork(watchUpdate);
  yield fork(watchDelete);
}