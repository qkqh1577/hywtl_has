import { ActionType } from 'typesafe-actions';
import { projectActions, ProjectActionType } from 'services/project/actions';
import Page from 'components/Page';
import Project, { ListProject, ProjectBasic, ProjectBuilding } from 'services/project/entity';
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

function* getBasic(action: ActionType<typeof projectActions.getBasic>) {
  const data: ProjectBasic = yield projectApi.getBasic(action.payload);
  yield put(projectActions.setBasic(data));
}

function* getBuilding(action: ActionType<typeof projectActions.getBuilding>) {
  try {
    const data: ProjectBuilding = yield projectApi.getBuilding(action.payload);
    yield put(projectActions.setBuilding(data));
  } catch (e) {
    // nothing to do
  }
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

function* updateBasic(action: ActionType<typeof projectActions.updateBasic>) {
  const { projectId, params, callback } = action.payload;
  try {
    const data: ProjectBasic = yield projectApi.updateBasic(projectId, params);
    callback(data);
  } catch (e) {
    callback();
  }
}

function* updateBuilding(action: ActionType<typeof projectActions.updateBuilding>) {
  const { projectId, params, callback } = action.payload;
  try {
    const data: ProjectBuilding = yield projectApi.updateBuilding(projectId, params);
    callback(data);
  } catch (e) {
    callback();
  }
}

export default function* saga() {
  yield takeLatest(ProjectActionType.getPage, getPage);
  yield takeLatest(ProjectActionType.getOne, getOne);
  yield takeLatest(ProjectActionType.getBasic, getBasic);
  yield takeLatest(ProjectActionType.getBuilding, getBuilding);
  yield takeLatest(ProjectActionType.add, add);
  yield takeLatest(ProjectActionType.updateBasic, updateBasic);
  yield takeLatest(ProjectActionType.updateBuilding, updateBuilding);
}
