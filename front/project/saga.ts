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
import { RootState } from 'services/reducer';
import { dialogAction } from 'dialog/action';
import { getErrorMessage } from 'type/Error';
import { initialProjectQuery } from 'project/parameter';

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
      yield put(dialogAction.openAlert('등록하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(projectAction.add, e);
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
      if (params.progressStatus) {
        yield put(projectAction.setFilter(initialProjectQuery));
      }
    }
    catch (e) {
      const message = getErrorMessage(projectAction.updateStatus, e);
      yield put(dialogAction.openError(message));
      yield put(projectAction.requestUpdateStatus(message));
    }
  }
}

function* watchDelete() {
  while (true) {
    yield take(projectAction.delete);
    try {
      const { id } = yield select((root: RootState) => root.project);
      yield put(projectAction.requestDelete('request'));
      yield call(projectApi.delete, id);
      yield put(projectAction.requestDelete('done'));
      yield put(dialogAction.openAlert('삭제하였습니다.'));
      yield put(projectAction.setFilter(initialProjectQuery));
    }
    catch (e) {
      const message = getErrorMessage(projectAction.delete, e);
      yield put(dialogAction.openError(message));
      yield put(projectAction.requestDelete(message));
    }
  }
}

function* watchAddFailReason() {
  while (true) {
    const { payload: params } = yield take(projectAction.addFailReason);
    try {
      yield put(projectAction.requestAddFailReason('request'));
      const { id } = yield select((root: RootState) => root.project);
      if (!id) {
        const message = '프로젝트가 선택되지 않았습니다.';
        yield put(dialogAction.openError(message));
        yield put(projectAction.requestAddFailReason(message));
        continue;
      }
      yield call(projectApi.addFailReason, id, params);
      yield put(projectAction.requestAddFailReason('done'));
      yield put(dialogAction.openAlert('수주 실패 정보를 등록하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(projectAction.addFailReason, e);
      yield put(dialogAction.openError(message));
      yield put(projectAction.requestAddFailReason(message));
    }
  }
}

function* watchUpdateFavorite() {
  while (true) {
    const { payload: params } = yield take(projectAction.updateFavorite);
    const { id } = yield select((root: RootState) => root.project);
    try {
      if (id) {
        yield put(projectAction.requestUpdateStatus('request'));
        yield call(projectApi.updateFavorite, id, params);
        yield put(projectAction.requestUpdateStatus('done'));
        yield put(projectAction.setFilter(initialProjectQuery));
        yield put(projectAction.setId(id));
      }
    }
    catch (e) {
      const message = getErrorMessage(projectAction.updateStatus, e);
      yield put(dialogAction.openError(message));
      yield put(projectAction.requestUpdateStatus(message));
    }
  }
}

export default function* projectSaga() {
  yield fork(watchFilter);
  yield fork(watchId);
  yield fork(watchAdd);
  yield fork(watchUpdateStatus);
  yield fork(watchAddFailReason);
  yield fork(watchDelete);
  yield fork(watchUpdateFavorite);
}
