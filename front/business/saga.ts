import {
  call,
  fork,
  put,
  select,
  take
} from 'redux-saga/effects';
import { businessAction } from 'business/action';
import Page from 'type/Page';
import {
  BusinessId,
  BusinessInvolvedProjectVO,
  BusinessInvolvedType,
  BusinessShortVO,
  BusinessVO,
  RivalProjectVO
} from 'business/domain';
import { businessApi } from 'business/api';
import { dialogActions } from 'components/Dialog';
import { RootState } from 'services/reducer';
import { ApiStatus } from 'components/DataFieldProps';

function* watchFilter() {
  while (true) {
    const { payload: query } = yield take(businessAction.setFilter);
    try {
      const page: Page<BusinessShortVO> = yield call(businessApi.getPage, query);
      yield put(businessAction.setPage(page));
    }
    catch (e) {
      yield put(businessAction.setPage(undefined));
    }
  }
}

function* watchRegistrationNumber() {
  while (true) {
    const { payload: registrationNumber } = yield take(businessAction.setRegistrationNumber);
    const list: BusinessShortVO[] = yield call(businessApi.getList, registrationNumber);
    if (list.length > 0) {
      const { detail } = yield select((root: RootState) => root.business);
      if (!detail || detail.id !== list[0].id) {
        yield put(dialogActions.openAlert({
          status:   'error',
          children: '이미 사용중인 사업자등록번호 입니다.'
        }));
        continue;
      }
    }
    yield put(dialogActions.openAlert('사용 가능합니다.'));
  }
}

function* getOne(id: BusinessId | undefined) {
  if (id) {
    const detail: BusinessVO = yield call(businessApi.getOne, id);
    yield put(businessAction.setOne(detail));
  }
  else {
    yield put(businessAction.setOne(undefined));
  }
}

function* getInvolvedProjectList(id: BusinessId | undefined,
                                 involvedType?: BusinessInvolvedType
) {
  if (id) {
    const list: BusinessInvolvedProjectVO[] = yield call(businessApi.getInvolvedProjectList, id, involvedType);
    yield put(businessAction.setInvolvedProjectList(list));
  }
  else {
    yield put(businessAction.setInvolvedProjectList(undefined));
  }
}

function* getRivalProjectList(id: BusinessId | undefined) {
  if (id) {
    const list: RivalProjectVO[] = yield call(businessApi.getRivalProjectList, id);
    yield put(businessAction.setRivalProjectList(list));
  }
  else {
    yield put(businessAction.setRivalProjectList(undefined));
  }
}

function* watchId() {
  while (true) {
    const { payload: id } = yield take(businessAction.setId);
    yield call(getOne, id);
    yield call(getInvolvedProjectList, id);
    yield call(getRivalProjectList, id);
  }
}

function* watchUpsert() {
  while (true) {
    const { payload: params } = yield take(businessAction.upsert);
    try {
      yield put(businessAction.requestUpsert(ApiStatus.REQUEST));
      yield call(businessApi.upsert, params);
      yield put(businessAction.requestUpsert(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(businessAction.requestUpsert(ApiStatus.FAIL));
    }
  }
}

function* watchDelete() {
  while (true) {
    const { payload: id } = yield take(businessAction.deleteOne);
    try {
      yield put(businessAction.requestDelete(ApiStatus.REQUEST));
      yield call(businessApi.delete, id);
      yield put(businessAction.requestDelete(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(businessAction.requestDelete(ApiStatus.FAIL));
    }
  }
}

function* watchInvolvedProjectList() {
  while (true) {
    const { payload: type } = yield take(businessAction.requestInvolvedProjectList);
    const { id } = yield select((root: RootState) => root.business);
    yield call(getInvolvedProjectList, id, type);
  }
}

export default function* businessSaga() {
  yield fork(watchFilter);
  yield fork(watchRegistrationNumber);
  yield fork(watchId);
  yield fork(watchUpsert);
  yield fork(watchDelete);
  yield fork(watchInvolvedProjectList);
};
