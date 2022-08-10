import {
  UserAction,
  userAction
} from 'user/domain/action';
import {
  call,
  put,
  take,
  fork,
} from 'redux-saga/effects';
import { UserVO } from 'user/domain/user';
import Page from 'type/Page';
import { userApi } from 'user/repository/api';
import { dialogActions } from 'components/Dialog';

function* getPage() {
  while (true) {
    const { payload: filter } = yield take('user/filter/set');
    const page: Page<UserVO> = yield call(userApi.getPage, filter);
    yield put(userAction.setPage(page));
  }
}

function* watchId() {
  while (true) {
    const { id } = yield take('user/id/set');
    const detail: UserVO = yield call(userApi.getOne, id);
    yield put(userAction.setOne(detail));
  }
}

function* watchChange() {
  while (true) {
    const { payload: formik } = yield take(UserAction.change);
    try {
      yield call(userApi.change, formik.values);
      yield put(dialogActions.openAlert('저장하였습니다.'));
      yield put({
        type: 'user/id/set',
        id:   formik.values.id
      });
    }
    catch (e) {
      console.log(e);
      yield put(dialogActions.openAlert({
        children: '저장에 실패하였습니다.',
        status:   'error'
      }));
    }
    finally {
      yield call(formik.setSubmitting, false);
    }
  }
}

export default function* userSaga() {
  yield fork(getPage);
  yield fork(watchId);
  yield fork(watchChange);
}

