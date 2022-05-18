import { ActionType } from 'typesafe-actions';
import { put, takeLatest } from 'redux-saga/effects';
import {
  ListProjectTargetReview,
  ProjectTargetActionType,
  ProjectTargetDocument,
  ProjectTargetReview,
  projectTargetActions,
  projectTargetApi,
} from 'services/project_target';

function* getReviewList(action: ActionType<typeof projectTargetActions.getReviewList>) {
  const list: ListProjectTargetReview[] = yield projectTargetApi.getReviewList(action.payload);
  yield put(projectTargetActions.setReviewList(list));
}

function* getReview(action: ActionType<typeof projectTargetActions.getReview>) {
  const data: ProjectTargetReview = yield projectTargetApi.getReview(action.payload);
  yield put(projectTargetActions.setReview(data));
}

function* addReview(action: ActionType<typeof projectTargetActions.addReview>) {
  const { projectId, params, callback } = action.payload;
  try {
    yield projectTargetApi.addReview(projectId, params);
    callback();
  } catch (e) {
    // nothing to do
  }
}

function* updateReview(action: ActionType<typeof projectTargetActions.updateReview>) {
  const { id, params, callback } = action.payload;
  try {
    yield projectTargetApi.updateReview(id, params);
    callback();
  } catch (e) {
  }
}

function* removeReview(action: ActionType<typeof projectTargetActions.removeReview>) {
  const { id, callback } = action.payload;
  try {
    yield projectTargetApi.removeReview(id);
    callback();
  } catch (e) {
    // nothing to do
  }
}

function* confirmReview(action: ActionType<typeof projectTargetActions.confirmReview>) {
  const { id, callback } = action.payload;
  try {
    yield projectTargetApi.confirmReview(id);
    callback();
  } catch (e) {
    // nothing to do
  }
}

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
  yield takeLatest(ProjectTargetActionType.getReviewList, getReviewList);
  yield takeLatest(ProjectTargetActionType.getReview, getReview);
  yield takeLatest(ProjectTargetActionType.addReview, addReview);
  yield takeLatest(ProjectTargetActionType.updateReview, updateReview);
  yield takeLatest(ProjectTargetActionType.removeReview, removeReview);
  yield takeLatest(ProjectTargetActionType.confirmReview, confirmReview);
  yield takeLatest(ProjectTargetActionType.getDocumentList, getDocumentList);
  yield takeLatest(ProjectTargetActionType.getDocument, getDocument);
  yield takeLatest(ProjectTargetActionType.addDocument, addDocument);
  yield takeLatest(ProjectTargetActionType.updateDocument, updateDocument);
  yield takeLatest(ProjectTargetActionType.removeDocument, removeDocument);
}
