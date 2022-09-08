import {
  contractBasicAction,
  ContractBasicAction
} from 'admin/contract/basic/action';
import {
  call,
  fork,
  put,
  take
} from 'redux-saga/effects';
import { dialogActions } from 'components/Dialog';
import { ContractBasicVO } from 'admin/contract/basic/domain';
import { contractBasicApi } from 'admin/contract/basic/api';

function* watchPage() {
  yield take(contractBasicAction.setOne);
  try {
    const page: ContractBasicVO = yield call(contractBasicApi.getOne);
    yield put(contractBasicAction.setOne(page));
  }
  catch (e) {
    yield put(contractBasicAction.setOne(undefined));
  }
}

function* watchUpsert() {
  while (true) {
    const { payload: formik } = yield take(ContractBasicAction.upsert);
    try {
      yield call(contractBasicApi.upsert, formik.values);
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

export default function* contractBasicSage() {
  yield fork(watchPage);
  yield fork(watchUpsert);
}
