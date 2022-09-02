import {
  call,
  fork,
  put,
  select,
  take,
} from 'redux-saga/effects';
import {
  projectComplexAction,
} from 'project_complex/action';
import {
  ProjectComplexBuildingVO,
  ProjectComplexSiteVO
} from 'project_complex/domain';
import { projectComplexApi } from 'project_complex/api';
import { RootState } from 'services/reducer';
import { ProjectId } from 'project/domain';
import { dialogActions } from 'components/Dialog';

function* watchId() {
  while (true) {
    const { payload: id } = yield take(projectComplexAction.setId);
    yield call(getSiteList, id);
    yield call(getBuildList, id);
  }
}

function* getSiteList(id: ProjectId) {
  const list: ProjectComplexSiteVO[] = yield call(projectComplexApi.getSiteList, id);
  yield put(projectComplexAction.setSiteList(list));
}


function* getBuildList(id: ProjectId) {
  const list: ProjectComplexBuildingVO[] = yield call(projectComplexApi.getBuildingList, id);
  yield put(projectComplexAction.setBuildingList(list));
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

function* updateSite() {
  while (true) {
    const { payload: params } = yield take(projectComplexAction.updateSite);
    try {
      yield call(projectComplexApi.updateSite, params);
    }
    catch (e) {
      console.error(e);
      yield put(dialogActions.openAlert({
        status:   'error',
        children: '저장에 실패하였습니다.'
      }));
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


export default function* projectComplexSaga() {
  yield fork(watchId);
  yield fork(pushSite);
  yield fork(updateSite);
  yield fork(deleteSite);
}