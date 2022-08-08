import { ActionType } from 'typesafe-actions';
import {
  DepartmentAction,
  departmentAction
} from 'department/domain/action';
import {
  call,
  put,
  takeLatest
} from 'redux-saga/effects';
import Page from 'services/common/domain/Page';
import { DepartmentVO } from 'department/domain/department';
import { departmentApi } from 'department/repository/api';

function* getPage(action: ActionType<typeof departmentAction.getPage>) {
  const page: Page<DepartmentVO> = yield call(departmentApi.getPage, action.payload);
  yield put(departmentAction.setPage(page));
}

function* getList() {
  const list: DepartmentVO[] = yield call(departmentApi.getList);
  yield put(departmentAction.setList(list));
}

function* getOne(action: ActionType<typeof departmentAction.getOne>) {
  const detail: DepartmentVO = yield call(departmentApi.getOne, action.payload);
  yield put(departmentAction.setOne(detail));
}

function* upsert(action: ActionType<typeof departmentAction.upsert>) {
  yield call(departmentApi.upsert, action.payload);
}

export default function* departmentSaga() {
  yield  takeLatest(DepartmentAction.getPage, getPage);
  yield  takeLatest(DepartmentAction.getList, getList);
  yield  takeLatest(DepartmentAction.getOne, getOne);
  yield  takeLatest(DepartmentAction.upsert, upsert);
}