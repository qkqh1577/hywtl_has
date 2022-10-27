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
import { ApiStatus } from 'components/DataFieldProps';

function* watchId() {
  while (true) {
    const { payload: id } = yield take(projectComplexAction.setId);
    yield put(projectComplexAction.getSiteList(id));
    yield put(projectComplexAction.getBuildingList(id));
    if (id) {
      const detail: ProjectComplexTestVO = yield call(projectComplexApi.getTestDetail, id);
      yield put(projectComplexAction.setTestDetail(detail));
    }
    else {
      yield put(projectComplexAction.setTestDetail(undefined));
    }
  }
}

function* watchSiteList() {
  while (true) {
    const { payload: id } = yield take(projectComplexAction.getSiteList);
    if (id) {
      const list: ProjectComplexSiteVO[] = yield call(projectComplexApi.getSiteList, id);
      yield put(projectComplexAction.setSiteList(list));
    }
    else {
      yield put(projectComplexAction.setSiteList(undefined));
    }
  }
}

function* watchBuildingList() {
  while (true) {
    const { payload: id } = yield take(projectComplexAction.getBuildingList);
    if (id) {
      const list: ProjectComplexBuildingVO[] = yield call(projectComplexApi.getBuildingList, id);
      yield put(projectComplexAction.setBuildingList(list));
    }
    else {
      yield put(projectComplexAction.setBuildingList(undefined));
    }
  }
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

function* watchPushSite() {
  while (true) {
    yield take(projectComplexAction.pushSite);
    try {
      const { id } = yield select((root: RootState) => root.projectComplex);
      yield put(projectComplexAction.requestPushSite('request'));
      yield call(projectComplexApi.pushSite, id);
      yield put(projectComplexAction.requestPushSite('done'));
    }
    catch (e) {
      yield put(dialogAction.openError(message));
      yield put(projectComplexAction.requestPushSite(message));
    }
  }
}

function* watchUpdateSite() {
  while (true) {
    const { payload: params } = yield take(projectComplexAction.updateSite);
    try {
      yield put(projectComplexAction.requestUpdateSite('request'));
      yield call(projectComplexApi.updateSite, params);
      yield put(projectComplexAction.requestUpdateSite('done'));
    }
    catch (e) {
      yield put(dialogAction.openError(message));
      yield put(projectComplexAction.requestUpdateSite(message));
    }
  }
}

function* watchDeleteSite() {
  while (true) {
    const { payload: siteId } = yield take(projectComplexAction.deleteSite);
    try {
      yield put(projectComplexAction.requestDeleteSite('request'));
      yield call(projectComplexApi.deleteSite, siteId);
      yield put(projectComplexAction.requestDeleteSite('done'));
    }
    catch (e) {
      yield put(dialogAction.openError(message));
      yield put(projectComplexAction.requestDeleteSite(message));
    }
  }
}


function* watchPushBuilding() {
  while (true) {
    yield take(projectComplexAction.pushBuilding);
    try {
      const { id } = yield select((root: RootState) => root.projectComplex);
      yield put(projectComplexAction.requestPushBuilding('request'));
      yield call(projectComplexApi.pushBuilding, id);
      yield put(projectComplexAction.requestPushBuilding('done'));
    }
    catch (e) {
      yield put(dialogAction.openError(message));
      yield put(projectComplexAction.requestPushBuilding(message));
    }
  }
}

function* watchUpdateBuilding() {
  while (true) {
    const { payload: params } = yield take(projectComplexAction.updateBuilding);
    try {
      yield put(projectComplexAction.requestUpdateBuilding('request'));
      yield call(projectComplexApi.updateBuilding, params);
      yield put(projectComplexAction.requestUpdateBuilding('done'));
    }
    catch (e) {
      yield put(dialogAction.openError(message));
      yield put(projectComplexAction.requestUpdateBuilding(message));
    }
  }
}

function* watchDeleteBuilding() {
  while (true) {
    const { payload: buildingId } = yield take(projectComplexAction.deleteBuilding);
    try {
      yield put(projectComplexAction.requestDeleteBuilding('request'));
      yield call(projectComplexApi.deleteBuilding, buildingId);
      yield put(projectComplexAction.requestDeleteBuilding('done'));
    }
    catch (e) {
      yield put(dialogAction.openError(message));
      yield put(projectComplexAction.requestDeleteBuilding(message));

    }
  }
}

export default function* projectComplexSaga() {
  yield fork(watchId);
  yield fork(watchSiteList);
  yield fork(watchBuildingList);
  yield fork(watchBuildingFileModal);
  yield fork(watchPushSite);
  yield fork(watchUpdateSite);
  yield fork(watchDeleteSite);
  yield fork(watchPushBuilding);
  yield fork(watchUpdateBuilding);
  yield fork(watchDeleteBuilding);
}