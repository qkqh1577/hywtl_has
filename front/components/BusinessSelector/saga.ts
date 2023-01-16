import {call, fork, put, take} from "redux-saga/effects";
import {businessSelectorAction} from "./action";
import {BusinessManagerVO, BusinessVO} from "../../business/domain";
import {businessApi} from "../../business/api";

function* watchFilter() {
  while (true) {
    const {payload: filter} = yield take(businessSelectorAction.setFilter);
    yield put(businessSelectorAction.setLoading(true));
    try {
      yield put(businessSelectorAction.setList([]));
      const list: BusinessVO[] = yield call(businessApi.getListAll, filter);
      yield put(businessSelectorAction.setList(list));
      yield put(businessSelectorAction.setManagerList([]));
    } finally {
      yield put(businessSelectorAction.setLoading(false));
    }
  }
}

function* watchId() {
  while (true) {
    const {payload: id} = yield take(businessSelectorAction.setId);
    if (id) {
      const detail: BusinessVO = yield call(businessApi.getOne, id);
      yield put(businessSelectorAction.setDetail(detail));
    } else {
      yield put(businessSelectorAction.setDetail(undefined));
    }
  }
}

function* watchManagerList() {
  while (true) {
    const {payload: id} = yield take(businessSelectorAction.setId);
    if (id) {
      const list: BusinessManagerVO[] = yield call(businessApi.getManagerList, id);
      yield put(businessSelectorAction.setManagerList(list));
    } else {
      yield put(businessSelectorAction.setManagerList([]));
    }
  }
}

export function* businessSelectorSaga() {
  yield fork(watchFilter);
  yield fork(watchId);
  yield fork(watchManagerList);
}