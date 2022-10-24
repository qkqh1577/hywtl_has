import {
  call,
  fork,
  put,
  take,
} from 'redux-saga/effects';
import { menuAction } from 'menu/action';
import { Menu } from 'menu/domain';
import { menuApi } from 'menu/api';

function* getMenu() {
  while (true) {
    yield take(menuAction.getMenu);
    const list: Menu[] = yield call(menuApi.getMenu);
    yield put(menuAction.setMenu(list));
  }
}

export default function* menuSaga() {
  yield fork(getMenu);
}