import {
  call,
  fork,
  put,
  select,
  take
} from 'redux-saga/effects';
import { projectEstimateAction } from 'project_estimate/action';
import {
  ProjectCustomEstimateVO,
  ProjectEstimateVO,
  ProjectSystemEstimateVO
} from 'project_estimate/domain';
import { projectEstimateApi } from 'project_estimate/api';
import { RootState } from 'services/reducer';
import { ApiStatus } from 'components/DataFieldProps';

function* watchProjectId() {
  while (true) {
    const { payload: projectId } = yield take(projectEstimateAction.setProjectId);
    if (projectId) {
      const list: ProjectEstimateVO[] = yield call(projectEstimateApi.getList, projectId);
      yield put(projectEstimateAction.setList(list));
    }
    else {
      yield put(projectEstimateAction.setList(undefined));
    }
  }
}

function* watchAddCustom() {
  while (true) {
    const { payload: params } = yield take(projectEstimateAction.addCustom);
    try {
      const { projectId } = yield select((root: RootState) => root.projectEstimate);
      yield put(projectEstimateAction.requestAddCustom(ApiStatus.REQUEST));
      yield call(projectEstimateApi.addCustom, projectId, params);
      yield put(projectEstimateAction.requestAddCustom(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(projectEstimateAction.requestAddCustom(ApiStatus.FAIL));
    }
  }
}

function* watchCustomDetailModal() {
  while (true) {
    const { payload: id } = yield take(projectEstimateAction.setCustomDetailModal);
    if (id) {
      const detail: ProjectCustomEstimateVO = yield call(projectEstimateApi.getCustomDetail, id);
      yield put(projectEstimateAction.setCustomDetail(detail));
    }
    else {
      yield put(projectEstimateAction.setCustomDetail(undefined));
    }
  }
}

function* watchChangeCustom() {
  while (true) {
    const { payload: params } = yield take(projectEstimateAction.changeCustom);
    try {
      yield put(projectEstimateAction.requestChangeCustom(ApiStatus.REQUEST));
      yield call(projectEstimateApi.changeCustom, params);
      yield put(projectEstimateAction.requestChangeCustom(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(projectEstimateAction.requestChangeCustom(ApiStatus.FAIL));
    }
  }
}

function* watchExtensionCustom() {
  while (true) {
    const { payload: params } = yield take(projectEstimateAction.extensionCustom);
    try {
      yield put(projectEstimateAction.requestExtensionCustom(ApiStatus.REQUEST));
      yield call(projectEstimateApi.extensionCustom, params);
      yield put(projectEstimateAction.requestExtensionCustom(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(projectEstimateAction.requestExtensionCustom(ApiStatus.FAIL));
    }
  }
}

function* watchSystemDetailModal() {
  while (true) {
    const { payload: id } = yield take(projectEstimateAction.setSystemModal);
    if (!id) {
      yield put(projectEstimateAction.setSystemDetail(undefined));
    }
    else {
      const detail: ProjectSystemEstimateVO = yield call(projectEstimateApi.getSystemDetail, id);
      yield put(projectEstimateAction.setSystemDetail(detail));
    }
  }
}

function* watchAddSystem() {
  while (true) {
    const { payload: params } = yield take(projectEstimateAction.addSystem);
    try {
      const { projectId } = yield select((root: RootState) => root.projectEstimate);
      yield put(projectEstimateAction.requestAddSystem(ApiStatus.REQUEST));
      yield call(projectEstimateApi.addSystem, projectId, params);
      yield put(projectEstimateAction.requestAddSystem(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(projectEstimateAction.requestAddSystem(ApiStatus.FAIL));
    }
  }
}

function* watchChangeSystem() {
  while (true) {
    const { payload: params } = yield take(projectEstimateAction.changeSystem);
    try {
      const { systemDetail } = yield select((root: RootState) => root.projectEstimate);
      yield put(projectEstimateAction.requestChangeSystem(ApiStatus.REQUEST));
      yield call(projectEstimateApi.changeSystem, systemDetail!.id, params);
      yield put(projectEstimateAction.requestChangeSystem(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(projectEstimateAction.requestChangeSystem(ApiStatus.FAIL));
    }
  }
}

function* watchFinal() {
  while (true) {
    const { payload: estimateId } = yield take(projectEstimateAction.setFinal);
    try {
      const { projectId } = yield select((root: RootState) => root.projectEstimate);
      yield put(projectEstimateAction.requestSetFinal(ApiStatus.REQUEST));
      yield call(projectEstimateApi.setFinal, projectId, estimateId);
      yield put(projectEstimateAction.requestSetFinal(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(projectEstimateAction.requestSetFinal(ApiStatus.FAIL));
    }
  }
}

function* watchDeleteCustom() {
  while (true) {
    yield take(projectEstimateAction.deleteCustom);
    try {
      const { customDetail } = yield select((root: RootState) => root.projectEstimate);
      yield put(projectEstimateAction.requestDeleteCustom(ApiStatus.REQUEST));
      yield call(projectEstimateApi.deleteCustom, customDetail.id);
      yield put(projectEstimateAction.requestDeleteCustom(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(projectEstimateAction.requestDeleteCustom(ApiStatus.FAIL));
    }
  }
}

function* watchDeleteSystem() {
  while (true) {
    yield take(projectEstimateAction.deleteSystem);
    try {
      const { systemDetail } = yield select((root: RootState) => root.projectEstimate);
      yield put(projectEstimateAction.requestDeleteSystem(ApiStatus.REQUEST));
      yield call(projectEstimateApi.deleteSystem, systemDetail.id);
      yield put(projectEstimateAction.requestDeleteSystem(ApiStatus.DONE));
    }
    catch (e) {
      console.error(e);
      yield put(projectEstimateAction.requestDeleteSystem(ApiStatus.FAIL));
    }
  }
}

export default function* projectEstimateSaga() {
  yield fork(watchProjectId);
  yield fork(watchAddCustom);
  yield fork(watchCustomDetailModal);
  yield fork(watchChangeCustom);
  yield fork(watchExtensionCustom);
  yield fork(watchSystemDetailModal);
  yield fork(watchAddSystem);
  yield fork(watchChangeSystem);
  yield fork(watchFinal);
  yield fork(watchDeleteCustom);
  yield fork(watchDeleteSystem);
}