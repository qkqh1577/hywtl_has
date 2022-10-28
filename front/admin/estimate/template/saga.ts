import {
  call,
  fork,
  put,
  select,
  take
} from 'redux-saga/effects';
import {
  EstimateTemplateShortVO,
  EstimateTemplateVO
} from 'admin/estimate/template/domain';
import { estimateTemplateApi } from 'admin/estimate/template/api';
import { estimateTemplateAction } from 'admin/estimate/template/action';
import { RootState } from 'services/reducer';
import { dialogAction } from 'dialog/action';
import { getErrorMessage } from 'type/Error';

function* watchFilter() {
  while (true) {
    const { payload: query } = yield take(estimateTemplateAction.setFilter);
    const list: EstimateTemplateShortVO[] = yield  call(estimateTemplateApi.getList, query);
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
      yield put(estimateTemplateAction.requestUpsert('request'));
      yield call(estimateTemplateApi.upsert, params);
      yield put(estimateTemplateAction.requestUpsert('done'));
      yield put(dialogAction.openAlert('저장하였습니다'));
    }
    catch (e) {
      const message = getErrorMessage(estimateTemplateAction.upsert, e);
      yield put(dialogAction.openError(message));
      yield put(estimateTemplateAction.requestUpsert(message));
    }
  }
}

function* watchSeq() {
  while (true) {
    const { payload: idList } = yield take(estimateTemplateAction.changeSeq);
    try {
      yield put(estimateTemplateAction.requestChangeSeq('request'));
      yield call(estimateTemplateApi.changeSeq, idList);
      yield put(estimateTemplateAction.requestChangeSeq('done'));
      yield put(dialogAction.openAlert('변경하였습니다'));
    }
    catch (e) {
      const message = getErrorMessage(estimateTemplateAction.changeSeq, e);
      yield put(dialogAction.openError(message));
      yield put(estimateTemplateAction.requestChangeSeq(message));
    }
  }
}

function* watchDelete() {
  while (true) {
    yield take(estimateTemplateAction.deleteOne);
    try {
      const { id } = yield select((root: RootState) => root.estimateTemplate);
      yield put(estimateTemplateAction.requestDelete('request'));
      yield call(estimateTemplateApi.deleteOne, id);
      yield put(estimateTemplateAction.requestDelete('done'));
      yield put(dialogAction.openAlert('삭제하였습니다'));
    }
    catch (e) {
      const message = getErrorMessage(estimateTemplateAction.deleteOne, e);
      yield put(dialogAction.openError(message));
      yield put(estimateTemplateAction.requestDelete(message));
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