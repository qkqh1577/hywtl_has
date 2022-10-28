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
  ProjectDocumentVO
} from 'project_document/domain';
import { projectDocumentApi } from 'project_document/api';
import { dialogAction } from 'dialog/action';
import { RootState } from 'services/reducer';
import { getErrorMessage } from 'type/Error';

function* watchProjectId() {
  while (true) {
    const { payload: id } = yield take(projectDocumentAction.setProjectId);
    if (id) {
      const list: ProjectDocumentShortVO[] = yield call(projectDocumentApi.getSentList, id);
      yield put(projectDocumentAction.setSentList(list));
    }
    else {
      yield put(projectDocumentAction.setSentList(undefined));
    }
    if (id) {
      const list: ProjectDocumentShortVO[] = yield call(projectDocumentApi.getReceivedList, id);
      yield put(projectDocumentAction.setReceivedList(list));
    }
    else {
      yield put(projectDocumentAction.setReceivedList(undefined));
    }
    if (id) {
      const list: ProjectDocumentShortVO[] = yield call(projectDocumentApi.getBuildingList, id);
      yield put(projectDocumentAction.setBuildingList(list));
    }
    else {
      yield put(projectDocumentAction.setBuildingList(undefined));
    }
  }
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
      yield put(projectDocumentAction.requestAdd('request'));
      const { projectId, addModal } = yield select((root: RootState) => root.projectDocument);
      if (!projectId) {
        const message = '프로젝트가 선택되지 않았습니다.';
        yield put(dialogAction.openError(message));
        yield put(projectDocumentAction.requestAdd(message));
        continue;
      }
      if (!addModal) {
        const message = '자료 형식이 선택되지 않았습니다.';
        yield put(dialogAction.openError(message));
        yield put(projectDocumentAction.requestAdd(message));
        continue;
      }
      yield call(projectDocumentApi.add, projectId, addModal, params);
      yield put(projectDocumentAction.requestAdd('done'));
      yield put(dialogAction.openAlert('등록하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(projectDocumentAction.add, e);
      yield put(dialogAction.openError(message));
      yield put(projectDocumentAction.requestAdd(message));
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
      yield put(dialogAction.openAlert('변경하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(projectDocumentAction.change, e);
      yield put(dialogAction.openError(message));
      yield put(projectDocumentAction.requestChange(message));
    }
  }
}

function* watchDelete() {
  while (true) {
    yield take(projectDocumentAction.deleteOne);
    try {
      yield put(projectDocumentAction.requestDelete('request'));
      const { id } = yield select((root: RootState) => root.projectDocument);
      if (!id) {
        const message = '자료가 선택되지 않았습니다.';
        yield put(dialogAction.openError(message));
        yield put(projectDocumentAction.requestDelete(message));
        continue;
      }
      yield call(projectDocumentApi.deleteOne, id);
      yield put(projectDocumentAction.requestDelete('done'));
      yield put(dialogAction.openAlert('삭제하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(projectDocumentAction.deleteOne, e);
      yield put(dialogAction.openError(message));
      yield put(projectDocumentAction.requestDelete(message));
    }
  }
}

export default function* documentSaga() {
  yield fork(watchProjectId);
  yield fork(watchId);
  yield fork(watchAdd);
  yield fork(watchChange);
  yield fork(watchDelete);
};
