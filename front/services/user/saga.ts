import { ActionType } from 'typesafe-actions';
import { put, takeLatest } from 'redux-saga/effects';
import Page from 'common/Page';
import { userActions, UserActionType } from './actions';
import User, { ListUser } from './User';
import userApi from './api';

function* getPage(action: ActionType<typeof userActions.getPage>) {
  const page: Page<ListUser> = yield userApi.getPage(action.payload);
  yield put(userActions.setPage(page));
}

function* getOne(action: ActionType<typeof userActions.getOne>) {
  const data: User = yield userApi.getOne(action.payload);
  yield put(userActions.setOne(data));
}


function* add(action: ActionType<typeof userActions.add>) {
  const { params, callback } = action.payload;
  try {
    const data: User = yield userApi.add(params);
    yield put(userActions.setOne(data));
    callback(data);
  } catch (e) {
    callback();
  }
}

function* resetPassword(action: ActionType<typeof userActions.resetPassword>) {
  const { id, callback } = action.payload;
  try {
    const data: User = yield userApi.resetPassword(id);
    yield put(userActions.setOne(data));
    callback(data);
  } catch (e) {
    callback();
  }
}

function* change(action: ActionType<typeof userActions.change>) {
  const { params, callback } = action.payload;
  try {
    const data: User = yield userApi.change(params);
    yield put(userActions.setOne(data));
    callback(data);
  } catch (e) {
    callback();
  }
}

function* changePassword(action: ActionType<typeof userActions.changePassword>) {
  const { params, callback } = action.payload;
  try {
    const data: User = yield userApi.changePassword(params);
    yield put(userActions.setOne(data));
    callback(data);
  } catch (e) {
    callback();
  }
}

export default function* saga() {
  yield takeLatest(UserActionType.getPage, getPage);
  yield takeLatest(UserActionType.getOne, getOne);
  yield takeLatest(UserActionType.add, add);
  yield takeLatest(UserActionType.resetPassword, resetPassword);
  yield takeLatest(UserActionType.change, change);
  yield takeLatest(UserActionType.changePassword, changePassword);
}
