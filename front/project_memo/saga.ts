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
import { ProjectId } from 'project/domain';

function* watchFilter() {
  while (true) {
    const { payload: query } = yield take(projectMemoAction.setFilter);
    try {
      const projectId = yield call(getProjectId);
      const page: Page<ProjectMemoVO> = yield call(projectMemoApi.getPage, projectId, query);
      yield put(projectMemoAction.setPage(page));
    }
    catch (e) {
      yield put(dialogActions.openAlert({
        status:   'error',
        children: e as string,
      }));
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

function* watchAdd() {
  while (true) {
    const { payload: params } = yield take(projectMemoAction.add);
    try {
      const projectId: ProjectId = yield call(getProjectId);
      yield put(projectMemoAction.requestAdd('request'));
      yield call(projectMemoApi.add, projectId, params);
      yield put(dialogActions.openAlert('등록하였습니다.'));
    }
    catch (e) {
      yield put(dialogActions.openAlert({
        status:   'error',
        children: e as string,
      }));
    }
    finally {
      yield put(projectMemoAction.requestAdd('response'));
    }
  }
}

function* watchChange() {
  while (true) {
    const { payload: params } = yield take(projectMemoAction.change);
    try {
      yield put(projectMemoAction.requestChange('request'));
      yield call(projectMemoApi.change, params.id, params);
      yield put(dialogActions.openAlert('수정하였습니다.'));
    }
    catch (e) {
      yield put(dialogActions.openAlert({
        status:   'error',
        children: e as string,
      }));
    }
    finally {
      yield put(projectMemoAction.requestChange('response'));
    }
  }
}

function* watchDelete() {
  while (true) {
    const { payload: id } = yield take(projectMemoAction.deleteOne);
    try {
      yield put(projectMemoAction.requestDelete('request'));
      yield call(projectMemoApi.deleteOne, id);
      yield put(dialogActions.openAlert('삭제하였습니다.'));
    }
    catch (e) {
      yield put(dialogActions.openAlert({
        status:   'error',
        children: e as string,
      }));
    }
    finally {
      yield put(projectMemoAction.requestDelete('response'));
    }
  }
}

export default function* projectMemoSaga() {
  yield fork(watchFilter);
  yield fork(watchAdd);
  yield fork(watchChange);
  yield fork(watchDelete);
}