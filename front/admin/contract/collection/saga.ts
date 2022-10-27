import { contractCollectionAction } from 'admin/contract/collection/action';
import {
  call,
  fork,
  put,
  take
} from 'redux-saga/effects';
import { ContractCollectionVO } from 'admin/contract/collection/domain';
import { contractCollectionApi } from 'admin/contract/collection/api';
import { initialContractCollectionParameter } from 'admin/contract/collection/parameter';
import { getErrorMessage } from 'type/Error';
import { dialogAction } from 'dialog/action';

function* watchOne() {
  while (true) {
    yield take(contractCollectionAction.requestOne);
    try {
      const page: ContractCollectionVO = yield call(contractCollectionApi.getOne);
      yield put(contractCollectionAction.setOne(page));
    }
    catch (e) {
      yield put(contractCollectionAction.setOne(initialContractCollectionParameter));
    }
  }
}

function* watchUpsert() {
  while (true) {
    const { payload: params } = yield take(contractCollectionAction.upsert);
    try {
      yield put(contractCollectionAction.requestUpsert('request'));
      yield call(contractCollectionApi.upsert, params);
      yield put(contractCollectionAction.requestUpsert('done'));
      yield put(dialogAction.openAlert('저장하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(contractCollectionAction.upsert, e);
      yield put(dialogAction.openError(message));
      yield put(contractCollectionAction.requestUpsert(message));
    }
  }
}

export default function* contractCollectionSaga() {
  yield fork(watchOne);
  yield fork(watchUpsert);
};
