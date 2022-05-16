import { ActionType } from 'typesafe-actions';
import { projectEstimateActions, ProjectEstimateType } from 'services/project_estimate/actions';
import {
  ListProjectEstimateSheet,
  ProjectEstimate,
  ProjectEstimateSheet
} from 'services/project_estimate/entity';
import projectEstimateApi from 'services/project_estimate/api';
import { put, takeLatest } from 'redux-saga/effects';

function* getOne(action: ActionType<typeof projectEstimateActions.getOne>) {
  try {
    const data: ProjectEstimate | undefined = yield projectEstimateApi.getOne(action.payload);
    yield put(projectEstimateActions.setOne(data));
  } catch (e) {
    // nothing to do
  }
}

function* upsert(action: ActionType<typeof projectEstimateActions.upsert>) {
  const { params, callback } = action.payload;
  try {
    yield projectEstimateApi.upsert(params);
    callback();
  } catch (e) {
    // nothing to do
  }
}

function* getSheetList(action: ActionType<typeof projectEstimateActions.getSheetList>) {
  const list: ListProjectEstimateSheet[] = yield projectEstimateApi.getSheetList(action.payload);
  yield put(projectEstimateActions.setSheetList(list));
}

function* getSheetOne(action: ActionType<typeof projectEstimateActions.getSheetOne>) {
  const data: ProjectEstimateSheet = yield projectEstimateApi.getSheetOne(action.payload);
  yield put(projectEstimateActions.setSheetOne(data));
}

function* addSheet(action: ActionType<typeof projectEstimateActions.addSheet>) {
  const { params, callback } = action.payload;
  try {
    yield projectEstimateApi.addSheet(params);
    callback();
  } catch (e) {
    // nothing to do
  }
}

export default function* projectEstimateSaga() {
  yield takeLatest(ProjectEstimateType.getOne, getOne);
  yield takeLatest(ProjectEstimateType.upsert, upsert);
  yield takeLatest(ProjectEstimateType.getSheetList, getSheetList);
  yield takeLatest(ProjectEstimateType.getSheetOne, getSheetOne);
  yield takeLatest(ProjectEstimateType.addSheet, addSheet);
}
