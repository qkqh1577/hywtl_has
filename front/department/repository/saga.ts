import {
  DepartmentAction,
  departmentAction
} from 'department/domain/action';
import {
  call,
  fork,
  put,
  take,
} from 'redux-saga/effects';
import Page from 'type/Page';
import {
  DepartmentShort,
  DepartmentVO
} from 'department/domain/department';
import { departmentApi } from 'department/repository/api';
import { dialogActions } from 'components/Dialog';

function* watchFilter() {
  while (true) {
    const { payload: formik } = yield take('department/filter/set');
    try {
      const page: Page<DepartmentShort> = yield call(departmentApi.getPage, formik.values);
      yield put(departmentAction.setPage(page));
    }
    catch (e) {
      yield put(departmentAction.setPage(undefined));
    }
    finally {
      formik.setSubmitting(false);
    }
  }
}

function* watchList() {
  while (true) {
    yield take('department/list/request');
    const list: DepartmentShort[] = yield call(departmentApi.getList);
    yield put(departmentAction.setList(list));
  }
}

function* watchId() {
  while (true) {
    const { id } = yield take('department/id/set');
    const detail: DepartmentVO = yield call(departmentApi.getOne, id);
    yield put(departmentAction.setOne(detail));
  }
}

function* watchUpsert() {
  while (true) {
    const { payload: formik } = yield take(DepartmentAction.upsert);
    try {
      yield call(departmentApi.upsert, formik.values);
      yield put(dialogActions.openAlert('저장하였습니다.'));
      yield put({
        type: 'department/id/set',
        id:   formik.values.id
      });
    }
    catch (e) {
      console.log(e);
      yield put(dialogActions.openAlert({
        children: '저장에 실패하였습니다.',
        status:   'error'
      }));
    }
    finally {
      formik.setSubmitting(false);
    }
  }
}

export default function* departmentSaga() {
  yield fork(watchFilter);
  yield fork(watchList);
  yield fork(watchId);
  yield fork(watchUpsert);
}