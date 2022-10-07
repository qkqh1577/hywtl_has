import {
  call,
  fork,
  put,
  take
} from 'redux-saga/effects';
import {
  ContractConditionListVO,
  ContractConditionVariableVO
} from 'admin/contract/condition/domain';
import { contractConditionApi } from 'admin/contract/condition/api';
import { contractConditionAction } from './action';
import { initialContractConditionListParameter } from 'admin/contract/condition/parameter';
import { ApiStatus } from 'components/DataFieldProps';

function* watchPage() {
  while (true) {
    yield take(contractConditionAction.requestOne);
    try {
      const page: ContractConditionListVO = yield call(contractConditionApi.getOne);
      yield put(contractConditionAction.setOne(page));
    }
    catch (e) {
      yield put(contractConditionAction.setOne(initialContractConditionListParameter));
    }
  }
}

function* watchUpsert() {
  while (true) {
    const { payload: params } = yield take(contractConditionAction.upsert);
    try {
      yield put(contractConditionAction.requestUpsert(ApiStatus.REQUEST));
      yield call(contractConditionApi.upsert, params);
      yield put(contractConditionAction.requestUpsert(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(contractConditionAction.requestUpsert(ApiStatus.FAIL));
    }
  }
}

function* watchVariableList() {
  while (true) {
    yield take(contractConditionAction.requestVariableList);
    const list: ContractConditionVariableVO[] = yield call(contractConditionApi.getVariableList);
    yield put(contractConditionAction.setVariableList(list));
  }
}

export default function* contractConditionSaga() {
  yield fork(watchPage);
  yield fork(watchUpsert);
  yield fork(watchVariableList);
};
