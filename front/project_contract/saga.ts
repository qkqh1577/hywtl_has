import {
  call,
  fork,
  put,
  select,
  take,
} from 'redux-saga/effects';
import { projectContractAction } from 'project_contract/action';
import {
  ProjectContractShortVO,
  ProjectContractVO,
} from 'project_contract/domain';
import { projectContractApi } from 'project_contract/api';
import { RootState } from 'services/reducer';
import { ApiStatus } from 'components/DataFieldProps';
import { ProjectEstimateVO } from 'project_estimate/domain';
import { projectEstimateApi } from 'project_estimate/api';

function* watchProjectId() {
  while (true) {
    const { payload: projectId } = yield  take(projectContractAction.setProjectId);
    if (projectId) {
      const list: ProjectContractShortVO[] = yield call(projectContractApi.getList, projectId);
      yield put(projectContractAction.setList(list));
    }
    else {
      yield put(projectContractAction.setList(undefined));
    }
  }
}

function* watchModal() {
  while (true) {
    const { payload: id } = yield take(projectContractAction.setModal);
    if (id) {
      const detail: ProjectContractVO = yield call(projectContractApi.getOne, id);
      yield put(projectContractAction.setDetail(detail));
    }
    else {
      yield put(projectContractAction.setDetail(undefined));
    }
  }
}

function* watchAdd() {
  while (true) {
    const { payload: params } = yield take(projectContractAction.add);
    try {
      const { projectId } = yield select((root: RootState) => root.projectContract);
      yield put(projectContractAction.requestAdd(ApiStatus.REQUEST));
      yield call(projectContractApi.add, projectId, params);
      yield put(projectContractAction.requestAdd(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(projectContractAction.requestAdd(ApiStatus.FAIL));
    }
  }
}


function* watchChange() {
  while (true) {
    const { payload: params } = yield take(projectContractAction.change);
    try {
      const { modal } = yield select((root: RootState) => root.projectContract);
      yield put(projectContractAction.requestChange(ApiStatus.REQUEST));
      yield call(projectContractApi.change, modal, params);
      yield put(projectContractAction.requestChange(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(projectContractAction.requestChange(ApiStatus.FAIL));
    }
  }
}

function* watchDelete() {
  while (true) {
    const { payload: id } = yield take(projectContractAction.deleteOne);
    try {
      yield put(projectContractAction.requestDelete(ApiStatus.REQUEST));
      yield call(projectContractApi.deleteOne, id);
      yield put(projectContractAction.requestDelete(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(projectContractAction.requestDelete(ApiStatus.FAIL));
    }
  }
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

function* watchEstimate() {
  while (true) {
    const { payload: estimateId } = yield take(projectContractAction.getEstimate);
    if (estimateId) {
      const detail: ProjectEstimateVO = yield call(projectEstimateApi.getDetail, estimateId);
      yield put(projectContractAction.setEstimate(detail));
    }
    else {
      yield put(projectContractAction.setEstimate(undefined));
    }
  }
}

export default function* projectContractSaga() {
  yield fork(watchProjectId);
  yield fork(watchModal);
  yield fork(watchAdd);
  yield fork(watchChange);
  yield fork(watchDelete);
  yield fork(watchFinal);
  yield fork(watchEstimate);
}
