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
  DocumentVO
} from 'project/document/domain';
import { documentApi } from 'project/document/api';

function* watchGetAllList() {
  while (true) {
    // yield take(DocumentAction.setList);
    // const { projectId } = yield take(DocumentAction.setOne);
    // const list: DocumentShort[] = yield call(documentApi.getList, {type: 'received'});
  }
}

function* watchSentList() {
  while (true) {

  }
}

function* watchBuildingList() {
  while (true) {

  }
}

function* watchId() {
  while (true) {
    const { id } = yield take(DocumentAction.setOne);
    const detail: DocumentVO = yield call(documentApi.getOne, id);
    yield put(documentAction.setOne(detail));
  }
}

export default function* documentSaga() {
  // yield fork(watchReceivedList);
  // yield fork(watchSentList);
  // yield fork(watchBuildingList);
  yield fork(watchId);
};
