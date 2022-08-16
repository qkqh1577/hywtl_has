import {
  call,
  fork,
  put,
  take
} from 'redux-saga/effects';
import {
  EstimateTemplateShort,
  EstimateTemplateVO
} from 'estimate_template/domain';
import { estimateTemplateApi } from 'estimate_template/api';
import { estimateTemplateAction } from 'estimate_template/action';
import { dialogActions } from 'components/Dialog';

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

function* watchUpsert() {
  while (true) {
    const { payload: formik } = yield take(estimateTemplateAction.upsert);
    try {
      yield call(estimateTemplateApi.upsert, formik.values);
      yield put(dialogActions.openAlert('저장하였습니다.'));
      yield put({
        type: 'estimate/template/id/set',
        id:   formik.values.id
      });
    }
    catch (e) {
      console.log(e);
      yield put(dialogActions.openAlert({
        children: '저장에 실패하였습니다.',
        status:   'error'
      }));
    }
    finally {
      yield call(formik.setSubmitting, false);
    }

  }
}

export default function* estimateTemplateSaga() {
  yield fork(watchFilter);
  yield fork(watchId);
  yield fork(watchUpsert);
}