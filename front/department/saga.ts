import { departmentAction } from 'department/action';
import {
  call,
  fork,
  put,
  take,
} from 'redux-saga/effects';
import Page from 'type/Page';
import {
  DepartmentShortVO,
  DepartmentVO
} from 'department/domain';
import { departmentApi } from 'department/api';
import { ApiStatus } from 'components/DataFieldProps';

function* watchFilter() {
  while (true) {
    const { payload: query } = yield take(departmentAction.setFilter);
    try {
      const page: Page<DepartmentShortVO> = yield call(departmentApi.getPage, query);
      yield put(departmentAction.setPage(page));
    }
    catch (e) {
      yield put(departmentAction.setPage(undefined));
    }
  }
}

function* watchList() {
  while (true) {
    yield take(departmentAction.requestList);
    const list: DepartmentShortVO[] = yield call(departmentApi.getList);
    yield put(departmentAction.setList(list));
  }
}

function* watchId() {
  while (true) {
    const { payload: id } = yield take(departmentAction.setId);
    if (id) {
      const detail: DepartmentVO = yield call(departmentApi.getOne, id);
      yield put(departmentAction.setOne(detail));
    }
    else {
      yield put(departmentAction.setOne(undefined));
    }
  }
}

function* watchUpsert() {
  while (true) {
    const { payload: params } = yield take(departmentAction.upsert);
    try {
      yield put(departmentAction.requestUpsert(ApiStatus.REQUEST));
      yield call(departmentApi.upsert, params);
      yield put(departmentAction.requestUpsert(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(departmentAction.requestUpsert(ApiStatus.FAIL));
    }
  }
}

function* watchDelete() {
  while (true) {
    const { payload: id } = yield take(departmentAction.deleteOne);
    try {
      yield put(departmentAction.requestDelete(ApiStatus.REQUEST));
      yield call(departmentApi.deleteOne, id);
      yield put(departmentAction.requestDelete(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(departmentAction.requestDelete(ApiStatus.FAIL));
    }
  }
}

export default function* departmentSaga() {
  yield fork(watchFilter);
  yield fork(watchList);
  yield fork(watchId);
  yield fork(watchUpsert);
  yield fork(watchDelete);
}