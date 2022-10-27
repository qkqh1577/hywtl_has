import {
  call,
  fork,
  put,
  select,
  take
} from 'redux-saga/effects';
import { projectAction } from 'project/action';
import Page from 'type/Page';
import { projectApi } from 'project/api';
import {
  ProjectShortVO,
  ProjectVO
} from 'project/domain';
import { ApiStatus } from 'components/DataFieldProps';
import { RootState } from 'services/reducer';

function* watchFilter() {
  while (true) {
    const { payload: query } = yield take(projectAction.setFilter);
    const page: Page<ProjectShortVO> = yield call(projectApi.getPage, query);
    yield put(projectAction.setPage(page));
  }
}

function* watchId() {
  while (true) {
    const { payload: id } = yield take(projectAction.setId);
    if (id) {
      const detail: ProjectVO = yield call(projectApi.getOne, id);
      yield put(projectAction.setOne(detail));
    }
    else {
      yield put(projectAction.setOne(undefined));
    }
  }
}

function* watchAdd() {
  while (true) {
    const { payload: params } = yield take(projectAction.add);
    try {
      yield put(projectAction.requestAdd('request'));
      yield call(projectApi.add, params);
      yield put(projectAction.requestAdd('done'));
    }
    catch (e) {
      yield put(dialogAction.openError(message));
      yield put(projectAction.requestAdd(message));
    }
  }
}

function* watchUpdateStatus() {
  while (true) {
    const { payload: params } = yield take(projectAction.updateStatus);
    try {
      const { id } = yield select((root: RootState) => root.project);
      yield put(projectAction.requestUpdateStatus('request'));
      yield call(projectApi.updateStatus, id, params);
      yield put(projectAction.requestUpdateStatus('done'));
    }
    catch (e) {
      yield put(dialogAction.openError(message));
      yield put(projectAction.requestUpdateStatus(message));
    }
  }
}

function* watchAddFailReason() {
  while (true) {
    const { payload: params } = yield take(projectAction.addFailReason);
    try {
      const { id } = yield select((root: RootState) => root.project);
      yield put(projectAction.requestAddFailReason('request'));
      yield call(projectApi.addFailReason, id, params);
      yield put(projectAction.requestAddFailReason('done'));
    }
    catch (e) {
      yield put(dialogAction.openError(message));
      yield put(projectAction.requestAddFailReason(message));
    }
  }
}

export default function* projectSaga() {
  yield fork(watchFilter);
  yield fork(watchId);
  yield fork(watchAdd);
  yield fork(watchUpdateStatus);
  yield fork(watchAddFailReason);
}
