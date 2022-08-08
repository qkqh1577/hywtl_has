import { ActionType } from 'typesafe-actions';
import {
  LoginAction,
  loginAction
} from 'App/domain/action';
import {
  call,
  put,
  takeLatest,
  takeEvery
} from 'redux-saga/effects';
import { LoginUser } from 'App/domain/loginEntity';
import { loginUserApi } from 'App/repository/api';

function* login(action: ActionType<typeof loginAction.login>) {
  yield call(loginUserApi.login, action.payload);
  yield put(loginAction.getLoginUser());
}

function* getLoginUser() {
  try {
    const loginUser: LoginUser = yield call(loginUserApi.getLoginUser);
    yield put(loginAction.setLoginUser(loginUser ?? null));
  }
  catch (e) {
    console.error(e);
    yield put(loginAction.setLoginUser(null));
  }
}

function* logout() {
  yield call(loginUserApi.logout);
  yield put(loginAction.clearLoginUser());
}

export default function* loginUserSaga() {
  yield takeLatest(LoginAction.login, login);
  yield takeLatest(LoginAction.getLoginUser, getLoginUser);
  yield takeEvery(LoginAction.logout, logout);
}