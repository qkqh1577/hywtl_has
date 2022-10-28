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
  ProjectContractCollectionVO,
  ProjectContractConditionVO,
  ProjectContractShortVO,
  ProjectContractVO,
} from 'project_contract/domain';
import { projectContractApi } from 'project_contract/api';
import { RootState } from 'services/reducer';
import { ProjectEstimateVO } from 'project_estimate/domain';
import { projectEstimateApi } from 'project_estimate/api';
import { getErrorMessage } from 'type/Error';
import { dialogAction } from 'dialog/action';

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
      yield put(projectContractAction.requestAdd('request'));
      yield call(projectContractApi.add, projectId, params);
      yield put(projectContractAction.requestAdd('done'));
      yield put(dialogAction.openAlert('등록하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(projectContractAction.add, e);
      yield put(dialogAction.openError(message));
      yield put(projectContractAction.requestAdd(message));
    }
  }
}

function* watchChange() {
  while (true) {
    const { payload: params } = yield take(projectContractAction.change);
    try {
      const { modal } = yield select((root: RootState) => root.projectContract);
      yield put(projectContractAction.requestChange('request'));
      yield call(projectContractApi.change, modal, params);
      yield put(projectContractAction.requestChange('done'));
      yield put(dialogAction.openAlert('변경하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(projectContractAction.change, e);
      yield put(dialogAction.openError(message));
      yield put(projectContractAction.requestChange(message));
    }
  }
}

function* watchDelete() {
  while (true) {
    const { payload: id } = yield take(projectContractAction.deleteOne);
    try {
      yield put(projectContractAction.requestDelete('request'));
      yield call(projectContractApi.deleteOne, id);
      yield put(projectContractAction.requestDelete('done'));
      yield put(dialogAction.openAlert('삭제하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(projectContractAction.deleteOne, e);
      yield put(dialogAction.openError(message));
      yield put(projectContractAction.requestDelete(message));
    }
  }
}

function* watchFinal() {
  while (true) {
    const { payload: contractId } = yield take(projectContractAction.setFinal);
    try {
      const { projectId } = yield select((root: RootState) => root.projectContract);
      yield put(projectContractAction.requestSetFinal('request'));
      yield call(projectContractApi.setFinal, projectId, contractId);
      yield put(projectContractAction.requestSetFinal('done'));
      yield put(dialogAction.openAlert('변경하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(projectContractAction.setFinal, e);
      yield put(dialogAction.openError(message));
      yield put(projectContractAction.requestSetFinal(message));
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
    const { projectId } = yield select((root: RootState) => root.projectContract);
    try {
      const basic: ProjectContractBasicVO = yield call(projectContractApi.getBasic, projectId);
      yield put(projectContractAction.setBasic(basic));
    }
    catch (e) {
      yield put(dialogAction.openError('견적서 정보를 불러올 수 없습니다.'));
      yield put(projectContractAction.setBasic(undefined));
    }
    try {
      const collection: ProjectContractCollectionVO = yield call(projectContractApi.getCollection, estimateId);
      yield put(projectContractAction.setCollection(collection));
    }
    catch (e) {
      yield put(dialogAction.openError('기성 단계 정보를 불러올 수 없습니다.'));
      yield put(projectContractAction.setCollection(undefined));
    }
    try {
      const conditionList: ProjectContractConditionVO[] = yield call(projectContractApi.getConditionList, estimateId);
      yield put(projectContractAction.setConditionList(conditionList));
    }
    catch (e) {
      yield put(dialogAction.openError('계약 조건 정보를 불러올 수 없습니다.'));
      yield put(projectContractAction.setConditionList(undefined));
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
