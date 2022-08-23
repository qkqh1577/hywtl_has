import {
  estimateContentAction,
  EstimateContentAction
} from 'admin/estimate/content/action';
import {
  EstimateContentShort,
  EstimateContentVO
} from 'admin/estimate/content/domain';
import { estimateContentApi } from 'admin/estimate/content/api';
import {
  call,
  fork,
  put,
  take
} from 'redux-saga/effects';
import { dialogActions } from 'components/Dialog';

function* watchFilter() {
  while (true) {
    const { payload: formik } = yield take(EstimateContentAction.setFilter);
    const list: EstimateContentShort[] = yield call(estimateContentApi.getList, formik.values);
    yield put(estimateContentAction.setList(list));
    yield call(formik.setSubmitting, false);
  }
}

function* watchId() {
  while (true) {
    const { id } = yield take(EstimateContentAction.setOne);
    const detail: EstimateContentVO = yield call(estimateContentApi.getOne, id);
    yield put(estimateContentAction.setOne(detail));
  }
}

function* watchUpsert() {
  while (true) {
    const { payload: formik } = yield take(EstimateContentAction.upsert);
    try {
      yield call(estimateContentApi.upsert, formik.values);
      yield put(dialogActions.openAlert('저장했습니다.'));
      yield put({
        type: EstimateContentAction.setOne,
        id:   formik.values.id,
      });
    }
    catch (e) {
      yield put(dialogActions.openAlert({
        children: '저장에 실패했습니다.',
        status:   'error',
      }));
    }
    finally {
      yield call(formik.setSubmitting, false);
    }
  }
}

export default function* estimateContentSaga() {
  yield fork(watchFilter);
  yield fork(watchId);
  yield fork(watchUpsert);
};
