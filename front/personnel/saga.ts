import {
  call,
  fork,
  put,
  take
} from 'redux-saga/effects';
import { personnelAction } from 'personnel/action';
import Page from 'type/Page';
import { PersonnelVO } from 'personnel/domain';
import { personnelApi } from 'personnel/api';

function* watchFilter() {
  while (true) {
    const { payload: formik } = yield take(personnelAction.setFilter);
    try {
      const page: Page<PersonnelVO> = yield call(personnelApi.getPage, formik.values);
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

export default function* personnelSaga() {
  yield fork(watchFilter);
};
