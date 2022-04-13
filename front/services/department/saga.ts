import { ActionType } from 'typesafe-actions';
import { departmentActions, DepartmentActionType } from './actions';
import { put, takeLatest } from 'redux-saga/effects';
import Department, { ListDepartment } from './Department';
import departmentApi from './api';
import Page from 'common/Page';

function* getAll() {
  const list: Department[] = yield departmentApi.getAll();
  yield put(departmentActions.setAll(list));
}

function* getPage(action: ActionType<typeof departmentActions.getPage>) {
  const page: Page<ListDepartment> = yield departmentApi.getPage(action.payload);
  yield put(departmentActions.setPage(page));
}

function* getOne(action: ActionType<typeof departmentActions.getOne>) {
  const data: Department = yield departmentApi.getOne(action.payload);
  yield put(departmentActions.setOne(data));
}

function* add(action: ActionType<typeof departmentActions.add>) {
  const data: Department = yield departmentApi.add(action.payload);
  yield put(departmentActions.setOne(data));
}

function* change(action: ActionType<typeof departmentActions.change>) {
  const { params, callback } = action.payload;
  try {
    const data: Department = yield departmentApi.change(params);
    yield put(departmentActions.setOne(data));
    callback(true);
  } catch (e) {
    callback();
  }
}

function* changeParent(action: ActionType<typeof departmentActions.changeParent>) {
  const { params, callback } = action.payload;
  try {
    const data: Department = yield departmentApi.changeParent(params);
    yield put(departmentActions.setOne(data));
    callback(true);
  } catch (e) {
    callback();
  }
}

export default function* saga() {
  yield takeLatest(DepartmentActionType.getAll, getAll);
  yield takeLatest(DepartmentActionType.getPage, getPage);
  yield takeLatest(DepartmentActionType.getOne, getOne);
  yield takeLatest(DepartmentActionType.add, add);
  yield takeLatest(DepartmentActionType.change, change);
  yield takeLatest(DepartmentActionType.changeParent, changeParent);
}
