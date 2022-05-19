import { ActionType } from 'typesafe-actions';
import { put, takeLatest } from 'redux-saga/effects';
import {
  ProjectTargetActionType,
  ProjectTargetDocument,
  projectTargetActions,
  projectTargetApi,
} from 'services/project_target';


function* getDocumentList(action: ActionType<typeof projectTargetActions.getDocumentList>) {
  const list: ProjectTargetDocument[] = yield projectTargetApi.getDocumentList(action.payload);
  yield put(projectTargetActions.setDocumentList(list));
}

function* getDocument(action: ActionType<typeof projectTargetActions.getDocument>) {
  const data: ProjectTargetDocument = yield projectTargetApi.getDocument(action.payload);
  yield put(projectTargetActions.setDocument(data));
}

function* addDocument(action: ActionType<typeof projectTargetActions.addDocument>) {
  const { projectId, params, callback } = action.payload;
  try {
    yield projectTargetApi.addDocument(projectId, params);
    callback();
  } catch (e) {
    // nothing to do
  }
}

function* updateDocument(action: ActionType<typeof projectTargetActions.updateDocument>) {
  const { id, params, callback } = action.payload;
  try {
    yield projectTargetApi.updateDocument(id, params);
    callback();
  } catch (e) {
    // nothing to do
  }
}

function* removeDocument(action: ActionType<typeof projectTargetActions.removeDocument>) {
  const { id, callback } = action.payload;
  try {
    yield projectTargetApi.removeDocument(id);
    callback();
  } catch (e) {
    // nothing to do
  }
}

export default function* projectTargetSaga() {
  yield takeLatest(ProjectTargetActionType.getDocumentList, getDocumentList);
  yield takeLatest(ProjectTargetActionType.getDocument, getDocument);
  yield takeLatest(ProjectTargetActionType.addDocument, addDocument);
  yield takeLatest(ProjectTargetActionType.updateDocument, updateDocument);
  yield takeLatest(ProjectTargetActionType.removeDocument, removeDocument);
}
