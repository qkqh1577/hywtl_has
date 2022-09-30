import {
  call,
  fork,
  put,
  select,
  take,
} from 'redux-saga/effects';
import { projectContractAction } from 'project_contract/action';
import { ProjectId } from 'project/domain';
import {
  ProjectContractBasicVO,
  ProjectContractCollectionVO,
  ProjectContractConditionVO,
  ProjectContractVO,
  ProjectEstimateId,
} from 'project_contract/domain';
import { projectContractApi } from 'project_contract/api';
import { ContractConditionVariableVO } from 'admin/contract/condition/domain';
import { contractConditionApi } from 'admin/contract/condition/api';
import { RootState } from 'services/reducer';

function* watchProjectId() {
  while (true) {
    const { payload: projectId } = yield  take(projectContractAction.setProjectId);
    if (projectId) {
      yield call(getList, projectId);
      yield call(watchVariableList);
    }
  }
}

function* getList(id: ProjectId) {
  const list: ProjectContractVO[] = yield call(projectContractApi.getList, id);
  yield put(projectContractAction.setList(list));
}

function* watchContractBasic() {
  while (true) {
    yield take(projectContractAction.getContractBasic);
    const { projectId } = yield select((root: RootState) => root.projectContract);
    const basic: ProjectContractBasicVO = yield call(projectContractApi.getContractBasic, projectId);
    yield put(projectContractAction.setContractBasic(basic));
  }
}

function* watchContractCollection() {
  while (true) {
    yield take(projectContractAction.getContractCollection);
    const { projectId } = yield select((root: RootState) => root.projectContract);
    // TODO: ProjectEstimateId(1) -> 수정 사항
    const collection: ProjectContractCollectionVO = yield call(projectContractApi.getContractCollection, projectId, ProjectEstimateId(1));
    yield put(projectContractAction.setContractCollection(collection));
  }
}

function* watchContractConditionList() {
  while (true) {
    yield take(projectContractAction.getContractConditionList);
    const { projectId } = yield select((root: RootState) => root.projectContract);
    // TODO: ProjectEstimateId(1) -> 수정 사항
    const conditionList: ProjectContractConditionVO[] = yield call(projectContractApi.getContractCondition, projectId, ProjectEstimateId(1));
    yield put(projectContractAction.setContractConditionList(conditionList));
  }
}

function* watchVariableList() {
  while (true) {
    yield take(projectContractAction.getVariableList);
    const list: ContractConditionVariableVO[] = yield call(contractConditionApi.getVariableList);
    yield put(projectContractAction.setVariableList(list));
  }
}


export default function* projectContractSaga() {
  yield fork(watchProjectId);
  yield fork(watchContractBasic);
  yield fork(watchContractCollection);
  yield fork(watchContractConditionList);
  yield fork(watchVariableList);
}
