import {
  call,
  fork,
  put,
  take
} from 'redux-saga/effects';
import { projectAction } from 'project/action';
import Page from 'type/Page';
import { projectApi } from 'project/api';
import {
  ProjectShortVO,
  ProjectVO
} from 'project/domain';
import { ApiStatus } from 'components/DataFieldProps';

function* watchFilter() {
  while (true) {
    const { payload: query } = yield take(projectAction.setFilter);
    const page: Page<ProjectShortVO> = yield call(projectApi.getPage, query);
    yield put(projectAction.setPage(page));
  }
}

function* watchId() {
  while (true) {
    const { payload: id } = yield take(projectAction.setId);
    if (id) {
      const detail: ProjectVO = yield call(projectApi.getOne, id);
      yield put(projectAction.setOne(detail));
    }
    else {
      yield put(projectAction.setOne(undefined));
    }
  }
}

function* watchAdd() {
  while (true) {
    const { payload: params } = yield take(projectAction.add);
    try {
      yield put(projectAction.requestAdd(ApiStatus.REQUEST));
      yield call(projectApi.add, params);
      yield put(projectAction.requestAdd(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(projectAction.requestAdd(ApiStatus.FAIL));
    }
  }
}

export default function* projectSaga() {
  yield fork(watchFilter);
  yield fork(watchId);
  yield fork(watchAdd);
}
