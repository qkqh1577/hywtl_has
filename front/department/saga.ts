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
import { dialogAction } from 'dialog/action';
import { getErrorMessage } from 'type/Error';

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
      yield put(departmentAction.requestUpsert('request'));
      yield call(departmentApi.upsert, params);
      yield put(departmentAction.requestUpsert('done'));
      if (params.id) {
        yield put(dialogAction.openAlert('변경하였습니다.'));
      }
      else {
        yield put(dialogAction.openAlert('등록하였습니다.'));
      }
    }
    catch (e) {
      const message = getErrorMessage(departmentAction.upsert, e);
      yield put(dialogAction.openError(message));
      yield put(departmentAction.requestUpsert(message));
    }
  }
}

function* watchDelete() {
  while (true) {
    const { payload: id } = yield take(departmentAction.deleteOne);
    try {
      yield put(departmentAction.requestDelete('request'));
      yield call(departmentApi.deleteOne, id);
      yield put(departmentAction.requestDelete('done'));
      yield put(dialogAction.openAlert('삭제하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(departmentAction.deleteOne, e);
      yield put(dialogAction.openError(message));
      yield put(departmentAction.requestDelete(message));
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