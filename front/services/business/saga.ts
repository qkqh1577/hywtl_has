import { ActionType } from 'typesafe-actions';
import { put, takeLatest } from 'redux-saga/effects';
import Page from 'services/common/domain/Page';
import {
  Business,
  BusinessActionType,
  BusinessShort,
  businessActions,
  businessApi,
} from 'services/business';

function* getPage(action: ActionType<typeof businessActions.getPage>) {
  const page: Page<BusinessShort> = yield businessApi.getPage(action.payload);
  yield put(businessActions.setPage(page));
}

function* getAll(action: ActionType<typeof businessActions.getAll>) {
  const data: Business[] = yield businessApi.getAll(action.payload);
  yield put(businessActions.setAll(data));
}

function* getOne(action: ActionType<typeof businessActions.getOne>) {
  const detail: Business = yield businessApi.getOne(action.payload);
  yield put(businessActions.setOne(detail));
}

function* add(action: ActionType<typeof businessActions.add>) {
  const { params, callback } = action.payload;
  try {
    const data: Business = yield businessApi.add(params);
    yield put(businessActions.setOne(data));
    callback();
  } catch (e) {
    // nothing to do
  }
}

function* change(action: ActionType<typeof businessActions.change>) {
  const { params, callback } = action.payload;
  try {
    const data: Business = yield businessApi.change(params);
    yield put(businessActions.setOne(data));
    callback();
  } catch (e) {
    // nothing to do
  }
}

function* remove(action: ActionType<typeof businessActions.remove>) {
  const { id, callback } = action.payload;
  try {
    yield businessApi.remove(id);
    callback();
  } catch (e) {
    // nothing to do
  }
}

function* checkRegistrationNumber(action: ActionType<typeof businessActions.checkRegistrationNumber>) {
  const { params, callback } = action.payload;
  try {
    yield businessApi.checkRegistrationNumber(params);
    callback();
  } catch (e) {
    // TODO: 전체 에러 처리 필요
    callback(e);
  }
}

export default function* businessSaga() {
  yield takeLatest(BusinessActionType.getPage, getPage);
  yield takeLatest(BusinessActionType.getAll, getAll);
  yield takeLatest(BusinessActionType.getOne, getOne);
  yield takeLatest(BusinessActionType.add, add);
  yield takeLatest(BusinessActionType.change, change);
  yield takeLatest(BusinessActionType.remove, remove);
  yield takeLatest(BusinessActionType.checkRegistrationNumber, checkRegistrationNumber);
}
