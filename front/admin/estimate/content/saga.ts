import {
  estimateContentAction,
  EstimateContentAction
} from 'admin/estimate/content/action';
import { EstimateContentShort } from 'admin/estimate/content/domain';
import { estimateContentApi } from 'admin/estimate/content/api';
import {
  call,
  fork,
  put,
  take
} from 'redux-saga/effects';

function* watchFilter() {
  while (true) {
    const { payload: formik } = yield take(EstimateContentAction.setFilter);
    const list: EstimateContentShort[] = yield call(estimateContentApi.getList, formik.values);
    yield put(estimateContentAction.setList(list));
    yield call(formik.setSubmitting, false);
  }
}

export default function* estimateContentSaga() {
  yield fork(watchFilter);
};
