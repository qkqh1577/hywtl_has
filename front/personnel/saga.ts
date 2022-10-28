import {
  call,
  fork,
  put,
  take
} from 'redux-saga/effects';
import { personnelAction } from 'personnel/action';
import Page from 'type/Page';
import {
  PersonnelShortVO,
  PersonnelVO,
} from 'personnel/domain';
import { personnelApi } from 'personnel/api';
import { dialogAction } from 'dialog/action';
import { getErrorMessage } from 'type/Error';

function* watchId() {
  while (true) {
    const { payload: id } = yield take(personnelAction.setId);
    if (id) {
      const detail: PersonnelVO = yield call(personnelApi.getOne, id);
      yield put(personnelAction.setOne(detail));
    }
    else {
      yield put(personnelAction.setOne(undefined));
    }
  }
}

function* watchFilter() {
  while (true) {
    const { payload: query } = yield take(personnelAction.setFilter);
    try {
      const page: Page<PersonnelShortVO> = yield call(personnelApi.getPage, query);
      yield put(personnelAction.setPage(page));
    }
    catch (e) {
      yield put(personnelAction.setPage(undefined));
    }
  }
}

function* watchUpdate() {
  while (true) {
    const { payload: params } = yield take(personnelAction.update);
    try {
      yield put(personnelAction.requestUpdate('request'));
      yield call(personnelApi.update, params);
      yield put(personnelAction.requestUpdate('done'));
      yield put(dialogAction.openAlert('변경하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(personnelAction.update, e);
      yield put(dialogAction.openError(message));
      yield put(personnelAction.requestUpdate(message));
    }
  }
}

export default function* personnelSaga() {
  yield fork(watchId);
  yield fork(watchFilter);
  yield fork(watchUpdate);
};
