import {
  call,
  fork,
  put,
  select,
  take
} from 'redux-saga/effects';
import { projectEstimateAction } from 'project_estimate/action';
import { ProjectId } from 'project/domain';
import { ProjectEstimateVO } from 'project_estimate/domain';
import { projectEstimateApi } from 'project_estimate/api';
import { RootState } from 'services/reducer';
import { dialogActions } from 'components/Dialog';

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
      yield put(projectEstimateAction.requestAdd('request'));
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
      yield put(projectEstimateAction.requestAdd('response'));
    }
  }
}

export default function* projectEstimateSaga() {
  yield fork(watchProjectId);
  yield fork(watchAddCustom);
}