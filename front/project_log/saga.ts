import { projectLogAction } from 'project_log/action';
import {
  call,
  fork,
  put,
  select,
  take
} from 'redux-saga/effects';
import Page from 'type/Page';
import { ProjectLogVO } from 'project_log/domain';
import { projectLogApi } from 'project_log/api';
import { RootState } from 'services/reducer';
import { initialProjectLogQuery } from 'project_log/query';


function* watchId() {
  while (true) {
    const { payload: id } = yield take(projectLogAction.setId);
    try {
      const page: Page<ProjectLogVO> = yield call(projectLogApi.getPage, id, initialProjectLogQuery);
      yield put(projectLogAction.setPage(page));
    }
    catch (e) {
      yield put(projectLogAction.setPage(undefined));
    }
  }
}

function* watchFilter() {
  while (true) {
    const { payload: query } = yield take(projectLogAction.setFilter);
    try {
      const { id } = yield select((root: RootState) => root.projectLog);
      const page: Page<ProjectLogVO> = yield call(projectLogApi.getPage, id, query);
      yield put(projectLogAction.setPage(page));
    }
    catch (e) {
      yield put(projectLogAction.setPage(undefined));
    }
  }
}

export default function* projectLogSaga() {
  yield fork(watchId);
  yield fork(watchFilter);
};
