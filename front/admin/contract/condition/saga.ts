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
  yield take(contractConditionAction.setOne);
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
    const { payload: formik } = yield take(ContractConditionAction.upsert);
    try {
      yield call(contractConditionApi.upsert, formik.values);
      yield put(dialogActions.openAlert('저장하였습니다.'));
      //  TODO: 저장후 갱신 로직
    }
    catch (e) {
      yield put(dialogActions.openAlert({
        children: '저장에 실패하였습니다.',
        status:   'error',
      }));
    }
    finally {
      yield call(formik.setSubmitting, false);
    }
  }
}

function* watchVariableList() {
  while (true) {
    yield take(ContractConditionAction.setVariableList);
    const list: ContractConditionVariableVO[] = yield call(contractConditionApi.getVariableList);
    yield put(contractConditionAction.setVariableList(list));
  }
}

export default function* contractConditionSaga() {
  yield fork(watchPage);
  yield fork(watchUpsert);
  yield fork(watchVariableList);
};
