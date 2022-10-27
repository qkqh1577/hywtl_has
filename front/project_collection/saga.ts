import {
  call,
  fork,
  put,
  select,
  take
} from 'redux-saga/effects';
import { projectCollectionAction } from 'project_collection/action';
import {
  ProjectCollectionStageVO,
  ProjectCollectionVO
} from 'project_collection/domain';
import { projectCollectionApi } from 'project_collection/api';
import { RootState } from 'services/reducer';
import { ApiStatus } from 'components/DataFieldProps';

function* watchProjectId() {
  while (true) {
    const { payload: projectId } = yield take(projectCollectionAction.setProjectId);
    if (projectId) {
      const detail: ProjectCollectionVO = yield call(projectCollectionApi.getOne, projectId);
      yield put(projectCollectionAction.setOne(detail));
    }
    else {
      yield put(projectCollectionAction.setOne(undefined));
    }
  }
}

function* watchId() {
  while (true) {
    const { payload: id } = yield take(projectCollectionAction.stageDetailModal);
    if (id) {
      const detail: ProjectCollectionStageVO = yield call(projectCollectionApi.getStage, id);
      yield put(projectCollectionAction.setStage(detail));
    }
    else {
      yield put(projectCollectionAction.setStage(undefined));
    }
  }
}

function* watchUpdateManager() {
  while (true) {
    const { payload: userId } = yield take(projectCollectionAction.updateManager);
    try {
      const { projectId } = yield select((root: RootState) => root.projectCollection);
      yield put(projectCollectionAction.requestUpdateManager('request'));
      yield call(projectCollectionApi.updateManager, projectId, userId);
      yield put(projectCollectionAction.requestUpdateManager('done'));
    }
    catch (e) {
      yield put(dialogAction.openError(message));
      yield put(projectCollectionAction.requestUpdateManager(message));
    }
  }
}

function* watchChangeStageSeq() {
  while (true) {
    const { payload: idList } = yield take(projectCollectionAction.changeStageSeq);
    try {
      const { projectId } = yield select((root: RootState) => root.projectCollection);
      yield put(projectCollectionAction.requestChangeStageSeq('request'));
      yield call(projectCollectionApi.changeStageSeq, projectId, idList);
      yield put(projectCollectionAction.requestChangeStageSeq('done'));
    }
    catch (e) {
      yield put(dialogAction.openError(message));
      yield put(projectCollectionAction.requestChangeStageSeq(message));
    }
  }
}

function* watchAddStage() {
  while (true) {
    const { payload: params } = yield take(projectCollectionAction.addStage);
    try {
      const { projectId } = yield select((root: RootState) => root.projectCollection);
      yield put(projectCollectionAction.requestAddStage('request'));
      yield call(projectCollectionApi.addStage, projectId, params);
      yield put(projectCollectionAction.requestAddStage('done'));
    }
    catch (e) {
      yield put(dialogAction.openError(message));
      yield put(projectCollectionAction.requestAddStage(message));
    }
  }
}

function* watchChangeStage() {
  while (true) {
    const { payload: params } = yield take(projectCollectionAction.changeStage);
    try {
      yield put(projectCollectionAction.requestChangeStage('request'));
      yield call(projectCollectionApi.changeStage, params);
      yield put(projectCollectionAction.requestChangeStage('done'));
    }
    catch (e) {
      yield put(dialogAction.openError(message));
      yield put(projectCollectionAction.requestChangeStage(message));
    }
  }
}

function* watchDeleteStage() {
  while (true) {
    const { payload: id } = yield take(projectCollectionAction.deleteStage);
    try {
      yield put(projectCollectionAction.requestDeleteStage('request'));
      yield call(projectCollectionApi.deleteStage, id);
      yield put(projectCollectionAction.requestDeleteStage('done'));
    }
    catch (e) {
      yield put(dialogAction.openError(message));
      yield put(projectCollectionAction.requestDeleteStage(message));
    }
  }
}

export default function* projectCollectionSaga() {
  yield fork(watchProjectId);
  yield fork(watchId);
  yield fork(watchUpdateManager);
  yield fork(watchChangeStageSeq);
  yield fork(watchAddStage);
  yield fork(watchChangeStage);
  yield fork(watchDeleteStage);
}