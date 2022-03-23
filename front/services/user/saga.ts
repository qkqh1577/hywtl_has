import { ActionType } from 'typesafe-actions';
import { userActions, UserActionType } from './actions';
import User from './User';
import Page from 'common/Page';
import userApi from './api';
import { put, takeLatest } from 'redux-saga/effects';

function* getPage(action: ActionType<typeof userActions.getPage>) {
  const page: Page<User> = yield userApi.getPage(action.payload);
  yield put(userActions.setPage(page));
}

function* getOne(action: ActionType<typeof userActions.getOne>) {
  const data: User = yield userApi.getOne(action.payload);
  yield put(userActions.setOne(data));
}

function* add(action: ActionType<typeof userActions.add>) {
  const data: User = yield userApi.add(action.payload);
  yield put(userActions.setOne(data));
}

function* change(action: ActionType<typeof userActions.change>) {
  const data: User = yield userApi.change(action.payload);
  yield put(userActions.setOne(data));
}

export default function* saga() {
  takeLatest(UserActionType.getPage, getPage);
  takeLatest(UserActionType.getOne, getOne);
  takeLatest(UserActionType.add, add);
  takeLatest(UserActionType.change, change);
}