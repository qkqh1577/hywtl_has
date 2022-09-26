import {
  ContractCollectionAction,
  contractCollectionAction
} from 'admin/contract/collection/action';
import {
  call,
  fork,
  put,
  take
} from 'redux-saga/effects';
import { ContractCollectionVO } from 'admin/contract/collection/domain';
import { contractCollectionApi } from 'admin/contract/collection/api';
import { dialogActions } from 'components/Dialog';

function* watchPage() {
  yield take(contractCollectionAction.getOne);
  try {
    const page: ContractCollectionVO = yield call(contractCollectionApi.getOne);
    yield put(contractCollectionAction.setOne(page));
  }
  catch (e) {
    yield put(contractCollectionAction.setOne(undefined));
  }
}

function* watchUpsert() {
  while (true) {
    const { payload: params } = yield take(ContractCollectionAction.upsert);
    try {
      yield call(contractCollectionApi.upsert, params);
      yield put(dialogActions.openAlert('저장하였습니다.'));
      yield put(contractCollectionAction.getOne());
    }
    catch (e) {
      yield put(dialogActions.openAlert({
        children: '저장에 실패하였습니다.',
        status:   'error',
      }));
    }
  }
}

export default function* contractCollectionSaga() {
  yield fork(watchPage);
  yield fork(watchUpsert);
};
