import { ActionType } from 'typesafe-actions';
import {
  UserAction,
  userAction
} from 'user/domain/action';
import {
  call,
  put,
  takeLatest
} from 'redux-saga/effects';
import { UserVO } from 'user/domain/user';
import Page from 'services/common/domain/Page';
import { userApi } from 'user/repository/api';

function* getPage(action: ActionType<typeof userAction.getPage>) {
  const page: Page<UserVO> = yield call(userApi.getPage, action.payload);
  yield put(userAction.setPage(page));
}

function* getOne(action: ActionType<typeof userAction.getOne>) {
  const detail: UserVO = yield call(userApi.getOne, action.payload);
  yield put(userAction.setOne(detail));
}

export default function* userSaga() {
  yield takeLatest(UserAction.getPage, getPage);
  yield takeLatest(UserAction.getOne, getOne);
}

