import {
  documentAction,
  DocumentAction
} from 'project/document/action';
import {
  call,
  fork,
  put,
  take
} from 'redux-saga/effects';
import {
  DocumentShort,
  DocumentVO
} from 'project/document/domain';
import { documentApi } from 'project/document/api';
import { ProjectId } from 'project/domain';

function* watchAllList() {
  while (true) {
    const { payload: id } = yield take(documentAction.setAllList);
    yield fork(fetchSentList, id);
    yield fork(fetchReceivedList, id);
    yield fork(fetchBuildingList, id);
  }
}

function* fetchSentList(id: ProjectId) {
  const list: DocumentShort[] = yield call(documentApi.getSentList, id);
  yield put(documentAction.setSentList(list));
}

function* fetchReceivedList(id: ProjectId) {
  const list: DocumentShort[] = yield call(documentApi.getReceivedList, id);
  yield put(documentAction.setReceivedList(list));
}

function* fetchBuildingList(id: ProjectId) {
  const list: DocumentShort[] = yield call(documentApi.getBuildingList, id);
  yield put(documentAction.setBuildingList(list));
}

function* watchId() {
  while (true) {
    const { id } = yield take(DocumentAction.setOne);
    const detail: DocumentVO = yield call(documentApi.getOne, id);
    yield put(documentAction.setOne(detail));
  }
}

export default function* documentSaga() {
  yield fork(watchAllList);
  yield fork(watchId);
};
