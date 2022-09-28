import {
  call,
  fork,
  put,
  take
} from 'redux-saga/effects';
import {
  projectAction,
  ProjectActionType
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
    const { payload: query } = yield take(ProjectActionType.setFilter);
    yield put({ type: 'app/project/filter/status', filterStatus: 'open' });
    const page: Page<ProjectShortVO> = yield call(projectApi.getPage, query);
    yield put(projectAction.setPage(page));
    yield put({ type: 'app/project/filter/status', filterStatus: 'close' });
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
    const { payload: params } = yield take(ProjectActionType.add);
    try {
      yield put(projectAction.requestAdd('request'));
      yield call(projectApi.add, params);
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
      yield put(projectAction.requestAdd('response'));
    }
  }
}

export default function* projectSaga() {
  yield fork(watchFilter);
  yield fork(watchId);
  yield fork(watchAdd);
}
