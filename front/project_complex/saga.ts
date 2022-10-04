import {
  call,
  fork,
  put,
  select,
  take,
} from 'redux-saga/effects';
import { projectComplexAction, } from 'project_complex/action';
import {
  ProjectComplexBuildingVO,
  ProjectComplexSiteVO,
  ProjectComplexTestVO
} from 'project_complex/domain';
import { projectComplexApi } from 'project_complex/api';
import { RootState } from 'services/reducer';
import { ProjectId } from 'project/domain';
import { dialogActions } from 'components/Dialog';
import { ApiStatus } from 'components/DataFieldProps';

function* watchId() {
  while (true) {
    const { payload: id } = yield take(projectComplexAction.setId);
    yield call(getSiteList, id);
    yield call(getBuildList, id);
    yield call(getTestDetail, id);
  }
}

function* getTestDetail(id: ProjectId) {
  const detail: ProjectComplexTestVO = yield call(projectComplexApi.getTestDetail, id);
  yield put(projectComplexAction.setTestDetail(detail));
}

function* getSiteList(id: ProjectId) {
  const list: ProjectComplexSiteVO[] = yield call(projectComplexApi.getSiteList, id);
  yield put(projectComplexAction.setSiteList(list));
}


function* getBuildList(id: ProjectId) {
  const list: ProjectComplexBuildingVO[] = yield call(projectComplexApi.getBuildingList, id);
  yield put(projectComplexAction.setBuildingList(list));
}

function* watchBuildingFileModal() {
  while (true) {
    const { payload: id } = yield take(projectComplexAction.buildingFileModal);
    if (!id) {
      yield put(projectComplexAction.setBuilding(undefined));
    }
    else {
      const detail: ProjectComplexBuildingVO = yield call(projectComplexApi.getBuilding, id);
      yield put(projectComplexAction.setBuilding(detail));
    }
  }
}

function* pushSite() {
  while (true) {
    yield take(projectComplexAction.pushSite);
    try {
      const { id } = yield select((root: RootState) => root.projectComplex);
      yield call(projectComplexApi.pushSite, id);
      yield call(getSiteList, id);
    }
    catch (e) {
      yield put(dialogActions.openAlert({
        status:   'error',
        children: '추가에 실패했습니다.'
      }));
    }
  }
}

function* pushBuilding() {
  while (true) {
    yield take(projectComplexAction.pushBuilding);
    try {
      const { id } = yield select((root: RootState) => root.projectComplex);
      yield call(projectComplexApi.pushBuilding, id);
      yield call(getBuildList, id);
    }
    catch (e) {
      yield put(dialogActions.openAlert({
        status:   'error',
        children: '추가에 실패했습니다.'
      }));
    }
  }
}

function* updateSite() {
  while (true) {
    const { payload: params } = yield take(projectComplexAction.updateSite);
    try {
      yield put(projectComplexAction.requestSite(ApiStatus.REQUEST));
      yield call(projectComplexApi.updateSite, params);
    }
    catch (e) {
      console.error(e);
      yield put(dialogActions.openAlert({
        status:   'error',
        children: '저장에 실패하였습니다.'
      }));
    }
    finally {
      yield put(projectComplexAction.requestSite(ApiStatus.RESPONSE));
    }
  }
}

function* updateBuilding() {
  while (true) {
    const { payload: params } = yield take(projectComplexAction.updateBuilding);
    try {
      yield put(projectComplexAction.requestBuilding(ApiStatus.REQUEST));
      yield call(projectComplexApi.updateBuilding, params);
    }
    catch (e) {
      console.error(e);
      yield put(dialogActions.openAlert({
        status:   'error',
        children: '저장에 실패하였습니다.'
      }));
    }
    finally {
      yield put(projectComplexAction.requestBuilding(ApiStatus.RESPONSE));
    }
  }
}

function* deleteSite() {
  while (true) {
    const { payload: siteId } = yield take(projectComplexAction.deleteSite);
    try {
      yield call(projectComplexApi.deleteSite, siteId);
      const { id } = yield select((root: RootState) => root.projectComplex);
      yield call(getSiteList, id);
    }
    catch (e) {
      console.error(e);
      yield put(dialogActions.openAlert({
        status:   'error',
        children: '삭제에 실패하였습니다.'
      }));
    }
  }
}

function* deleteBuilding() {
  while (true) {
    const { payload: buildingId } = yield take(projectComplexAction.deleteBuilding);
    try {
      yield call(projectComplexApi.deleteBuilding, buildingId);
      const { id } = yield select((root: RootState) => root.projectComplex);
      yield call(getBuildList, id);
    }
    catch (e) {
      console.error(e);
      yield put(dialogActions.openAlert({
        status:   'error',
        children: '삭제에 실패하였습니다.'
      }));
    }
  }
}

function* watchRequestSite() {
  while (true) {
    const { payload: requestSite } = yield take(projectComplexAction.requestSite);
    if (requestSite === ApiStatus.RESPONSE) {
      const { id } = yield select((root: RootState) => root.projectComplex);
      yield call(getSiteList, id);
      yield put(projectComplexAction.requestSite(ApiStatus.IDLE));
    }
  }
}

function* watchRequestBuilding() {
  while (true) {
    const { payload: requestBuilding } = yield take(projectComplexAction.requestBuilding);
    if (requestBuilding === ApiStatus.RESPONSE) {
      const { id } = yield select((root: RootState) => root.projectComplex);
      yield call(getBuildList, id);
      yield call(getTestDetail, id);
      yield put(projectComplexAction.buildingFileModal(undefined));
      yield put(projectComplexAction.requestBuilding(ApiStatus.IDLE));
    }
  }
}

export default function* projectComplexSaga() {
  yield fork(watchId);
  yield fork(watchBuildingFileModal);
  yield fork(pushSite);
  yield fork(pushBuilding);
  yield fork(updateSite);
  yield fork(updateBuilding);
  yield fork(deleteSite);
  yield fork(deleteBuilding);
  yield fork(watchRequestSite);
  yield fork(watchRequestBuilding);
}