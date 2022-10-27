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
import { getErrorMessage } from 'type/Error';
import { dialogAction } from 'dialog/action';

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
      yield put(contractBasicAction.requestUpsert('request'));
      yield call(contractBasicApi.upsert, params);
      yield put(contractBasicAction.requestUpsert('done'));
      yield put(dialogAction.openAlert('저장하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(contractBasicAction.upsert, e);
      yield put(dialogAction.openError(message));
      yield put(contractBasicAction.requestUpsert(message));
    }
  }
}

export default function* contractBasicSage() {
  yield fork(watchOne);
  yield fork(watchUpsert);
}
