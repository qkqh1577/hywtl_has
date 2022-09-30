import { projectDocumentAction, } from 'project_document/action';
import {
  call,
  fork,
  put,
  select,
  take
} from 'redux-saga/effects';
import {
  ProjectDocumentShort,
  ProjectDocumentType,
  ProjectDocumentVO
} from 'project_document/domain';
import { projectDocumentApi } from 'project_document/api';
import { ProjectId } from 'project/domain';
import { dialogActions } from 'components/Dialog';
import { ApiStatus } from 'components/DataFieldProps';
import { RootState } from 'services/reducer';

function* watchProjectId() {
  while (true) {
    const { payload: id } = yield take(projectDocumentAction.setProjectId);
    yield call(getSentList, id);
    yield call(getReceivedList, id);
    yield call(getBuildingList, id);
  }
}

function* getSentList(id: ProjectId) {
  const list: ProjectDocumentShort[] = yield call(projectDocumentApi.getSentList, id);
  yield put(projectDocumentAction.setSentList(list));
}

function* getReceivedList(id: ProjectId) {
  const list: ProjectDocumentShort[] = yield call(projectDocumentApi.getReceivedList, id);
  yield put(projectDocumentAction.setReceivedList(list));
}

function* getBuildingList(id: ProjectId) {
  const list: ProjectDocumentShort[] = yield call(projectDocumentApi.getBuildingList, id);
  yield put(projectDocumentAction.setBuildingList(list));
}

function* watchId() {
  while (true) {
    const { payload: id } = yield take(projectDocumentAction.setId);
    if (id) {
      const detail: ProjectDocumentVO = yield call(projectDocumentApi.getOne, id);
      yield put(projectDocumentAction.setOne(detail));
    }
    else {
      yield put(projectDocumentAction.setOne(undefined));
    }
  }
}

function* watchAdd() {
  while (true) {
    const { payload: params } = yield take(projectDocumentAction.add);
    try {
      const { projectId, addModal } = yield select((root: RootState) => root.projectDocument);
      yield put(projectDocumentAction.requestAdd(ApiStatus.REQUEST));
      yield call(projectDocumentApi.add, projectId, addModal, params);
      yield put(projectDocumentAction.requestAdd(ApiStatus.DONE));
    }
    catch (e) {
      yield put(projectDocumentAction.requestAdd(ApiStatus.FAIL));
    }
  }
}

function* watchRequestAdd() {
  while (true) {
    const { payload: status } = yield take(projectDocumentAction.requestAdd);
    if (status === ApiStatus.DONE) {
      yield put(dialogActions.openAlert('저장하였습니다.'));
      yield put(projectDocumentAction.requestAdd(ApiStatus.IDLE));
      const { projectId, addModal } = yield select((root: RootState) => root.projectDocument);
      if (addModal === ProjectDocumentType.RECEIVED) {
        yield call(getReceivedList, projectId);
      }
      else if (addModal === ProjectDocumentType.SENT) {
        yield call(getSentList, projectId);
      }
      else if (addModal === ProjectDocumentType.BUILDING) {
        yield call(getBuildingList, projectId);
      }
      yield put(projectDocumentAction.addModal(undefined));
    }
    else if (status === ApiStatus.FAIL) {
      yield put(dialogActions.openAlert({
        children: '저장에 실패하였습니다.',
        status:   'error',
      }));
      yield put(projectDocumentAction.requestAdd(ApiStatus.IDLE));
    }
  }
}

function* watchChange() {
  while (true) {
    const { payload: params } = yield take(projectDocumentAction.change);
    try {
      yield put(projectDocumentAction.requestChange(ApiStatus.REQUEST));
      yield call(projectDocumentApi.change, params);
      yield put(projectDocumentAction.requestChange(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(projectDocumentAction.requestChange(ApiStatus.FAIL));
    }
  }
}

function* watchRequestChange() {
  while (true) {
    const { payload: status } = yield take(projectDocumentAction.requestChange);
    if (status === ApiStatus.DONE) {
      yield put(dialogActions.openAlert('저장하였습니다.'));
      yield put(projectDocumentAction.requestChange(ApiStatus.IDLE));
      const { projectId, detail } = yield select((root: RootState) => root.projectDocument);
      if (detail.type === ProjectDocumentType.RECEIVED) {
        yield call(getReceivedList, projectId);
      }
      else if (detail.type === ProjectDocumentType.SENT) {
        yield call(getSentList, projectId);
      }
      else if (detail.type === ProjectDocumentType.BUILDING) {
        yield call(getBuildingList, projectId);
      }
      yield put(projectDocumentAction.setId(undefined));
    }
    else if (status === ApiStatus.FAIL) {
      yield put(dialogActions.openAlert({
        children: '저장에 실패하였습니다.',
        status:   'error',
      }));
      yield put(projectDocumentAction.requestChange(ApiStatus.IDLE));
    }
  }
}

function* watchDelete() {
  while (true) {
    const { payload: id } = yield take(projectDocumentAction.delete);
    try {
      yield call(projectDocumentApi.delete, id);
      yield put(dialogActions.openAlert('삭제 했습니다.'));
      const { projectId } = yield select((root: RootState) => root.projectDocument);
      yield call(getSentList, projectId);
      yield call(getReceivedList, projectId);
      yield call(getBuildingList, projectId);
      yield put(projectDocumentAction.setId(undefined));
    }
    catch (e) {
      //TODO: 삭제 정책 후 수정 필요
      yield put(dialogActions.openAlert({
        children: '해당 자료는 동 정보에 연결되어 삭제할 수 없습니다. 자료를 삭제하려면, 동 정보 연결을 해제해 주세요.',
        status:   'error',
      }));
    }
  }
}

export default function* documentSaga() {
  yield fork(watchProjectId);
  yield fork(watchId);
  yield fork(watchAdd);
  yield fork(watchRequestAdd);
  yield fork(watchChange);
  yield fork(watchRequestChange);
  yield fork(watchDelete);
};
