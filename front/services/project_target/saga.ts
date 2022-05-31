import { ActionType } from 'typesafe-actions';
import { put, takeLatest } from 'redux-saga/effects';
import {
  ProjectTarget,
  ProjectTargetActionType,
  ProjectTargetShort,
  projectTargetActions,
  projectTargetApi,
} from 'services/project_target';


function* getList(action: ActionType<typeof projectTargetActions.getList>) {
  const list: ProjectTargetShort[] = yield projectTargetApi.getList(action.payload);
  yield put(projectTargetActions.setList(list));
}

function* getOne(action: ActionType<typeof projectTargetActions.getOne>) {
  const data: ProjectTarget = yield projectTargetApi.getOne(action.payload);
  yield put(projectTargetActions.setOne(data));
}

function* add(action: ActionType<typeof projectTargetActions.add>) {
  const { projectId, params, callback } = action.payload;
  try {
    yield projectTargetApi.add(projectId, params);
    callback();
  } catch (e) {
    // nothing to do
  }
}

function* update(action: ActionType<typeof projectTargetActions.update>) {
  const { id, params, callback } = action.payload;
  try {
    yield projectTargetApi.update(id, params);
    callback();
  } catch (e) {
    // nothing to do
  }
}

function* remove(action: ActionType<typeof projectTargetActions.remove>) {
  const { id, callback } = action.payload;
  try {
    yield projectTargetApi.remove(id);
    callback();
  } catch (e) {
    // nothing to do
  }
}

export default function* projectTargetSaga() {
  yield takeLatest(ProjectTargetActionType.getList, getList);
  yield takeLatest(ProjectTargetActionType.getOne, getOne);
  yield takeLatest(ProjectTargetActionType.add, add);
  yield takeLatest(ProjectTargetActionType.update, update);
  yield takeLatest(ProjectTargetActionType.remove, remove);
}
