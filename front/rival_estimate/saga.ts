import {
  call,
  delay,
  fork,
  put,
  select,
  take
} from 'redux-saga/effects';
import { rivalEstimateAction } from 'rival_estimate/action';
import { RivalEstimateVO } from 'rival_estimate/domain';
import { rivalEstimateApi } from 'rival_estimate/api';
import { RootState } from 'services/reducer';
import { getErrorMessage } from 'type/Error';
import { dialogAction } from 'dialog/action';

function* watchProjectId() {
  while (true) {
    const { payload: id } = yield take(rivalEstimateAction.setProjectId);
    yield put(rivalEstimateAction.setLoading(true));
    if (id) {
      try {
        const list: RivalEstimateVO[] = yield call(rivalEstimateApi.getList, id);
        yield put(rivalEstimateAction.setList(list));
      } finally {
        yield delay(300);
        yield put(rivalEstimateAction.setLoading(false));
      }
    }
    else {
      yield put(rivalEstimateAction.setList(undefined));
    }
  }
}


function* watchPush() {
  while (true) {
    yield take(rivalEstimateAction.push);
    try {
      yield put(rivalEstimateAction.requestPush('request'));
      const { projectId } = yield select((root: RootState) => root.rivalEstimate);
      if (!projectId) {
        const message = '프로젝트가 선택되지 않았습니다.';
        yield put(dialogAction.openError(message));
        yield put(rivalEstimateAction.requestPush(message));
        continue;
      }
      yield call(rivalEstimateApi.push, projectId);
      yield put(rivalEstimateAction.requestPush('done'));
    }
    catch (e) {
      const message = getErrorMessage(rivalEstimateAction.push, e);
      yield put(dialogAction.openError(message));
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
      const message = getErrorMessage(rivalEstimateAction.update, e);
      yield put(dialogAction.openError(message));
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
      const message = getErrorMessage(rivalEstimateAction.deleteOne, e);
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