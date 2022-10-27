import {
  call,
  fork,
  put,
  select,
  take
} from 'redux-saga/effects';
import { projectBidAction } from 'project_bid/action';
import { ProjectBidVO } from 'project_bid/domain';
import { projectBidApi } from 'project_bid/api';
import { RootState } from 'services/reducer';
import { ApiStatus } from 'components/DataFieldProps';

function* watchProjectId() {
  while (true) {
    const { payload: projectId } = yield take(projectBidAction.setProjectId);
    if (projectId) {
      const detail: ProjectBidVO = yield call(projectBidApi.get, projectId);
      yield put(projectBidAction.setDetail(detail));
    }
    else {
      yield put(projectBidAction.setDetail(undefined));
    }
  }
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
      yield put(dialogAction.openError(message));
      yield put(projectBidAction.requestUpdate(message));
    }
  }
}

export default function* projectBidSaga() {
  yield fork(watchProjectId);
  yield fork(update);
}