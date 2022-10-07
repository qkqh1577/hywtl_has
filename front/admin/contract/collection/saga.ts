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
import { ApiStatus } from 'components/DataFieldProps';

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
      yield put(contractCollectionAction.requestUpsert(ApiStatus.REQUEST));
      yield call(contractCollectionApi.upsert, params);
      yield put(contractCollectionAction.requestUpsert(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(contractCollectionAction.requestUpsert(ApiStatus.FAIL));
    }
  }
}

export default function* contractCollectionSaga() {
  yield fork(watchOne);
  yield fork(watchUpsert);
};
