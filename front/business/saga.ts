import {
  call,
  fork,
  put,
  select,
  take
} from 'redux-saga/effects';
import {
  BusinessAction,
  businessAction
} from 'business/action';
import Page from 'type/Page';
import {
  BusinessInvolvedProjectVO,
  BusinessShort,
  BusinessVO,
  RivalProjectVO
} from 'business/domain';
import { businessApi } from 'business/api';
import { dialogActions } from 'components/Dialog';
import { RootState } from 'services/reducer';

function* watchFilter() {
  while (true) {
    const { payload: query } = yield take(businessAction.setFilter);
    try {
      const page: Page<BusinessShort> = yield call(businessApi.getPage, query);
      yield put(businessAction.setPage(page));
    }
    catch (e) {
      yield put(businessAction.setPage(undefined));
    }
  }
}

function* watchRegistrationNumber() {
  while (true) {
    const { payload: registrationNumber } = yield take(businessAction.setRegistrationNumber);
    const list: BusinessShort[] = yield call(businessApi.getList, registrationNumber);
    if (list.length > 0) {
      const { detail } = yield select((root: RootState) => root.business);
      if (!detail || detail.id !== list[0].id) {
        yield put(dialogActions.openAlert({
          status:   'error',
          children: '이미 사용중인 사업자등록번호 입니다.'
        }));
        continue;
      }
    }
    yield put(dialogActions.openAlert('사용 가능합니다.'));
  }
}

function* watchInvolvedProjectList() {
  while (true) {
    const { id } = yield take('business/id/set');
    const list: BusinessInvolvedProjectVO[] = yield call(businessApi.getInvolvedProjectList, id);
    yield put(businessAction.setInvolvedProjectList(list));
  }
}

function* watchRivalProjectList() {
  while (true) {
    const { id } = yield take('business/id/set');
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

function* watchDelete() {
  while (true) {
    const { payload: id } = yield take(BusinessAction.delete);
    try {
      yield call(businessApi.delete, id);
      yield put(dialogActions.openAlert('삭제 했습니다.'));
    }
    catch (e) {
      yield put(dialogActions.openAlert({
        children: '삭제에 실패했습니다.',
        status:   'error',
      }));
    }
  }
}

export default function* businessSaga() {
  yield fork(watchFilter);
  yield fork(watchRegistrationNumber);
  yield fork(watchInvolvedProjectList);
  yield fork(watchRivalProjectList);
  yield fork(watchId);
  yield fork(watchUpsert);
  yield fork(watchDelete);
};
