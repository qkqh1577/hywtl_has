import { ActionType } from 'typesafe-actions';
import { personnelActions, PersonnelActionType } from 'services/personnel/actions';
import personnelApi from 'services/personnel/api';
import Personnel from 'services/personnel/entity';
import { put, takeLatest } from 'redux-saga/effects';

function* getOne(action: ActionType<typeof personnelActions.getOne>) {
  const detail: Personnel = yield personnelApi.getOne(action.payload);
  yield put(personnelActions.setOne(detail));
}

function* add(action: ActionType<typeof personnelActions.add>) {
  const { params, callback } = action.payload;
  try {
    const data: Personnel = yield personnelApi.add(params);
    yield put(personnelActions.setOne(data));
    callback(data);
  } catch (e) {
    callback();
  }
}

function* change(action: ActionType<typeof personnelActions.change>) {
  const { params, callback } = action.payload;
  try {
    const data: Personnel = yield personnelApi.change(params);
    yield put(personnelActions.setOne(data));
    callback(data);
  } catch (e) {
    callback();
  }
}

export default function* saga() {
  takeLatest(PersonnelActionType.getOne, getOne);
  takeLatest(PersonnelActionType.add, add);
  takeLatest(PersonnelActionType.change, change);
}
