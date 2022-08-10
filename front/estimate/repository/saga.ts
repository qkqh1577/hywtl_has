import {
  call,
  fork,
  put,
  take
} from 'redux-saga/effects';
import {
  EstimateTemplateShort,
  EstimateTemplateVO
} from 'estimate/domain/template';
import { estimateTemplateApi } from 'estimate/repository/api';
import { estimateTemplateAction } from 'estimate/domain/action';

function* watchFilter() {
  while (true) {
    const { payload: formik } = yield take('estimate/template/filter/set');
    const list: EstimateTemplateShort[] = yield  call(estimateTemplateApi.getList, formik.values);
    yield put(estimateTemplateAction.setList(list));
    yield call(formik.setSubmitting, false);
  }
}

function* watchId() {
  while (true) {
    const { id } = yield take('estimate/template/id/set');
    const detail: EstimateTemplateVO = yield  call(estimateTemplateApi.getOne, id);
    yield put(estimateTemplateAction.setOne(detail));
  }
}

export default function* estimateTemplateSaga() {
  yield fork(watchFilter);
  yield fork(watchId);
}