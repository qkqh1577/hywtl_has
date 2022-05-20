import { ActionType } from 'typesafe-actions';
import { put, takeLatest } from 'redux-saga/effects';
import Page from 'components/Page';
import {
  Business,
  BusinessActionType,
  BusinessDetail,
  BusinessList,
  businessActions,
  businessApi,
} from 'services/business';

function* getPage(action: ActionType<typeof businessActions.getPage>) {
  const page: Page<BusinessList> = yield businessApi.getPage(action.payload);
  yield put(businessActions.setPage(page));
}

function* getAll(action: ActionType<typeof businessActions.getAll>) {
  const data: Business[] = yield businessApi.getAll(action.payload);
  yield put(businessActions.setAll(data));
}

function* getOne(action: ActionType<typeof businessActions.getOne>) {
  try {
    const detail: BusinessDetail = yield businessApi.getOne(action.payload);
    yield put(businessActions.setOne(detail));
  } catch (e) {
    // nothing to do
  }
}

function* add(action: ActionType<typeof businessActions.add>) {
  const { params, callback } = action.payload;
  try {
    const data: Business = yield businessApi.add(params);
    yield put(businessActions.setOne(data));
    callback(data);
  } catch (e) {
    callback();
  }
}

function* change(action: ActionType<typeof businessActions.change>) {
  const { params, callback } = action.payload;
  try {
    const data: Business = yield businessApi.change(params);
    yield put(businessActions.setOne(data));
    callback(data);
  } catch (e) {
    callback();
  }
}

function* remove(action: ActionType<typeof businessActions.remove>) {
  const { id, callback } = action.payload;
  try {
    yield businessApi.remove(id);
    callback();
  } catch (e) {
    callback();
  }
}

export default function* businessSaga() {
  yield takeLatest(BusinessActionType.getPage, getPage);
  yield takeLatest(BusinessActionType.getAll, getAll);
  yield takeLatest(BusinessActionType.getOne, getOne);
  yield takeLatest(BusinessActionType.add, add);
  yield takeLatest(BusinessActionType.change, change);
  yield takeLatest(BusinessActionType.remove, remove);
}
