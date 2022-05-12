import { ActionType } from 'typesafe-actions';
import { put, takeLatest } from 'redux-saga/effects';
import Page from 'components/Page';
import User, { ListUser } from 'services/user/entity';
import userApi from './api';
import { userActions, UserActionType } from './actions';

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

function* getLogin(action: ActionType<typeof userActions.getLogin>) {
  try {
    const data: User = yield userApi.getLogin();
    yield put(userActions.setLogin(data));
  } catch (e) {
    action.payload();
  }
}

function* login(action: ActionType<typeof userActions.login>) {
  const { params, callback } = action.payload;
  try {
    const data: User = yield userApi.login(params);
    yield put(userActions.setLogin(data));
    callback(data);
  } catch (e) {
    yield put(userActions.setLogin(undefined));
    callback();
  }
}

function* logout() {
  yield userApi.logout();
  yield put(userActions.setLogin(undefined));
}

export default function* userSaga() {
  yield takeLatest(UserActionType.getPage, getPage);
  yield takeLatest(UserActionType.getOne, getOne);
  yield takeLatest(UserActionType.add, add);
  yield takeLatest(UserActionType.resetPassword, resetPassword);
  yield takeLatest(UserActionType.change, change);
  yield takeLatest(UserActionType.changePassword, changePassword);
  yield takeLatest(UserActionType.getLogin, getLogin);
  yield takeLatest(UserActionType.login, login);
  yield takeLatest(UserActionType.logout, logout);
}
