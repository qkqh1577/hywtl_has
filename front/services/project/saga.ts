import { ActionType } from 'typesafe-actions';
import { put, takeLatest } from 'redux-saga/effects';
import Page from 'components/Page';
import {
  Project,
  ProjectActionType,
  ProjectBasic,
  ProjectOrder,
  ProjectShort,
  projectActions,
  projectApi,
} from 'services/project';

function* getPage(action: ActionType<typeof projectActions.getPage>) {
  const page: Page<ProjectShort> = yield projectApi.getPage(action.payload);
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

function* getBasic(action: ActionType<typeof projectActions.getBasic>) {
  const data: ProjectBasic = yield projectApi.getBasic(action.payload);
  yield put(projectActions.setBasic(data));
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

function* getOrder(action: ActionType<typeof projectActions.getOrder>) {
  const data: ProjectOrder = yield projectApi.getOrder(action.payload);
  yield put(projectActions.setOrder(data));
}

function* updateOrder(action: ActionType<typeof projectActions.updateOrder>) {
  const { projectId, params, callback } = action.payload;
  try {
    const data: ProjectOrder = yield projectApi.updateOrder(projectId, params);
    callback(data);
  } catch (e) {
    callback();
  }
}

export default function* projectSaga() {
  yield takeLatest(ProjectActionType.getPage, getPage);
  yield takeLatest(ProjectActionType.getOne, getOne);
  yield takeLatest(ProjectActionType.add, add);
  yield takeLatest(ProjectActionType.getBasic, getBasic);
  yield takeLatest(ProjectActionType.updateBasic, updateBasic);
  yield takeLatest(ProjectActionType.getOrder, getOrder);
  yield takeLatest(ProjectActionType.updateOrder, updateOrder);
}
