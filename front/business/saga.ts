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
  RegistrationNumberResultType,
  RivalProjectVO
} from 'business/domain';
import { businessApi } from 'business/api';
import { dialogAction } from 'dialog/action';
import { RootState } from 'services/reducer';
import { getErrorMessage } from 'type/Error';
import { ProjectShortVO } from 'project/domain';

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
      if (!detail || detail.id !== list[0].id || detail.registrationNumber === list[0].registrationNumber) {
        yield put(businessAction.checkRegistrationNumber({
          state:   RegistrationNumberResultType.FAIL,
          message: '이미 등록되어 있는 사업자번호 입니다.'
        }));
        continue;
      }
    }
    yield put(businessAction.checkRegistrationNumber({
      state:   RegistrationNumberResultType.SUCCESS,
      message: '등록 가능한 사업자번호 입니다.'
    }));
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
      yield put(businessAction.requestUpsert('request'));
      yield call(businessApi.upsert, params);
      yield put(businessAction.requestUpsert('done'));
      if (params.id) {
        yield put(dialogAction.openAlert('변경하였습니다.'));
        yield put(businessAction.checkRegistrationNumber(undefined));
      }
      else {
        yield put(dialogAction.openAlert('등록하였습니다.'));
        yield put(businessAction.checkRegistrationNumber(undefined));
      }
    }
    catch (e) {
      const message = getErrorMessage(businessAction.upsert, e);
      yield put(dialogAction.openError(message));
      yield put(businessAction.requestUpsert(message));
    }
  }
}

function* watchDelete() {
  while (true) {
    const { payload: id } = yield take(businessAction.deleteOne);
    try {
      yield put(businessAction.requestDelete('request'));
      yield call(businessApi.delete, id);
      yield put(businessAction.requestDelete('done'));
      yield put(dialogAction.openAlert('삭제하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(businessAction.deleteOne, e);
      yield put(dialogAction.openError(message));
      yield put(businessAction.requestDelete(message));
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

function* watchProjectListModal() {
  while (true) {
    const { payload: id } = yield take(businessAction.setProjectListModal);
    try {
      if (id) {
        const list: ProjectShortVO[] = yield call(businessApi.getProjectList, id);
        yield put(businessAction.setProjectList(list));

      }
    }
    catch (e) {

    }
  }
}

export default function* businessSaga() {
  yield fork(watchFilter);
  yield fork(watchRegistrationNumber);
  yield fork(watchId);
  yield fork(watchUpsert);
  yield fork(watchDelete);
  yield fork(watchInvolvedProjectList);
  yield fork(watchProjectListModal);
};
