import { contractBasicAction } from 'admin/contract/basic/action';
import {
  call,
  fork,
  put,
  take
} from 'redux-saga/effects';
import { ContractBasicVO } from 'admin/contract/basic/domain';
import { contractBasicApi } from 'admin/contract/basic/api';
import { initialContractBasicParameter } from 'admin/contract/basic/parameter';
import { ApiStatus } from 'components/DataFieldProps';

function* watchOne() {
  while (true) {
    yield take(contractBasicAction.requestOne);
    try {
      const detail: ContractBasicVO = yield call(contractBasicApi.getOne);
      yield put(contractBasicAction.setOne(detail));
    }
    catch (e) {
      yield put(contractBasicAction.setOne(initialContractBasicParameter));
    }
  }
}

function* watchUpsert() {
  while (true) {
    const { payload: params } = yield take(contractBasicAction.upsert);
    try {
      yield put(contractBasicAction.requestUpsert(ApiStatus.REQUEST));
      yield call(contractBasicApi.upsert, params);
      yield put(contractBasicAction.requestUpsert(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(contractBasicAction.requestUpsert(ApiStatus.FAIL));
    }
  }
}

export default function* contractBasicSage() {
  yield fork(watchOne);
  yield fork(watchUpsert);
}
