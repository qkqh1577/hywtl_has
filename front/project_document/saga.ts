import { projectDocumentAction } from 'project_document/action';
import {
  call,
  fork,
  put,
  select,
  take
} from 'redux-saga/effects';
import {
  ProjectDocumentShortVO,
  ProjectDocumentType,
  ProjectDocumentVO
} from 'project_document/domain';
import { projectDocumentApi } from 'project_document/api';
import { ProjectId } from 'project/domain';
import { dialogAction } from 'dialog/action';
import { ApiStatus } from 'components/DataFieldProps';
import { RootState } from 'services/reducer';
import { DialogStatus } from 'dialog/domain';

function* watchProjectId() {
  while (true) {
    const { payload: id } = yield take(projectDocumentAction.setProjectId);
    yield call(getSentList, id);
    yield call(getReceivedList, id);
    yield call(getBuildingList, id);
  }
}

function* getSentList(id: ProjectId) {
  const list: ProjectDocumentShortVO[] = yield call(projectDocumentApi.getSentList, id);
  yield put(projectDocumentAction.setSentList(list));
}

function* getReceivedList(id: ProjectId) {
  const list: ProjectDocumentShortVO[] = yield call(projectDocumentApi.getReceivedList, id);
  yield put(projectDocumentAction.setReceivedList(list));
}

function* getBuildingList(id: ProjectId) {
  const list: ProjectDocumentShortVO[] = yield call(projectDocumentApi.getBuildingList, id);
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
      yield put(projectDocumentAction.requestAdd('request'));
      yield call(projectDocumentApi.add, projectId, addModal, params);
      yield put(projectDocumentAction.requestAdd('done'));
    }
    catch (e) {
      yield put(projectDocumentAction.requestAdd(message));
    }
  }
}

function* watchRequestAdd() {
  while (true) {
    const { payload: status } = yield take(projectDocumentAction.requestAdd);
    if (status === 'done') {
      yield put(dialogAction.openAlert('저장하였습니다.'));
      yield put(projectDocumentAction.requestAdd('idle'));
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
    else if (status === message) {
      yield put(dialogAction.openAlert({
        children: '저장에 실패하였습니다.',
        status:   DialogStatus.ERROR,
      }));
      yield put(projectDocumentAction.requestAdd('idle'));
    }
  }
}

function* watchChange() {
  while (true) {
    const { payload: params } = yield take(projectDocumentAction.change);
    try {
      yield put(projectDocumentAction.requestChange('request'));
      yield call(projectDocumentApi.change, params);
      yield put(projectDocumentAction.requestChange('done'));
    }
    catch (e) {
      yield put(dialogAction.openError(message));
      yield put(projectDocumentAction.requestChange(message));
    }
  }
}

function* watchRequestChange() {
  while (true) {
    const { payload: status } = yield take(projectDocumentAction.requestChange);
    if (status === 'done') {
      yield put(dialogAction.openAlert('저장하였습니다.'));
      yield put(projectDocumentAction.requestChange('idle'));
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
    else if (status === message) {
      yield put(dialogAction.openAlert({
        children: '저장에 실패하였습니다.',
        status:   DialogStatus.ERROR,
      }));
      yield put(projectDocumentAction.requestChange('idle'));
    }
  }
}

function* watchDelete() {
  while (true) {
    const { payload: id } = yield take(projectDocumentAction.delete);
    try {
      yield call(projectDocumentApi.delete, id);
      yield put(dialogAction.openAlert('삭제 했습니다.'));
      const { projectId } = yield select((root: RootState) => root.projectDocument);
      yield call(getSentList, projectId);
      yield call(getReceivedList, projectId);
      yield call(getBuildingList, projectId);
      yield put(projectDocumentAction.setId(undefined));
    }
    catch (e) {
      //TODO: 삭제 정책 후 수정 필요
      yield put(dialogAction.openAlert({
        children: '해당 자료는 동 정보에 연결되어 삭제할 수 없습니다. 자료를 삭제하려면, 동 정보 연결을 해제해 주세요.',
        status:   DialogStatus.ERROR,
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
