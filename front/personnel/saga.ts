import {
  call,
  fork,
  put,
  take
} from 'redux-saga/effects';
import {
  PersonnelAction,
  personnelAction
} from 'personnel/action';
import Page from 'type/Page';
import {
  PersonnelShortVO,
  PersonnelVO,
} from 'personnel/domain';
import { personnelApi } from 'personnel/api';
import { dialogActions } from 'components/Dialog';

function* watchId() {
  while (true) {
    const { id } = yield take(PersonnelAction.setId);
    const detail: PersonnelVO = yield call(personnelApi.getOne, id);
    yield put(personnelAction.setOne(detail));
  }
}

function* watchFilter() {
  while (true) {
    const { payload: formik } = yield take(personnelAction.setFilter);
    try {
      const page: Page<PersonnelShortVO> = yield call(personnelApi.getPage, formik.values);
      yield put(personnelAction.setPage(page));
    }
    catch (e) {
      yield put(personnelAction.setPage(undefined));
    }
    finally {
      yield call(formik.setSubmitting, false);
    }
  }
}

function* watchUpdate() {
  while (true) {
    const { payload: formik } = yield take(PersonnelAction.update);
    try {
      yield call(personnelApi.update, formik.values);
      yield put(dialogActions.openAlert('저장하였습니다.'));
      yield put({
        type: PersonnelAction.setId,
        id:   formik.values.id
      });
    }
    catch (e) {
      yield put(dialogActions.openAlert({
        children: '저장에 실패하였습니다.',
        status:   'error',
      }));
    }
    finally {
      yield call(formik.setSubmitting, false);
    }
  }
}

export default function* personnelSaga() {
  yield fork(watchId);
  yield fork(watchFilter);
  yield fork(watchUpdate);
};
