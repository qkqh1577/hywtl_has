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
import { getErrorMessage } from 'type/Error';
import { dialogAction } from 'dialog/action';

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
      yield put(estimateContentAction.requestUpsert('request'));
      yield call(estimateContentApi.upsert, params);
      yield put(estimateContentAction.requestUpsert('done'));
      yield put(dialogAction.openAlert('저장하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(estimateContentAction.upsert, e);
      yield put(dialogAction.openError(message));
      yield put(estimateContentAction.requestUpsert(message));
    }
  }
}

function* watchDelete() {
  while (true) {
    yield take(estimateContentAction.deleteOne);
    try {
      const { id } = yield select((root: RootState) => root.estimateContent);
      yield put(estimateContentAction.requestDelete('request'));
      yield call(estimateContentApi.delete, id);
      yield put(estimateContentAction.requestDelete('done'));
      yield put(dialogAction.openAlert('삭제하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(estimateContentAction.deleteOne, e);
      yield put(dialogAction.openError(message));
      yield put(estimateContentAction.requestDelete(message));
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
