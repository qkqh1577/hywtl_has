import {
  estimateContentAction,
  EstimateContentAction
} from 'admin/estimate/content/action';
import {
  EstimateContentShort,
  EstimateContentVariableVO,
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

function* watchSeq() {
  while (true) {
    const { payload: idList } = yield take(EstimateContentAction.changeSeq);
    try {
      yield call(estimateContentApi.changeSeq, idList);
      yield put(dialogActions.openAlert('저장하였습니다.'));
    }
    catch (e) {
      yield put(dialogActions.openAlert({
        children: '저장에 실패하였습니다.',
        status:   'error',
      }));
    }
  }
}

function* watchDelete() {
  while (true) {
    const { payload: id } = yield take(EstimateContentAction.delete);
    try {
      yield call(estimateContentApi.delete, id);
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

function* watchVariableList() {
  while (true) {
    yield take(EstimateContentAction.setVariableList);
    const list: EstimateContentVariableVO[] = yield call(estimateContentApi.getVariableList);
    yield put(estimateContentAction.setVariableList(list));
  }
}

export default function* estimateContentSaga() {
  yield fork(watchFilter);
  yield fork(watchId);
  yield fork(watchUpsert);
  yield fork(watchSeq);
  yield fork(watchDelete);
  yield fork(watchVariableList);
};
