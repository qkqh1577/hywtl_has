import { ActionType } from 'typesafe-actions';
import { put, takeLatest } from 'redux-saga/effects';
import Page from 'services/common/domain/Page';
import {
  ProjectComment,
  ProjectCommentActionType,
  projectCommentActions,
  projectCommentApi,
} from 'services/project_comment';

function* getPage(action: ActionType<typeof projectCommentActions.getPage>) {
  const page: Page<ProjectComment> = yield projectCommentApi.getPage(action.payload);
  yield put(projectCommentActions.setPage(page));
}

function* add(action: ActionType<typeof projectCommentActions.add>) {
  const { params, callback } = action.payload;
  try {
    const data: ProjectComment = yield projectCommentApi.add(params);
    callback(data);
  } catch (e) {
    callback();
  }
}

function* change(action: ActionType<typeof projectCommentActions.change>) {
  const { params, callback } = action.payload;
  try {
    const data: ProjectComment = yield projectCommentApi.change(params);
    callback(data);
  } catch (e) {
    callback();
  }
}

function* remove(action: ActionType<typeof projectCommentActions.remove>) {
  const { id, callback } = action.payload;
  try {
    yield projectCommentApi.remove(id);
    callback();
  } catch (e) {
    callback();
  }
}

export default function* projectCommentSaga() {
  yield takeLatest(ProjectCommentActionType.getPage, getPage);
  yield takeLatest(ProjectCommentActionType.add, add);
  yield takeLatest(ProjectCommentActionType.change, change);
  yield takeLatest(ProjectCommentActionType.remove, remove);
}
