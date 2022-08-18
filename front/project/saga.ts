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
import {
  ProjectShortVO,
  ProjectVO
} from 'project/domain';
import { projectApi } from 'project/api';

function* watchFilter() {
  while (true) {
    const { payload: formik } = yield take(ProjectAction.setFilter);
    const page: Page<ProjectShortVO> = yield call(projectApi.getPage, formik.values);
    yield put(projectAction.setPage(page));
    yield call(formik.setSubmitting, false);
  }
}

function* watchId() {
  while(true) {
    const {id} = yield take('project/sales/id/set');
    const detail: ProjectVO = yield call(projectApi.getOne, id);
    yield put(projectAction.setOne(detail));
  }
}


export default function* projectSaga() {
  yield fork(watchFilter);
  yield fork(watchId);
}