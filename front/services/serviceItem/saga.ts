import { ActionType } from 'typesafe-actions';
import { put, takeLatest } from 'redux-saga/effects';
import {
  serviceItemActions,
  ServiceItemList,
  serviceItemApi,
  ServiceItemActionType,
  ServiceItemDetail,
  ServiceItemOrderList
} from 'services/serviceItem';


function* getList(action: ActionType<typeof serviceItemActions.getList>) {
  const data: ServiceItemList[] = yield serviceItemApi.getList(action.payload);
  yield put(serviceItemActions.setList(data));
}

function* getOrderList(action: ActionType<typeof serviceItemActions.getOrderList>) {
  const data: ServiceItemOrderList[] = yield serviceItemApi.getOrderList();
  yield put(serviceItemActions.setOrderList(data));
}

function* getOne(action: ActionType<typeof serviceItemActions.getOne>) {
  try {
    const detail: ServiceItemDetail = yield serviceItemApi.getOne(action.payload);
    yield put(serviceItemActions.setOne(detail));
  } catch (e) {
    // nothing to do
  }
}

function* add(action: ActionType<typeof serviceItemActions.add>) {
  const {params, callback} = action.payload;
  try {
    const data: ServiceItemDetail = yield serviceItemApi.add(params);
    yield put(serviceItemActions.setOne(data));
    callback(data);
  } catch (e) {
    callback();
  }
}


export default function* serviceItemSaga() {
  yield takeLatest(ServiceItemActionType.getList, getList);
  yield takeLatest(ServiceItemActionType.getOrderList, getOrderList);
  yield takeLatest(ServiceItemActionType.getOne, getOne);
  yield takeLatest(ServiceItemActionType.add, add);
}