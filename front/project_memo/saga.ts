import {
  call,
  fork,
  put,
  select,
  take
} from 'redux-saga/effects';
import { projectMemoAction } from 'project_memo/action';
import Page from 'type/Page';
import { ProjectMemoVO } from 'project_memo/domain';
import { projectMemoApi } from 'project_memo/api';
import { RootState } from 'services/reducer';
import { dialogActions } from 'components/Dialog';

function* watchFilter() {
  while (true) {
    const { payload: formik } = yield take(projectMemoAction.setFilter);
    try {
      const projectId = yield call(getProjectId);
      const page: Page<ProjectMemoVO> = yield call(projectMemoApi.getPage, projectId, formik.values);
      yield put(projectMemoAction.setPage(page));
    }
    catch (e) {
      yield put(dialogActions.openAlert({
        status:   'error',
        children: e as string,
      }));
    }
    finally {
      yield call(formik.setSubmitting, false);
    }
  }
}

function* getProjectId() {
  const { projectId } = yield select((root: RootState) => root.projectMemo);
  if (typeof projectId === 'undefined') {
    throw '프로젝트가 선택되지 않았습니다.';
  }
  return projectId;
}

export default function* projectMemoSaga() {
  yield fork(watchFilter);
}