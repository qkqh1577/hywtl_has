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
      yield put(rivalEstimateAction.requestPush('request'));
      yield call(rivalEstimateApi.push, projectId);
      yield put(rivalEstimateAction.requestPush('done'));
    }
    catch (e) {
      const message = getErrorMessage();
      yield put(rivalEstimateAction.requestPush(message));
    }
  }
}

function* watchUpdate() {
  while (true) {
    const { payload: params } = yield take(rivalEstimateAction.update);
    try {
      yield put(rivalEstimateAction.requestUpdate('request'));
      yield call(rivalEstimateApi.update, params.id, params);
      yield put(rivalEstimateAction.requestUpdate('done'));
    }
    catch (e) {
      const message = getErrorMessage();
      yield put(rivalEstimateAction.requestUpdate(message));
    }
  }
}

function* watchDelete() {
  while (true) {
    const { payload: id } = yield take(rivalEstimateAction.deleteOne);
    try {
      yield put(rivalEstimateAction.requestDelete('request'));
      yield call(rivalEstimateApi.deleteOne, id);
      yield put(rivalEstimateAction.requestDelete('done'));
    }
    catch (e) {
      yield put(dialogAction.openError(message));
      yield put(rivalEstimateAction.requestDelete(message));
    }
  }
}

export default function* rivalEstimateSaga() {
  yield fork(watchProjectId);
  yield fork(watchPush);
  yield fork(watchUpdate);
  yield fork(watchDelete);
}