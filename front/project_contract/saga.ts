import {
  call,
  fork,
  put,
  select,
  take,
  takeLatest
} from 'redux-saga/effects';
import { projectContractAction } from 'project_contract/action';
import { ProjectId } from 'project/domain';
import {
  ProjectContractVO,
  ProjectEstimateVO
} from 'project_contract/domain';
import { projectContractApi } from 'project_contract/api';

function* watchProjectId() {
  while (true) {
    const { payload: projectId } = yield  take(projectContractAction.setProjectId);
    if (projectId) {
      yield call(getList, projectId);
    }
  }
}

function* getList(id: ProjectId) {
  const list: ProjectContractVO[] = yield call(projectContractApi.getList, id);
  yield put(projectContractAction.setList(list));
}

export default function* projectContractSaga() {
  yield fork(watchProjectId);
}