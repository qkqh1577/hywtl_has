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
      yield put(projectCollectionAction.requestUpdateManager(ApiStatus.REQUEST));
      yield call(projectCollectionApi.updateManager, projectId, userId);
      yield put(projectCollectionAction.requestUpdateManager(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(projectCollectionAction.requestUpdateManager(ApiStatus.FAIL));
    }
  }
}

function* watchChangeStageSeq() {
  while (true) {
    const { payload: idList } = yield take(projectCollectionAction.changeStageSeq);
    try {
      const { projectId } = yield select((root: RootState) => root.projectCollection);
      yield put(projectCollectionAction.requestChangeStageSeq(ApiStatus.REQUEST));
      yield call(projectCollectionApi.changeStageSeq, projectId, idList);
      yield put(projectCollectionAction.requestChangeStageSeq(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(projectCollectionAction.requestChangeStageSeq(ApiStatus.FAIL));
    }
  }
}

function* watchAddStage() {
  while (true) {
    const { payload: params } = yield take(projectCollectionAction.addStage);
    try {
      const { projectId } = yield select((root: RootState) => root.projectCollection);
      yield put(projectCollectionAction.requestAddStage(ApiStatus.REQUEST));
      yield call(projectCollectionApi.addStage, projectId, params);
      yield put(projectCollectionAction.requestAddStage(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(projectCollectionAction.requestAddStage(ApiStatus.FAIL));
    }
  }
}

function* watchChangeStage() {
  while (true) {
    const { payload: params } = yield take(projectCollectionAction.changeStage);
    try {
      yield put(projectCollectionAction.requestChangeStage(ApiStatus.REQUEST));
      yield call(projectCollectionApi.changeStage, params);
      yield put(projectCollectionAction.requestChangeStage(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(projectCollectionAction.requestChangeStage(ApiStatus.FAIL));
    }
  }
}

function* watchDeleteStage() {
  while (true) {
    const { payload: id } = yield take(projectCollectionAction.deleteStage);
    try {
      yield put(projectCollectionAction.requestDeleteStage(ApiStatus.REQUEST));
      yield call(projectCollectionApi.deleteStage, id);
      yield put(projectCollectionAction.requestDeleteStage(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(projectCollectionAction.requestDeleteStage(ApiStatus.FAIL));
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