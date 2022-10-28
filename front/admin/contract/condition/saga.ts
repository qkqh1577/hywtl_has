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
import { getErrorMessage } from 'type/Error';
import { dialogAction } from 'dialog/action';

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
      yield put(contractConditionAction.requestUpsert('request'));
      yield call(contractConditionApi.upsert, params);
      yield put(contractConditionAction.requestUpsert('done'));
      yield put(dialogAction.openAlert('저장하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(contractConditionAction.upsert, e);
      yield put(dialogAction.openError(message));
      yield put(contractConditionAction.requestUpsert(message));
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
