import {
  call,
  fork,
  put,
  take
} from 'redux-saga/effects';
import {
  BusinessAction,
  businessAction
} from 'business/action';
import Page from 'type/Page';
import {
  BusinessShort,
  BusinessVO,
  InvolvedProjectVO,
  RivalProjectVO
} from 'business/domain';
import { businessApi } from 'business/api';
import { dialogActions } from 'components/Dialog';

function* watchFilter() {
  while (true) {
    const { payload: formik } = yield take('business/filter/set');
    try {
      const page: Page<BusinessShort> = yield call(businessApi.getPage, formik.values);
      yield put(businessAction.setPage(page));
    }
    catch (e) {
      yield put(businessAction.setPage(undefined));
    }
    finally {
      yield call(formik.setSubmitting, false);
    }
  }
}

function* watchRegistrationNumber() {
  while (true) {
    const { payload: formik } = yield take('business/registration-number/set');
    try {
      const page: Page<BusinessShort> = yield call(businessApi.getPage, formik.values);
      /* 사업자 등록 번호 중복 확인 로직 */
      // page.content.filter(business => business.registrationNumber === )
      yield put(businessAction.setPage(page));
    }
    catch (e) {
      yield put(businessAction.setPage(undefined));
    }
    finally {
      yield call(formik.setSubmitting, false);
    }
  }
}

function* watchList() {
  while (true) {
    yield take('business/list/request');
    const list: BusinessShort[] = yield call(businessApi.getList);
    yield put(businessAction.setList(list));
  }
}

function* watchInvolvedProjectList() {
  while (true) {
    const { id } = yield take('business/id/involved-project-list/request');
    const list: InvolvedProjectVO[] = yield call(businessApi.getInvolvedProjectList, id);
    yield put(businessAction.setInvolvedProjectList(list));
  }
}

function* watchRivalProjectList() {
  while (true) {
    const { id } = yield take('business/id/rival-project-list/request');
    const list: RivalProjectVO[] = yield call(businessApi.getRivalProjectList, id);
    yield put(businessAction.setRivalProjectList(list));
  }
}

function* watchId() {
  while (true) {
    const { id } = yield take('business/id/set');
    const detail: BusinessVO = yield call(businessApi.getOne, id);
    yield put(businessAction.setOne(detail));
  }
}

function* watchUpsert() {
  while (true) {
    const { payload: formik } = yield take(BusinessAction.upsert);
    try {
      yield call(businessApi.upsert, formik.values);
      yield put(dialogActions.openAlert('저장하였습니다.'));
      yield put({
        type: 'business/id/set',
        id:   formik.values.id,
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

export default function* businessSaga() {
  yield fork(watchFilter);
  yield fork(watchRegistrationNumber);
  yield fork(watchList);
  yield fork(watchInvolvedProjectList);
  yield fork(watchRivalProjectList);
  yield fork(watchId);
  yield fork(watchUpsert);
};
