import {
  call,
  fork,
  put,
  select,
  take
} from 'redux-saga/effects';
import { projectEstimateAction } from 'project_estimate/action';
import { ProjectId } from 'project/domain';
import {
  ProjectCustomEstimateVO,
  ProjectEstimateVO,
  ProjectSystemEstimateVO
} from 'project_estimate/domain';
import { projectEstimateApi } from 'project_estimate/api';
import { RootState } from 'services/reducer';
import { dialogActions } from 'components/Dialog';
import { ApiStatus } from 'components/DataFieldProps';

function* watchProjectId() {
  while (true) {
    const { payload: projectId } = yield  take(projectEstimateAction.setProjectId);
    if (projectId) {
      yield call(getList, projectId);
    }
  }
}

function* getList(id: ProjectId) {
  const list: ProjectEstimateVO[] = yield call(projectEstimateApi.getList, id);
  yield put(projectEstimateAction.setList(list));
}

function* watchAddCustom() {
  while (true) {
    const { payload: params } = yield take(projectEstimateAction.addCustom);
    try {
      const { projectId } = yield select((root: RootState) => root.projectEstimate);
      yield put(projectEstimateAction.requestAddCustom(ApiStatus.REQUEST));
      yield call(projectEstimateApi.addCustom, projectId, params);
    }
    catch (e) {
      console.error(e);
      yield put(dialogActions.openAlert({
        status:   'error',
        children: '저장에 실패하였습니다.'
      }));
    }
    finally {
      yield put(projectEstimateAction.requestAddCustom(ApiStatus.RESPONSE));
    }
  }
}

function* watchCustomDetailModal() {
  while (true) {
    const { payload: id } = yield take(projectEstimateAction.setCustomDetailModal);
    if (typeof id === 'undefined') {
      yield put(projectEstimateAction.setCustomDetail(undefined));
    }
    else {
      const detail: ProjectCustomEstimateVO = yield call(projectEstimateApi.getCustomDetail, id);
      yield put(projectEstimateAction.setCustomDetail(detail));
    }
  }
}

function* watchChangeCustom() {
  while (true) {
    const { payload: params } = yield take(projectEstimateAction.changeCustom);
    try {
      yield put(projectEstimateAction.requestChangeCustom(ApiStatus.REQUEST));
      yield call(projectEstimateApi.changeCustom, params);
    }
    catch (e) {
      console.error(e);
      yield put(dialogActions.openAlert({
        status:   'error',
        children: '저장에 실패하였습니다.'
      }));
    }
    finally {
      yield put(projectEstimateAction.requestChangeCustom(ApiStatus.RESPONSE));
    }
  }
}

function* watchExtensionCustom() {
  while (true) {
    const { payload: params } = yield take(projectEstimateAction.extensionCustom);
    try {
      yield put(projectEstimateAction.requestExtensionCustom(ApiStatus.REQUEST));
      yield call(projectEstimateApi.extensionCustom, params);
    }
    catch (e) {
      console.error(e);
      yield put(dialogActions.openAlert({
        status:   'error',
        children: '저장에 실패하였습니다.'
      }));
    }
    finally {
      yield put(projectEstimateAction.requestExtensionCustom(ApiStatus.RESPONSE));
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
    }
    catch (e) {
      console.error(e);
      yield put(dialogActions.openAlert({
        status:   'error',
        children: '저장에 실패하였습니다.'
      }));
    }
    finally {
      yield put(projectEstimateAction.requestAddSystem(ApiStatus.RESPONSE));
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
    }
    catch (e) {
      console.error(e);
      yield put(dialogActions.openAlert({
        status:   'error',
        children: '저장에 실패하였습니다.'
      }));
    }
    finally {
      yield put(projectEstimateAction.requestChangeSystem(ApiStatus.RESPONSE));
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
    }
    catch (e) {
      console.error(e);
      yield put(dialogActions.openAlert({
        status:   'error',
        children: '저장에 실패하였습니다.'
      }));
    }
    finally {
      yield put(projectEstimateAction.requestSetFinal(ApiStatus.RESPONSE));
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
}