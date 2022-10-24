import { estimateContentAction } from 'admin/estimate/content/action';
import {
  EstimateContentShortVO,
  EstimateContentVariableVO,
  EstimateContentVO
} from 'admin/estimate/content/domain';
import { estimateContentApi } from 'admin/estimate/content/api';
import {
  call,
  fork,
  put,
  select,
  take
} from 'redux-saga/effects';
import { RootState } from 'services/reducer';
import { ApiStatus } from 'components/DataFieldProps';

function* watchFilter() {
  while (true) {
    const { payload: query } = yield take(estimateContentAction.setFilter);
    const list: EstimateContentShortVO[] = yield call(estimateContentApi.getList, query);
    yield put(estimateContentAction.setList(list));
  }
}

function* watchId() {
  while (true) {
    const { payload: id } = yield take(estimateContentAction.setId);
    const detail: EstimateContentVO = yield call(estimateContentApi.getOne, id);
    yield put(estimateContentAction.setOne(detail));
  }
}

function* watchUpsert() {
  while (true) {
    const { payload: params } = yield take(estimateContentAction.upsert);
    try {
      yield put(estimateContentAction.requestUpsert(ApiStatus.REQUEST));
      yield call(estimateContentApi.upsert, params);
      yield put(estimateContentAction.requestUpsert(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(estimateContentAction.requestUpsert(ApiStatus.FAIL));
    }
  }
}

function* watchDelete() {
  while (true) {
    yield take(estimateContentAction.deleteOne);
    try {
      const { id } = yield select((root: RootState) => root.estimateContent);
      yield put(estimateContentAction.requestDelete(ApiStatus.REQUEST));
      yield call(estimateContentApi.delete, id);
      yield put(estimateContentAction.requestDelete(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(estimateContentAction.requestDelete(ApiStatus.FAIL));
    }
  }
}

function* watchVariableList() {
  while (true) {
    yield take(estimateContentAction.requestVariableList);
    const list: EstimateContentVariableVO[] = yield call(estimateContentApi.getVariableList);
    yield put(estimateContentAction.setVariableList(list));
  }
}

export default function* estimateContentSaga() {
  yield fork(watchFilter);
  yield fork(watchId);
  yield fork(watchUpsert);
  yield fork(watchDelete);
  yield fork(watchVariableList);
};
