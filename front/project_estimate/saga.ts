import {
  call,
  delay,
  fork,
  put,
  select,
  take
} from 'redux-saga/effects';
import { projectEstimateAction } from 'project_estimate/action';
import {
  ProjectCustomEstimateVO,
  ProjectEstimateShortVO,
  ProjectEstimateType,
  ProjectFinalEstimateVO,
  ProjectSystemEstimateVO
} from 'project_estimate/domain';
import { projectEstimateApi } from 'project_estimate/api';
import { RootState } from 'services/reducer';
import { dialogAction } from 'dialog/action';
import { getErrorMessage } from 'type/Error';
import { progressAction } from 'components/Progress/action';

function* watchProjectId() {
  while (true) {
    const { payload: projectId } = yield take(projectEstimateAction.setProjectId);
    yield put(projectEstimateAction.setLoading(true));
    if (projectId) {
      try {
        const list: ProjectEstimateShortVO[] = yield call(projectEstimateApi.getList, projectId);
        yield put(projectEstimateAction.setList(list));
      }
      finally {
        yield delay(300);
        yield put(projectEstimateAction.setLoading(false));
      }
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
      yield put(projectEstimateAction.requestAddCustom('request'));
      const { projectId, customAddModal } = yield select((root: RootState) => root.projectEstimate);
      if (!projectId || !customAddModal) {
        const message = '프로젝트가 선택되지 않았습니다.';
        yield put(dialogAction.openError(message));
        yield put(projectEstimateAction.requestAddCustom(message));
        continue;
      }
      yield call(projectEstimateApi.addCustom, projectId, params);
      yield put(projectEstimateAction.requestAddCustom('done'));
      yield put(dialogAction.openAlert('등록하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(projectEstimateAction.addCustom, e);
      yield put(dialogAction.openError(message));
      yield put(projectEstimateAction.requestAddCustom(message));
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
      yield put(projectEstimateAction.requestChangeCustom('request'));
      yield call(projectEstimateApi.changeCustom, params);
      yield put(projectEstimateAction.requestChangeCustom('done'));
      yield put(dialogAction.openAlert('변경하었습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(projectEstimateAction.changeCustom, e);
      yield put(dialogAction.openError(message));
      yield put(projectEstimateAction.requestChangeCustom(message));
    }
  }
}

function* watchExtensionCustom() {
  while (true) {
    const { payload: params } = yield take(projectEstimateAction.extensionCustom);
    try {
      yield put(projectEstimateAction.requestExtensionCustom('request'));
      yield call(projectEstimateApi.extensionCustom, params);
      yield put(projectEstimateAction.requestExtensionCustom('done'));
      yield put(dialogAction.openAlert('저장하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(projectEstimateAction.extensionCustom, e);
      yield put(dialogAction.openError(message));
      yield put(projectEstimateAction.requestExtensionCustom(message));
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
      yield put(progressAction.progress(true));
      yield put(projectEstimateAction.requestAddSystem('request'));
      yield call(projectEstimateApi.addSystem, projectId, params);
      yield put(projectEstimateAction.requestAddSystem('done'));
      yield put(progressAction.progress(false));
      yield put(dialogAction.openAlert('등록하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(projectEstimateAction.addSystem, e);
      yield put(progressAction.progress(false));
      yield put(dialogAction.openError(message));
      yield put(projectEstimateAction.requestAddSystem(message));
    }
  }
}

function* watchChangeSystem() {
  while (true) {
    const { payload: params } = yield take(projectEstimateAction.changeSystem);
    try {
      const { systemDetail } = yield select((root: RootState) => root.projectEstimate);
      yield put(progressAction.progress(true));
      yield put(projectEstimateAction.requestChangeSystem('request'));
      yield call(projectEstimateApi.changeSystem, systemDetail!.id, params);
      yield put(projectEstimateAction.requestChangeSystem('done'));
      yield put(progressAction.progress(false));
      yield put(dialogAction.openAlert('변경하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(projectEstimateAction.changeSystem, e);
      yield put(progressAction.progress(false));
      yield put(dialogAction.openError(message));
      yield put(projectEstimateAction.requestChangeSystem(message));
    }
  }
}

function* watchFinal() {
  while (true) {
    const { payload: estimateIdList } = yield take(projectEstimateAction.setFinal);
    try {
      const { projectId } = yield select((root: RootState) => root.projectEstimate);
      yield put(projectEstimateAction.requestSetFinal('request'));
      yield call(projectEstimateApi.setFinal, projectId, estimateIdList);
      yield put(projectEstimateAction.requestSetFinal('done'));
      yield put(dialogAction.openAlert('변경하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(projectEstimateAction.setFinal, e);
      yield put(dialogAction.openError(message));
      yield put(projectEstimateAction.requestSetFinal(message));
    }
  }
}

function* watchDeleteCustom() {
  while (true) {
    yield take(projectEstimateAction.deleteCustom);
    try {
      const { customDetail } = yield select((root: RootState) => root.projectEstimate);
      yield put(projectEstimateAction.requestDeleteCustom('request'));
      yield call(projectEstimateApi.deleteCustom, customDetail.id);
      yield put(projectEstimateAction.requestDeleteCustom('done'));
      yield put(dialogAction.openError('삭제하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(projectEstimateAction.deleteCustom, e);
      yield put(dialogAction.openError(message));
      yield put(projectEstimateAction.requestDeleteCustom(message));
    }
  }
}

function* watchDeleteSystem() {
  while (true) {
    yield take(projectEstimateAction.deleteSystem);
    try {
      const { systemDetail } = yield select((root: RootState) => root.projectEstimate);
      yield put(projectEstimateAction.requestDeleteSystem('request'));
      yield call(projectEstimateApi.deleteSystem, systemDetail.id);
      yield put(projectEstimateAction.requestDeleteSystem('done'));
      yield put(dialogAction.openAlert('삭제하였습니다.'));
    }
    catch (e) {
      const message = getErrorMessage(projectEstimateAction.deleteSystem, e);
      yield put(dialogAction.openError(message));
      yield put(projectEstimateAction.requestDeleteSystem(message));
    }
  }
}

function* watchGetFinal() {
  while (true) {
    const { payload: id } = yield take(projectEstimateAction.getFinalEstimate);
    if (id) {
      const finalEstimate: ProjectFinalEstimateVO = yield call(projectEstimateApi.getFinalEstimate, id);
      yield put(projectEstimateAction.setFinalEstimate(finalEstimate));
    }
    else {
      yield put(projectEstimateAction.setFinalEstimate(undefined));
    }
  }
}

function* watchUpdateFinal() {
  while (true) {
    const { payload: params } = yield take(projectEstimateAction.update);
    try {
      yield put(projectEstimateAction.requestFinalEstimateUpdate('request'));
      const { projectId } = yield select((root: RootState) => root.projectEstimate);
      yield call(projectEstimateApi.updateFinalEstimate, projectId, params);
      yield put(projectEstimateAction.requestFinalEstimateUpdate('done'));
    }
    catch (e) {
      const message = getErrorMessage(projectEstimateAction.update, e);
      yield put(dialogAction.openError(message));
      yield put(projectEstimateAction.requestFinalEstimateUpdate(message));
    }
  }
}

function* validateFile() {
  while (true) {
    const { payload: estimate } = yield take(projectEstimateAction.validateFile);
    try {
      if (estimate.type === ProjectEstimateType.SYSTEM) {
        yield call(projectEstimateApi.validateSystemFile, estimate);
        window.location.assign(`/file-item?projectEstimateId=${estimate.id}`);
      }else {
        yield call(projectEstimateApi.validateCustomFile, estimate);
       window.location.assign( `/project/sales/estimate/${estimate.id}/file`);
      }
    }
    catch (e) {
      const message = getErrorMessage(projectEstimateAction.validateFile, e);
      yield put(dialogAction.openError(message));
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
  yield fork(watchGetFinal);
  yield fork(watchUpdateFinal);
  yield fork(validateFile);
}
