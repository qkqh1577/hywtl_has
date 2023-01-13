import {
  fork,
  put,
  take
} from 'redux-saga/effects';
import {snackbarAction} from "./action";

function* watchShow() {
  while (true) {
    const {payload: {message, severity}} = yield take(snackbarAction.show);
    yield put(snackbarAction.setMessage(message));
    yield put(snackbarAction.setSeverity(severity));
    yield put(snackbarAction.setOpen(true));
  }
}

export default function* snackbarSaga() {
  yield fork(watchShow);
}