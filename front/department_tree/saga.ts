import { ActionType } from 'typesafe-actions';
import { put, takeLatest } from 'redux-saga/effects';
import departmentApi from './api';
import Department, { ListDepartment } from './entity';
import Page from 'type/Page';
import { departmentTreeActions, DepartmentActionType } from './action';

function* getAll() {
  const list: ListDepartment[] = yield departmentApi.getAll();
  yield put(departmentTreeActions.setAll(list));
}

function* getPage(action: ActionType<typeof departmentTreeActions.getPage>) {
  const page: Page<ListDepartment> = yield departmentApi.getPage(action.payload);
  yield put(departmentTreeActions.setPage(page));
}

function* getOne(action: ActionType<typeof departmentTreeActions.getOne>) {
  const data: Department = yield departmentApi.getOne(action.payload);
  yield put(departmentTreeActions.setOne(data));
}

function* add(action: ActionType<typeof departmentTreeActions.add>) {
  const { params, callback } = action.payload;
  try {
    const data: Department = yield departmentApi.add(params);
    yield put(departmentTreeActions.setOne(data));
    callback(data);
  } catch (e) {
    callback();
  }
}

function* change(action: ActionType<typeof departmentTreeActions.change>) {
  const { params, callback } = action.payload;
  try {
    const data: Department = yield departmentApi.change(params);
    yield put(departmentTreeActions.setOne(data));
    callback(data);
  } catch (e) {
    callback();
  }
}

function* changeTree(action: ActionType<typeof departmentTreeActions.changeTree>) {
  const { params, callback } = action.payload;
  try {
    const list: ListDepartment[] = yield departmentApi.changeTree(params);
    yield put(departmentTreeActions.setAll(list));
    yield put(departmentTreeActions.getAll());
    callback(true);
  } catch (e) {
    callback(false);
  }
}

export default function* departmentTreeSaga() {
  yield takeLatest(DepartmentActionType.getAll, getAll);
  yield takeLatest(DepartmentActionType.getPage, getPage);
  yield takeLatest(DepartmentActionType.getOne, getOne);
  yield takeLatest(DepartmentActionType.add, add);
  yield takeLatest(DepartmentActionType.change, change);
  yield takeLatest(DepartmentActionType.changeTree, changeTree);
}
