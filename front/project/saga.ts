import {
  call,
  fork,
  put,
  take
} from 'redux-saga/effects';
import {
  projectAction,
  ProjectAction
} from 'project/action';
import Page from 'type/Page';
import { ProjectShortVO } from 'project/domain';
import { projectApi } from 'project/api';

function* watchFilter() {
  while (true) {
    const { payload: formik } = yield take(ProjectAction.setFilter);
    const page: Page<ProjectShortVO> = yield call(projectApi.getPage, formik.values);
    yield put(projectAction.setPage(page));
    yield call(formik.setSubmitting, false);
  }
}


export default function* projectSaga() {
  yield fork(watchFilter);
}