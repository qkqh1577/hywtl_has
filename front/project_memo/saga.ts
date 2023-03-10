import {
  call,
  fork,
  put,
  select,
  take,
  delay
} from 'redux-saga/effects';
import { projectMemoAction } from 'project_memo/action';
import Page from 'type/Page';
import { ProjectMemoVO } from 'project_memo/domain';
import { projectMemoApi } from 'project_memo/api';
import { RootState } from 'services/reducer';
import { dialogAction } from 'dialog/action';
import { ProjectId } from 'project/domain';
import { DialogStatus } from 'dialog/domain';
import { getErrorMessage } from 'type/Error';
import { userNotificationAction } from 'user_notification/action';

function* watchFilter() {
  while (true) {
    const { payload: query } = yield take(projectMemoAction.setFilter);
    yield put(projectMemoAction.setLoading(true));
    try {
      const projectId = yield call(getProjectId);
      const page: Page<ProjectMemoVO> = yield call(projectMemoApi.getPage, projectId, query);
      yield put(projectMemoAction.setPage(page));
    }
    catch (e) {
      yield put(dialogAction.openAlert({
        status:   DialogStatus.ERROR,
        children: e as string,
      }));
    } finally {
      yield delay(200);
      yield put(projectMemoAction.setLoading(false));
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
      yield put(projectMemoAction.requestAdd('done'));
      if (Array.isArray(params.attendanceList) && params.attendanceList.length > 0) {
        yield put(userNotificationAction.requestCount());
      }
    }
    catch (e) {
      const message = getErrorMessage(projectMemoAction.add, e);
      yield put(dialogAction.openError(message));
      yield put(projectMemoAction.requestAdd(message));
    }
  }
}

function* watchChange() {
  while (true) {
    const { payload: params } = yield take(projectMemoAction.change);
    try {
      yield put(projectMemoAction.requestChange('request'));
      yield call(projectMemoApi.change, params.id, params);
      yield put(projectMemoAction.requestChange('done'));
    }
    catch (e) {
      const message = getErrorMessage(projectMemoAction.change, e);
      yield put(dialogAction.openError(message));
      yield put(projectMemoAction.requestChange(message));
    }
  }
}

function* watchDelete() {
  while (true) {
    const { payload: id } = yield take(projectMemoAction.deleteOne);
    try {
      yield put(projectMemoAction.requestDelete('request'));
      yield call(projectMemoApi.deleteOne, id);
      yield put(projectMemoAction.requestDelete('done'));
      yield put(dialogAction.openAlert('삭제하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(projectMemoAction.deleteOne, e);
      yield put(dialogAction.openError(message));
      yield put(projectMemoAction.requestDelete(message));
    }
  }
}

export default function* projectMemoSaga() {
  yield fork(watchFilter);
  yield fork(watchAdd);
  yield fork(watchChange);
  yield fork(watchDelete);
}
