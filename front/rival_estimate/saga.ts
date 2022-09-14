import {
  call,
  fork,
  put,
  select,
  take
} from 'redux-saga/effects';
import { rivalEstimateAction } from 'rival_estimate/action';
import { ProjectId } from 'project/domain';
import { RivalEstimateVO } from 'rival_estimate/domain';
import { rivalEstimateApi } from 'rival_estimate/api';
import { RootState } from 'services/reducer';

function* watchProjectId() {
  while (true) {
    const { payload: id } = yield take(rivalEstimateAction.setProjectId);
    yield call(getList, id);
  }
}

function* getList(id: ProjectId) {
  const list: RivalEstimateVO[] = yield call(rivalEstimateApi.getList, id);
  yield put(rivalEstimateAction.setList(list));
}

function* push() {
  while (true) {
    yield take(rivalEstimateAction.push);
    const { projectId } = yield select((root: RootState) => root.rivalEstimate);
    try {
      yield call(rivalEstimateApi.push, projectId);
      yield call(getList, projectId);
    }
    catch (e) {
      console.error(e);
    }
  }
}

function* requestUpdate() {
  while (true) {
    const { payload: params } = yield take(rivalEstimateAction.update);
    try {
      yield put(rivalEstimateAction.requestUpdate('request'));
      yield call(rivalEstimateApi.update, params.id, params);
      yield put(rivalEstimateAction.requestUpdate('done'));
    }
    catch (e) {
      yield put(rivalEstimateAction.requestUpdate('fail'));
    }
  }
}

function* deleteOne() {
  while (true) {
    const { payload: id } = yield take(rivalEstimateAction.deleteOne);
    try {
      yield call(rivalEstimateApi.deleteOne, id);
      const { projectId } = yield select((root: RootState) => root.rivalEstimate);
      yield call(getList, projectId);
    }
    catch (e) {
      console.error(e);
    }
  }
}

export default function* rivalEstimateSaga() {
  yield fork(watchProjectId);
  yield fork(push);
  yield fork(requestUpdate);
  yield fork(deleteOne);
}