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
import { dialogActions } from 'components/Dialog';
import {
  ContractConditionAction,
  contractConditionAction
} from './action';

function* watchPage() {
  yield take(contractConditionAction.getOne);
  try {
    const page: ContractConditionListVO = yield call(contractConditionApi.getOne);
    yield put(contractConditionAction.setOne(page));
  }
  catch (e) {
    yield put(contractConditionAction.setOne(undefined));
  }
}

function* watchUpsert() {
  while (true) {
    const { payload: params } = yield take(ContractConditionAction.upsert);
    try {
      yield call(contractConditionApi.upsert, params);
      yield put(dialogActions.openAlert('저장하였습니다.'));
      yield put(contractConditionAction.getOne());
    }
    catch (e) {
      yield put(dialogActions.openAlert({
        children: '저장에 실패하였습니다.',
        status:   'error',
      }));
    }
  }
}

function* watchVariableList() {
  while (true) {
    yield take(contractConditionAction.getVariableList);
    const list: ContractConditionVariableVO[] = yield call(contractConditionApi.getVariableList);
    yield put(contractConditionAction.setVariableList(list));
  }
}

export default function* contractConditionSaga() {
  yield fork(watchPage);
  yield fork(watchUpsert);
  yield fork(watchVariableList);
};
