import { ActionType } from 'typesafe-actions';
import { put, takeLatest } from 'redux-saga/effects';
import Page from 'components/Page';
import {
  Department,
  DepartmentActionType,
  DepartmentShort,
  departmentActions,
  departmentApi,
} from 'services/department';

function* getAll() {
  const list: DepartmentShort[] = yield departmentApi.getAll();
  yield put(departmentActions.setAll(list));
}

function* getPage(action: ActionType<typeof departmentActions.getPage>) {
  const page: Page<DepartmentShort> = yield departmentApi.getPage(action.payload);
  yield put(departmentActions.setPage(page));
}

function* getOne(action: ActionType<typeof departmentActions.getOne>) {
  const data: Department = yield departmentApi.getOne(action.payload);
  yield put(departmentActions.setOne(data));
}

function* upsert(action: ActionType<typeof departmentActions.upsert>) {
  const { params, callback } = action.payload;
  try {
    const data: Department = yield departmentApi.upsert(params);
    yield put(departmentActions.setOne(data));
    callback(data);
  } catch (e) {
    callback();
  }
}

function* changeTree(action: ActionType<typeof departmentActions.changeTree>) {
  const { params, callback } = action.payload;
  try {
    const list: DepartmentShort[] = yield departmentApi.changeTree(params);
    yield put(departmentActions.setAll(list));
    callback(list);
  } catch (e) {
    callback();
  }
}

export default function* departmentSaga() {
  yield takeLatest(DepartmentActionType.getAll, getAll);
  yield takeLatest(DepartmentActionType.getPage, getPage);
  yield takeLatest(DepartmentActionType.getOne, getOne);
  yield takeLatest(DepartmentActionType.upsert, upsert);
  yield takeLatest(DepartmentActionType.changeTree, changeTree);
}
