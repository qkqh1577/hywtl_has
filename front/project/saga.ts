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
import { dialogActions } from 'components/Dialog';

function* watchFilter() {
  while (true) {
    const { payload: formik } = yield take(ProjectAction.setFilter);
    const page: Page<ProjectShortVO> = yield call(projectApi.getPage, formik.values);
    yield put(projectAction.setPage(page));
    yield call(formik.setSubmitting, false);
  }
}

function* watchId() {
  while (true) {
    const { id } = yield take('project/sales/id/set');
    const detail: ProjectVO = yield call(projectApi.getOne, id);
    yield put(projectAction.setOne(detail));
  }
}

function* watchAdd() {
  while (true) {
    const { payload: formik } = yield take(ProjectAction.add);
    try {
      yield call(projectApi.add, formik.values);
      yield put(dialogActions.openAlert('저장하였습니다.'));
    }
    catch (e) {
      console.error(e);
      yield put(dialogActions.openAlert({
        children: '저장에 실패하였습니다.',
        status:   'error'
      }));
    }
    finally {
      yield call(formik.setSubmitting, false);
    }
  }
}

export default function* projectSaga() {
  yield fork(watchFilter);
  yield fork(watchId);
  yield fork(watchAdd);
}