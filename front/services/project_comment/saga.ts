import { ActionType } from 'typesafe-actions';
import { projectCommentActions, ProjectCommentActionType } from 'services/project_comment/actions';
import Page from 'components/Page';
import ProjectComment from 'services/project_comment/entity';
import projectCommentApi from 'services/project_comment/api';
import { put, takeLatest } from 'redux-saga/effects';

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

export default function* saga() {
  yield takeLatest(ProjectCommentActionType.getPage, getPage);
  yield takeLatest(ProjectCommentActionType.add, add);
}
