import { ActionType } from 'typesafe-actions';
import { departmentActions, DepartmentActionType } from 'department/actions';
import { put, takeLatest } from 'redux-saga/effects';
import Department from 'department/Department';
import departmentApi from 'department/DepartmentApi';


function* getOne(action: ActionType<typeof departmentActions.getOne>) {
  const data: Department = yield departmentApi.getOne(action.payload);
  yield put(departmentActions.setOne(data));
}

function* add(action: ActionType<typeof departmentActions.add>) {
  const data: Department = yield departmentApi.add(action.payload);
  yield put(departmentActions.setOne(data));
}

export default function* saga() {
  yield takeLatest(DepartmentActionType.getOne, getOne);
  yield takeLatest(DepartmentActionType.add, add);
}
