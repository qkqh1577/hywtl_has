import {
  call,
  fork,
  put,
  select,
  take,
} from 'redux-saga/effects';
import { projectContractAction } from 'project_contract/action';
import {
  ProjectContractBasicVO,
  ProjectContractShortVO,
} from 'project_contract/domain';
import { projectContractApi } from 'project_contract/api';
import { RootState } from 'services/reducer';
import { ContractConditionVariableVO } from 'admin/contract/condition/domain';
import { contractConditionApi } from 'admin/contract/condition/api';
import { ApiStatus } from 'components/DataFieldProps';

function* watchProjectId() {
  while (true) {
    const { payload: projectId } = yield  take(projectContractAction.setProjectId);
    if (projectId) {
      const list: ProjectContractShortVO[] = yield call(projectContractApi.getList, projectId);
      yield put(projectContractAction.setList(list));
      yield call(getVariableList);
    }
    else {
      yield put(projectContractAction.setList(undefined));
    }
  }
}

function* watchContractBasic() {
  while (true) {
    yield take(projectContractAction.getContractBasic);
    const { projectId } = yield select((root: RootState) => root.projectContract);
    const basic: ProjectContractBasicVO = yield call(projectContractApi.getContractBasic, projectId);
    yield put(projectContractAction.setContractBasic(basic));
  }
}

function* getVariableList() {
  const list: ContractConditionVariableVO[] = yield call(contractConditionApi.getVariableList);
  yield put(projectContractAction.setVariableList(list));
}

function* watchFinal() {
  while (true) {
    const { payload: contractId } = yield take(projectContractAction.setFinal);
    try {
      const { projectId } = yield select((root: RootState) => root.projectContract);
      yield put(projectContractAction.requestSetFinal(ApiStatus.REQUEST));
      yield call(projectContractApi.setFinal, projectId, contractId);
      yield put(projectContractAction.requestSetFinal(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(projectContractAction.requestSetFinal(ApiStatus.FAIL));
    }
  }
}

export default function* projectContractSaga() {
  yield fork(watchProjectId);
  yield fork(watchContractBasic);
  yield fork(watchFinal);
}
