import { ActionType } from 'typesafe-actions';
import { put, takeLatest } from 'redux-saga/effects';
import {
  serviceItemActions,
  ServiceItemList,
  serviceItemApi,
  ServiceItemActionType,
  ServiceItemDetail
} from 'services/serviceItem';


function* getList(action: ActionType<typeof serviceItemActions.getList>) {
  const data: ServiceItemList[] = yield serviceItemApi.getList(action.payload);
  yield put(serviceItemActions.setList(data));
}

function* getOne(action: ActionType<typeof serviceItemActions.getOne>) {
  try {
    const detail: ServiceItemDetail = yield serviceItemApi.getOne(action.payload);
    yield put(serviceItemActions.setOne(detail));
  } catch (e) {
    // nothing to do
  }
}

export default function* serviceItemSaga() {
  yield takeLatest(ServiceItemActionType.getList, getList);
  yield takeLatest(ServiceItemActionType.getOne, getOne);
}