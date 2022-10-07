import {
  call,
  fork,
  put,
  select,
  take
} from 'redux-saga/effects';
import {
  EstimateTemplateShort,
  EstimateTemplateVO
} from 'admin/estimate/template/domain';
import { estimateTemplateApi } from 'admin/estimate/template/api';
import { estimateTemplateAction } from 'admin/estimate/template/action';
import { ApiStatus } from 'components/DataFieldProps';
import { RootState } from 'services/reducer';

function* watchFilter() {
  while (true) {
    const { payload: query } = yield take(estimateTemplateAction.setFilter);
    const list: EstimateTemplateShort[] = yield  call(estimateTemplateApi.getList, query);
    yield put(estimateTemplateAction.setList(list));
  }
}

function* watchId() {
  while (true) {
    const { payload: id } = yield take(estimateTemplateAction.setId);
    if (id) {
      const detail: EstimateTemplateVO = yield  call(estimateTemplateApi.getOne, id);
      yield put(estimateTemplateAction.setOne(detail));
    }
    else {
      yield put(estimateTemplateAction.setOne(undefined));
    }
  }
}

function* watchUpsert() {
  while (true) {
    const { payload: params } = yield take(estimateTemplateAction.upsert);
    try {
      yield put(estimateTemplateAction.requestUpsert(ApiStatus.REQUEST));
      yield call(estimateTemplateApi.upsert, params);
      yield put(estimateTemplateAction.requestUpsert(ApiStatus.DONE));
    }
    catch (e) {
      console.log(e);
      yield put(estimateTemplateAction.requestUpsert(ApiStatus.FAIL));
    }
  }
}

function* watchSeq() {
  while (true) {
    const { payload: idList } = yield take(estimateTemplateAction.changeSeq);
    try {
      yield put(estimateTemplateAction.requestChangeSeq(ApiStatus.REQUEST));
      yield call(estimateTemplateApi.changeSeq, idList);
      yield put(estimateTemplateAction.requestChangeSeq(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(estimateTemplateAction.requestChangeSeq(ApiStatus.FAIL));
    }
  }
}

function* watchDelete() {
  while (true) {
    yield take(estimateTemplateAction.deleteOne);
    try {
      const { id } = yield select((root: RootState) => root.estimateTemplate);
      yield put(estimateTemplateAction.requestDelete(ApiStatus.REQUEST));
      yield call(estimateTemplateApi.deleteOne, id);
      yield put(estimateTemplateAction.requestDelete(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(estimateTemplateAction.requestDelete(ApiStatus.FAIL));
    }
  }
}

export default function* estimateTemplateSaga() {
  yield fork(watchFilter);
  yield fork(watchId);
  yield fork(watchUpsert);
  yield fork(watchSeq);
  yield fork(watchDelete);
}