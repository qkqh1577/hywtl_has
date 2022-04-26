import { ActionType } from 'typesafe-actions';
import { projectActions, ProjectActionType } from 'services/project/actions';
import Page from 'components/Page';
import Project, { ListProject } from 'services/project/entity';
import projectApi from 'services/project/api';
import { put, takeLatest } from 'redux-saga/effects';

function* getPage(action: ActionType<typeof projectActions.getPage>) {
  const page: Page<ListProject> = yield projectApi.getPage(action.payload);
  yield put(projectActions.setPage(page));
}

function* getOne(action: ActionType<typeof projectActions.getOne>) {
  const data: Project = yield projectApi.getOne(action.payload);
  yield put(projectActions.setOne(data));
}

function* add(action: ActionType<typeof projectActions.add>) {
  const { params, callback } = action.payload;
  try {
    const data: Project = yield projectApi.add(params);
    callback(data);
  } catch (e) {
    callback();
  }
}

export default function* saga() {
  yield takeLatest(ProjectActionType.getPage, getPage);
  yield takeLatest(ProjectActionType.getOne, getOne);
  yield takeLatest(ProjectActionType.add, add);
}
