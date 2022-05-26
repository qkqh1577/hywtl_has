import { ActionType } from 'typesafe-actions';
import {
  ProjectReview,
  ProjectReviewActionType,
  ProjectReviewShort,
  projectReviewActions,
  projectReviewApi,
} from 'services/project_review';
import { put, takeLatest } from 'redux-saga/effects';

function* getList(action: ActionType<typeof projectReviewActions.getList>) {
  const list: ProjectReviewShort[] = yield projectReviewApi.getList(action.payload);
  yield put(projectReviewActions.setList(list));
}

function* getOne(action: ActionType<typeof projectReviewActions.getOne>) {
  const data: ProjectReview = yield projectReviewApi.getOne(action.payload);
  yield put(projectReviewActions.setOne(data));
}

function* add(action: ActionType<typeof projectReviewActions.add>) {
  const { projectId, params, callback } = action.payload;
  try {
    yield projectReviewApi.add(projectId, params);
    callback();
  } catch (e) {
    // nothing to do
  }
}

function* update(action: ActionType<typeof projectReviewActions.update>) {
  const { id, params, callback } = action.payload;
  try {
    yield projectReviewApi.update(id, params);
    callback();
  } catch (e) {
  }
}

function* remove(action: ActionType<typeof projectReviewActions.remove>) {
  const { id, callback } = action.payload;
  try {
    yield projectReviewApi.remove(id);
    callback();
  } catch (e) {
    // nothing to do
  }
}

export default function* projectReviewSaga() {
  yield takeLatest(ProjectReviewActionType.getList, getList);
  yield takeLatest(ProjectReviewActionType.getOne, getOne);
  yield takeLatest(ProjectReviewActionType.add, add);
  yield takeLatest(ProjectReviewActionType.update, update);
  yield takeLatest(ProjectReviewActionType.remove, remove);
}
