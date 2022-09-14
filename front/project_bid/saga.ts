import {
  call,
  fork,
  put,
  select,
  take
} from 'redux-saga/effects';
import { projectBidAction } from 'project_bid/action';
import { ProjectId } from 'project/domain';
import { ProjectBidVO } from 'project_bid/domain';
import { projectBidApi } from 'project_bid/api';
import { RootState } from 'services/reducer';

function* watchProjectId() {
  while (true) {
    const { payload: projectId } = yield take(projectBidAction.setProjectId);
    yield call(getDetail, projectId);
  }
}

function* getDetail(projectId: ProjectId) {
  const detail: ProjectBidVO = yield call(projectBidApi.get, projectId);
  yield put(projectBidAction.setDetail(detail));
}

function* update() {
  while (true) {
    const { payload: params } = yield take(projectBidAction.update);
    try {
      const { projectId } = yield select((root: RootState) => root.projectBid);
      yield put(projectBidAction.requestUpdate('request'));
      yield call(projectBidApi.update, projectId, params);
      yield put(projectBidAction.requestUpdate('done'));
    }
    catch (e) {
      console.error(e);
      yield put(projectBidAction.requestUpdate('fail'));
    }
  }
}

export default function* projectBidSaga() {
  yield fork(watchProjectId);
  yield fork(update);
}