import {
  ProjectLogAction,
  projectLogAction
} from 'project_log/action';
import {
  call,
  fork,
  put,
  take
} from 'redux-saga/effects';
import Page from 'type/Page';
import { ProjectLogVO } from 'project_log/domain';
import { projectLogApi } from 'project_log/api';
import { ProjectId } from 'project/domain';

function* watchId() {
  while (true) {
    const { payload: id } = yield take(ProjectLogAction.setId);
    yield call(watchFilter, id)
  }
}

function* watchFilter(id: ProjectId) {
  while (true) {
    const { payload: formik } = yield take(projectLogAction.setFilter);
    try {
      const page: Page<ProjectLogVO> = yield call(projectLogApi.getPage, id, formik.values);
      yield put(projectLogAction.setPage(page));
    }
    catch (e) {
      yield put(projectLogAction.setPage(undefined));
    }
    finally {
      yield call(formik.setSubmitting, false);
    }
  }
}

export default function* projectLogSaga() {
  yield fork(watchId);
};
